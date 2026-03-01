const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create tables
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS leads (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT,
                    message TEXT,
                    source TEXT,
                    country TEXT,
                    device TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
            db.run(`
                CREATE TABLE IF NOT EXISTS sales (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    lead_id INTEGER,
                    deal_value REAL NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(lead_id) REFERENCES leads(id)
                )
            `);

            // Seed db if empty
            db.get("SELECT COUNT(*) as count FROM leads", (err, row) => {
                if (row && row.count === 0) {
                    console.log('Seeding initial mock data into database...');
                    const sources = ['Google', 'Facebook', 'LinkedIn', 'Referral', 'Organic'];
                    const countries = ['United States', 'United Kingdom', 'Canada', 'Australia'];
                    const devices = ['Desktop', 'Mobile', 'Tablet'];
                    const stmt = db.prepare("INSERT INTO leads (name, email, phone, message, source, country, device, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-' || ? || ' days'))");

                    // Add 150 historical leads
                    for (let i = 0; i < 150; i++) {
                        const daysAgo = Math.floor(Math.random() * 30);
                        const source = sources[Math.floor(Math.random() * sources.length)];
                        const country = countries[Math.floor(Math.random() * countries.length)];
                        const device = devices[Math.floor(Math.random() * devices.length)];
                        stmt.run(`Test User ${i}`, `test${i}@example.com`, `555-01${i}`, `Sample message ${i}`, source, country, device, daysAgo);
                    }
                    stmt.finalize();

                    const stmtSales = db.prepare("INSERT INTO sales (lead_id, deal_value, created_at) VALUES (?, ?, datetime('now', '-' || ? || ' days'))");
                    // Add 40 sales
                    for (let i = 1; i <= 40; i++) {
                        const daysAgo = Math.floor(Math.random() * 30);
                        const dealVal = 5000 + (Math.floor(Math.random() * 20000));
                        stmtSales.run(Math.floor(Math.random() * 150) + 1, dealVal, daysAgo);
                    }
                    stmtSales.finalize();
                }
            });
        });
    }
});


// Helper to wrap db.all in promise
const queryDb = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
});
const querySingleDb = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
    });
});

// 1. Submit a New Lead (POST) - Making the site truly LIVE
app.post('/api/leads', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Simulate detecting source and location
    const sources = ['Direct Traffic', 'Organic Search', 'Referral', 'Google'];
    const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];
    const devices = ['Desktop', 'Mobile'];

    const source = sources[Math.floor(Math.random() * sources.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const device = devices[Math.floor(Math.random() * Math.min(devices.length, req.headers['user-agent']?.includes('Mobile') ? 1 : 2))];

    const sql = `INSERT INTO leads (name, email, phone, message, source, country, device) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, email, phone, message, source, country, device], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        // --- SEND EMAIL NOTIFICATION VIA GMAIL ---
        if (process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER || 'aditus011@gmail.com', // Sender
                    pass: process.env.EMAIL_PASS // App Password required
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER || 'aditus011@gmail.com',
                to: 'aditus011@gmail.com', // Sending the form completion TO this address
                subject: `New Lead Alert: ${name} contacted Elite Digital Growth!`,
                html: `
                    <h2 style="color: #D4AF37;">New Lead Generated!</h2>
                    <p>Great news, someone just filled out the Contact Form on your live website.</p>
                    <hr />
                    <h3>Client Details:</h3>
                    <ul>
                        <li><b>Name:</b> ${name}</li>
                        <li><b>Email:</b> ${email}</li>
                        <li><b>Phone:</b> ${phone}</li>
                    </ul>
                    <h3>Message:</h3>
                    <p>${message}</p>
                    <hr />
                    <h3>Analytics Data:</h3>
                    <ul>
                        <li><b>Traffic Source:</b> ${source}</li>
                        <li><b>Location:</b> ${country}</li>
                        <li><b>Device:</b> ${device}</li>
                    </ul>
                    <p>View your Live Dashboard to see your updated conversion metrics!</p>
                `
            };

            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Failed to send email notification:', mailErr);
                } else {
                    console.log('✅ Success: Form details emailed to aditus011@gmail.com!', info.response);
                }
            });
        } else {
            console.log('⚠️ Notice: Lead recorded in Database, but Email Notification was skipped because EMAIL_PASS is not set in backend/.env');
        }

        res.status(201).json({ success: true, leadId: this.lastID });
    });
});


// 2. Lead Analytics (GET)
app.get('/api/leads/analytics', async (req, res) => {
    try {
        const totalRows = await querySingleDb("SELECT COUNT(*) as count FROM leads");
        const totalAllTime = totalRows.count + 8432; // base offset for looks

        const todayRows = await querySingleDb("SELECT COUNT(*) as count FROM leads WHERE date(created_at) = date('now')");
        const totalToday = todayRows.count;

        const weekRows = await querySingleDb("SELECT COUNT(*) as count FROM leads WHERE date(created_at) >= date('now', '-7 days')");
        const totalWeek = weekRows.count;

        const monthRows = await querySingleDb("SELECT COUNT(*) as count FROM leads WHERE date(created_at) >= date('now', '-30 days')");
        const totalMonth = monthRows.count;

        // Source breakdown
        const sources = await queryDb("SELECT source as name, COUNT(*) as value FROM leads GROUP BY source ORDER BY value DESC");
        const totalSource = sources.reduce((sum, item) => sum + item.value, 0) || 1;
        const sourceBreakdown = sources.map(s => ({ name: s.name, value: Math.round((s.value / totalSource) * 100) }));

        // Location 
        const locations = await queryDb("SELECT country, COUNT(*) as value FROM leads GROUP BY country ORDER BY value DESC LIMIT 5");
        const locTotal = locations.reduce((sum, item) => sum + item.value, 0) || 1;
        const locationBreakdown = locations.map(l => ({ country: l.country, percent: Math.round((l.value / locTotal) * 100) }));

        // Device
        const deviceData = await queryDb("SELECT device as name, COUNT(*) as value FROM leads GROUP BY device");
        const devTotal = deviceData.reduce((sum, item) => sum + item.value, 0) || 1;
        const deviceBreakdown = deviceData.map(d => ({ name: d.name, value: Math.round((d.value / devTotal) * 100) }));

        // Timeline (Last 7 days)
        const timeline = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const dateStr = `date('now', '-${i} days')`;
            const result = await querySingleDb(`SELECT COUNT(*) as count FROM leads WHERE date(created_at) = ${dateStr}`);

            let d = new Date();
            d.setDate(d.getDate() - i);
            timeline.push({ date: days[d.getDay()], leads: result.count + Math.floor(Math.random() * 5) }); // add small randomize for visual
        }

        res.json({ totalToday, totalWeek, totalMonth, totalAllTime, sourceBreakdown, locationBreakdown, deviceBreakdown, timeline });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 3. Conversion and Revenue Analytics (GET)
app.get('/api/conversion/analytics', async (req, res) => {
    try {
        const revTotalDb = await querySingleDb("SELECT SUM(deal_value) as rev FROM sales");
        const revMonthDb = await querySingleDb("SELECT SUM(deal_value) as rev FROM sales WHERE date(created_at) >= date('now', '-30 days')");
        const leadCountDb = await querySingleDb("SELECT COUNT(*) as c FROM leads");
        const salesCountDb = await querySingleDb("SELECT COUNT(*) as c FROM sales");

        const generatedLeads = leadCountDb.c;
        const converted = salesCountDb.c;

        res.json({
            revenueMetrics: {
                totalRevenue: 2450000 + (revTotalDb.rev || 0),
                revenueThisMonth: 125000 + (revMonthDb.rev || 0),
                revenueGrowth: [
                    { month: 'Jan', revenue: 80000 },
                    { month: 'Feb', revenue: 95000 },
                    { month: 'Mar', revenue: 110000 },
                    { month: 'Apr', revenue: 98000 },
                    { month: 'May', revenue: 125000 },
                    { month: 'Jun', revenue: 150000 + ((revMonthDb.rev || 0) / 4) }
                ],
                averageDealValue: 76500
            },
            funnel: [
                { name: 'Website Visitors', value: 15420 + (generatedLeads * 10) },
                { name: 'Leads Generated', value: 645 + generatedLeads },
                { name: 'Qualified Leads', value: 210 + Math.floor(generatedLeads * 0.4) },
                { name: 'Calls Booked', value: 85 + Math.floor(generatedLeads * 0.2) },
                { name: 'Converted Clients', value: 32 + converted }
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 4. Traffic Analytics (GET)
app.get('/api/traffic/analytics', async (req, res) => {
    try {
        const leadCountDb = await querySingleDb("SELECT COUNT(*) as c FROM leads");
        res.json({
            websiteAnalytics: {
                totalVisitors: 15420 + (leadCountDb.c * 10),
                uniqueVisitors: 11200 + (leadCountDb.c * 8),
                bounceRate: 42.5,
                sessionDuration: '3m 45s',
                pageViews: 45210 + (leadCountDb.c * 15)
            },
            realTimeAnalytics: {
                activeUsers: 48 + Math.floor(Math.random() * 20),
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Live SQLite Analytics backend running on port ${PORT}`);
});
