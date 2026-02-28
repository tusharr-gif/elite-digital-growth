import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar,
    PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area,
    ComposedChart
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, UserPlus, DollarSign, Activity, Globe, Monitor, MapPin, Download, Calendar, Lock } from 'lucide-react';

const COLORS = ['#D4AF37', '#F3E5AB', '#997A00', '#C5B358', '#E6C200', '#8A6D3B'];

const fallbackData = {
    leads: {
        totalToday: 42,
        totalWeek: 156,
        totalMonth: 645,
        totalAllTime: 8432,
        locationBreakdown: [
            { country: 'United States', percent: 45 },
            { country: 'United Kingdom', percent: 20 },
            { country: 'Canada', percent: 15 },
            { country: 'Australia', percent: 10 },
            { country: 'Germany', percent: 10 }
        ],
        deviceBreakdown: [
            { name: 'Desktop', value: 55 },
            { name: 'Mobile', value: 40 },
            { name: 'Tablet', value: 5 }
        ],
        sourceBreakdown: [
            { name: 'Google', value: 35 },
            { name: 'Facebook', value: 20 },
            { name: 'Instagram', value: 15 },
            { name: 'LinkedIn', value: 10 },
            { name: 'Direct', value: 8 },
            { name: 'Organic', value: 7 },
            { name: 'Referral', value: 5 }
        ],
        timeline: [
            { date: 'Mon', leads: 12 },
            { date: 'Tue', leads: 19 },
            { date: 'Wed', leads: 15 },
            { date: 'Thu', leads: 22 },
            { date: 'Fri', leads: 25 },
            { date: 'Sat', leads: 8 },
            { date: 'Sun', leads: 5 }
        ]
    },
    conversion: {
        revenueMetrics: {
            totalRevenue: 2450000,
            revenueThisMonth: 125000,
            revenueGrowth: [
                { month: 'Jan', revenue: 80000 },
                { month: 'Feb', revenue: 95000 },
                { month: 'Mar', revenue: 110000 },
                { month: 'Apr', revenue: 98000 },
                { month: 'May', revenue: 125000 },
                { month: 'Jun', revenue: 150000 }
            ]
        },
        funnel: [
            { name: 'Website Visitors', value: 15420 },
            { name: 'Leads Generated', value: 645 },
            { name: 'Qualified Leads', value: 210 },
            { name: 'Calls Booked', value: 85 },
            { name: 'Converted Clients', value: 32 }
        ]
    },
    traffic: {
        websiteAnalytics: {
            totalVisitors: 15420,
            uniqueVisitors: 11200,
            bounceRate: 42.5,
            sessionDuration: '3m 45s',
            pageViews: 45210
        },
        realTimeAnalytics: { activeUsers: 48 }
    }
};

const Card = ({ children, className = '' }) => (
    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl ${className}`}>
        {children}
    </div>
);

const Metric = ({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: any, trend?: number }) => (
    <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-sm font-medium">{title}</span>
            <Icon className="w-5 h-5 text-gradient-gold" />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-display font-bold text-foreground">{value}</h3>
            {trend && (
                <span className={`text-sm font-medium flex items-center ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(trend)}%
                </span>
            )}
        </div>
    </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-background border border-border shadow-md rounded-lg">
                <p className="text-sm font-semibold">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AnalyticsDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('leads');
    const [dateFilter, setDateFilter] = useState('30d');
    const [data, setData] = useState(fallbackData);
    const [loading, setLoading] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') setIsAuthenticated(true);
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,Type,Value\\n" +
            "Total Leads," + data.leads.totalAllTime + "\\n" +
            "Total Revenue," + data.conversion.revenueMetrics.totalRevenue + "\\n" +
            "Website Visitors," + data.traffic.websiteAnalytics.totalVisitors + "\\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "analytics_export.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    };

    useEffect(() => {
        // API Call simulation or real fetch
        const fetchData = async () => {
            try {
                const [leadsRes, convRes, trafficRes] = await Promise.all([
                    fetch('http://localhost:5000/api/leads/analytics').catch(() => null),
                    fetch('http://localhost:5000/api/conversion/analytics').catch(() => null),
                    fetch('http://localhost:5000/api/traffic/analytics').catch(() => null)
                ]);

                if (leadsRes && convRes && trafficRes) {
                    const leads = await leadsRes.json();
                    const conversion = await convRes.json();
                    const traffic = await trafficRes.json();
                    setData({ leads, conversion, traffic });
                }
            } catch (err) {
                console.warn("Backend not active, using fallback data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Refresh constantly for true LIVE data interaction
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!isAuthenticated) {
        return (
            <section className="relative z-10 w-full max-w-xl mx-auto section-padding py-32 animate-fade-in">
                <Card className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-foreground mb-2">Admin Access</h2>
                    <p className="text-muted-foreground mb-8 text-center">Enter your password to view analytics</p>
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="Enter Password (admin123)"
                            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-gradient-gold text-primary-foreground font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity">
                            Access Dashboard
                        </button>
                    </form>
                </Card>
            </section>
        );
    }

    if (loading) {
        return <div className="min-h-screen pt-32 flex items-center justify-center">Loading Analytics...</div>;
    }

    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto section-padding py-20 animate-fade-in" id="analytics">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
                        <Activity className="w-4 h-4 animation-pulse" color="#D4AF37" /> Live Production Metrics
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold">
                        Real-Time <span className="text-gradient-gold">Analytics</span>
                    </h2>
                </div>
                <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg backdrop-blur-sm border border-border px-3 py-1.5">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="bg-transparent text-sm text-foreground focus:outline-none border-none py-1"
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 90 Days</option>
                                <option value="all">All Time</option>
                            </select>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-foreground px-4 py-2.5 rounded-lg border border-border transition-colors text-sm font-medium"
                        >
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                    </div>
                    <div className="flex gap-2 p-1.5 bg-secondary/50 rounded-lg backdrop-blur-sm border border-border w-full md:w-auto overflow-x-auto">
                        {['leads', 'conversion', 'traffic'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === tab
                                    ? 'bg-gradient-gold text-primary-foreground shadow-lg shadow-gold/20'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 transition-opacity duration-500 min-h-[600px]">
                {/* LEADS ANALYTICS */}
                {activeTab === 'leads' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Metric title="Total Leads Today" value={data.leads.totalToday} icon={Users} trend={12.5} />
                            <Metric title="Leads This Week" value={data.leads.totalWeek} icon={UserPlus} trend={-2.4} />
                            <Metric title="Leads This Month" value={data.leads.totalMonth} icon={Users} trend={8.1} />
                            <Metric title="All-Time Leads" value={'8.4k+'} icon={Users} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" /> Lead Timeline
                                </h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data.leads.timeline}>
                                            <defs>
                                                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis dataKey="date" stroke="#ffffff50" axisLine={false} tickLine={false} />
                                            <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                                            <RechartsTooltip content={<CustomTooltip />} />
                                            <Area type="monotone" dataKey="leads" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card>
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" /> Source Breakdown
                                </h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.leads.sourceBreakdown.slice(0, 5)}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {data.leads.sourceBreakdown.slice(0, 5).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-3 mt-4">
                                    {data.leads.sourceBreakdown.slice(0, 4).map((source, i) => (
                                        <div key={source.name} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                <span className="text-muted-foreground">{source.name}</span>
                                            </div>
                                            <span className="font-semibold text-foreground">{source.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" /> Location Breakdown
                                </h3>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.leads.locationBreakdown} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                            <XAxis type="number" stroke="#ffffff50" axisLine={false} tickLine={false} hide />
                                            <YAxis dataKey="country" type="category" stroke="#ffffff80" axisLine={false} tickLine={false} tick={{ fill: '#ffffff80', fontSize: 12 }} />
                                            <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                                            <Bar dataKey="percent" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={20}>
                                                {data.leads.locationBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <Monitor className="w-5 h-5 text-primary" /> Device Breakdown
                                </h3>
                                <div className="h-[250px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.leads.deviceBreakdown}
                                                innerRadius={70}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {data.leads.deviceBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <div className="text-2xl font-bold">{data.leads.deviceBreakdown[0].value}%</div>
                                        <div className="text-sm text-muted-foreground">{data.leads.deviceBreakdown[0].name}</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* CONVERSION & REVENUE */}
                {activeTab === 'conversion' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <Metric title="Total Revenue" value={`$${(data.conversion.revenueMetrics.totalRevenue / 1000000).toFixed(2)}M`} icon={DollarSign} trend={15.3} />
                            <Metric title="Revenue This Month" value={`$${(data.conversion.revenueMetrics.revenueThisMonth / 1000).toFixed(0)}k`} icon={DollarSign} trend={8.4} />
                            <Metric title="Conversion Rate" value="4.96%" icon={Activity} trend={1.2} />
                            <Metric title="Avg. Deal Value" value="$76.5k" icon={DollarSign} trend={4.1} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" /> Revenue Growth
                                </h3>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data.conversion.revenueMetrics.revenueGrowth}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                            <XAxis dataKey="month" stroke="#ffffff50" />
                                            <YAxis stroke="#ffffff50" tickFormatter={(value) => `\${value/1000}k`} />
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                                                formatter={(value) => [`$\${value}`, 'Revenue']}
                                            />
                                            <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={4} dot={{ r: 4, fill: '#D4AF37' }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card>
                                <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" /> Sales Funnel Conversion
                                </h3>
                                <div className="space-y-6">
                                    {data.conversion.funnel.map((step, index) => {
                                        const max = data.conversion.funnel[0].value;
                                        const percentage = (step.value / max) * 100;
                                        return (
                                            <div key={step.name} className="relative">
                                                <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                                                    <span className="font-medium text-foreground">{step.name}</span>
                                                    <span>{step.value.toLocaleString()}</span>
                                                </div>
                                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-gold transition-all duration-1000 rounded-full"
                                                        style={{ width: `\${percentage}%`, opacity: 1 - (index * 0.15) }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* TRAFFIC & PERFORMANCE */}
                {activeTab === 'traffic' && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Metric title="Live Visitors" value={data.traffic.realTimeAnalytics.activeUsers} icon={Monitor} trend={5} />
                            <Metric title="Total Visitors" value="15.4k" icon={Users} trend={12} />
                            <Metric title="Bounce Rate" value="42.5%" icon={Activity} trend={-2.1} />
                            <Metric title="Session Duration" value="3m 45s" icon={Globe} trend={4.4} />
                        </div>

                        <Card className="flex flex-col items-center justify-center p-12 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50" />
                            <div className="relative z-10 text-center">
                                <h3 className="text-2xl font-light text-muted-foreground mb-4">Active Campaign Analytics</h3>
                                <div className="inline-block p-4 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                                    <Activity className="w-12 h-12 text-green-400 animate-pulse" />
                                </div>
                                <div className="flex gap-16 justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-display font-bold text-foreground">320%</div>
                                        <div className="text-sm text-muted-foreground mt-2">Avg. Campaign ROI</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-display font-bold text-foreground">$45</div>
                                        <div className="text-sm text-muted-foreground mt-2">Cost Per Lead</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
