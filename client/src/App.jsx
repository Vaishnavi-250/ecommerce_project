import React, { useState, useEffect } from 'react';
import {
    Video, Share2, PenTool, LayoutDashboard,
    Settings, Users, MessageSquare, Mic,
    MicOff, VideoOff, PhoneOff, Monitor,
    Menu, X, Send, Plus, Lock, Mail, ChevronRight,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const features = [
        { id: 'video', icon: <Video />, title: 'Video Chat', color: 'pink' },
        { id: 'whiteboard', icon: <PenTool />, title: 'Whiteboard', color: 'blue' },
        { id: 'sharing', icon: <Share2 />, title: 'File Share', color: 'orange' },
        { id: 'dashboard', icon: <LayoutDashboard />, title: 'Overview', color: 'green' },
    ];

    const colorMap = {
        pink: 'bg-pink-500 shadow-pink-500/20',
        blue: 'bg-blue-500 shadow-blue-500/20',
        orange: 'bg-orange-500 shadow-orange-500/20',
        green: 'bg-emerald-500 shadow-emerald-500/20',
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        // Simulate API call
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoggingIn(false);
        }, 1500);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto mb-4">
                            <Video className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-400">Enter your credentials to access Connect</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                required
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                placeholder="Email address"
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Password"
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <button
                            disabled={isLoggingIn}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl py-4 font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {isLoggingIn ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <p className="text-slate-500 text-sm">
                            Don't have an account? <span className="text-indigo-400 font-medium hover:underline cursor-pointer">Sign up free</span>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-medium uppercase tracking-widest">
                            <span>WebRTC</span>
                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                            <span>P2P</span>
                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                            <span>E2EE</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col z-20"
                    >
                        <div className="p-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Video className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                Connect
                            </span>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {features.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveTab(f.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === f.id
                                        ? `${colorMap[f.color] || 'bg-indigo-500'} text-white scale-[1.02] shadow-lg`
                                        : 'hover:bg-slate-800 text-slate-400'
                                        }`}
                                >
                                    {React.cloneElement(f.icon, { size: 20 })}
                                    <span className="font-medium">{f.title}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-slate-800">
                            <div className="text-[10px] text-slate-600 mb-2 px-4 uppercase tracking-widest font-bold font-mono">Environment</div>
                            <div className="px-4 py-2 bg-slate-950/50 rounded-lg flex items-center gap-2 mb-4 group cursor-default">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse group-hover:bg-indigo-400"></div>
                                <span className="text-[10px] text-slate-400 font-mono tracking-tighter">F-HOST-PROD-v2.0</span>
                            </div>
                            <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors group">
                                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                                <span className="font-medium">Settings</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950/20">
                {/* Header */}
                <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/20 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h2 className="text-xl font-bold capitalize flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${colorMap[features.find(f => f.id === activeTab)?.color]?.split(' ')[0] || 'bg-indigo-500'}`}></div>
                            {activeTab}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-white">{loginData.email || 'User'}</span>
                            <span className="text-[10px] text-slate-500 font-mono">Premium Member</span>
                        </div>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                                </div>
                            ))}
                            <button className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="h-full"
                        >
                            {activeTab === 'dashboard' ? (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <StatCard title="Active Rooms" value="14" sub="+2 tonight" icon={<Users className="text-indigo-400" />} />
                                        <StatCard title="Bandwidth" value="1.2 GB/s" sub="Ultra-fast" icon={<Share2 className="text-purple-400" />} />
                                        <StatCard title="Global Nodes" value="48" sub="Optimized" icon={<LayoutDashboard className="text-emerald-400" />} />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-slate-800/30 rounded-3xl p-8 border border-slate-800/50 backdrop-blur-xl">
                                            <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                                                Recent Sessions
                                                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest font-black">View All</button>
                                            </h3>
                                            <div className="space-y-4">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl hover:bg-slate-900/60 transition-all border border-transparent hover:border-slate-700/50 group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                <Video className="text-indigo-400" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold">Team Sprint Planning #{i}</p>
                                                                <p className="text-[10px] text-slate-500 font-mono uppercase">12 Participants • Completed</p>
                                                            </div>
                                                        </div>
                                                        <button className="p-3 bg-slate-950 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                            <Share2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-slate-800/30 rounded-3xl p-8 border border-slate-800/50 backdrop-blur-xl shadow-2xl">
                                            <h3 className="text-xl font-bold mb-6">P2P Mesh Network</h3>
                                            <div className="aspect-video bg-slate-950 rounded-2xl relative overflow-hidden group border border-slate-800/50">
                                                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                                    <div className="grid grid-cols-4 gap-4 p-8 w-full h-full">
                                                        {[...Array(16)].map((_, i) => (
                                                            <div key={i} className="bg-slate-800 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-slate-950/80 to-transparent">
                                                    <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                                        <Lock size={48} className="text-indigo-500/50 mx-auto mb-4" />
                                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Encrypted Preview</p>
                                                        <p className="text-[10px] text-slate-600 font-mono">ENCRYPTED-AES-256-GCM</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center max-w-lg">
                                        <motion.div
                                            initial={{ rotate: -10, scale: 0.8 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            className={`w-24 h-24 ${colorMap[features.find(f => f.id === activeTab)?.color]?.split(' ')[0] || 'bg-indigo-500'} bg-opacity-10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/10`}
                                        >
                                            {React.cloneElement(features.find(f => f.id === activeTab)?.icon, { size: 40, className: colorMap[features.find(f => f.id === activeTab)?.color]?.split(' ')[0].replace('bg-', 'text-') })}
                                        </motion.div>
                                        <h2 className="text-4xl font-black mb-4 capitalize text-white tracking-tight">{activeTab} Engine Hooked</h2>
                                        <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                                            The {activeTab} initialization sequence for <b>host-v2.0</b> is complete.
                                            Press the action button below to spin up a new instance on the F: cluster.
                                        </p>
                                        <button className={`group bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black transition-all shadow-2xl hover:bg-indigo-400 hover:text-white active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-tighter text-sm`}>
                                            Launch Instance <Plus className="group-hover:rotate-180 transition-transform duration-500" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Controls (Conditional for Video Chat) */}
                <AnimatePresence>
                    {activeTab === 'video' && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="h-24 bg-slate-950/80 backdrop-blur-2xl border-t border-slate-800 flex items-center justify-center gap-6 px-8 z-20"
                        >
                            <ControlButton icon={<Mic />} />
                            <ControlButton icon={<Video />} active />
                            <ControlButton icon={<Monitor />} />
                            <ControlButton icon={<MessageSquare />} badge="4" />
                            <ControlButton icon={<PhoneOff />} danger />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

function StatCard({ title, value, sub, icon }) {
    return (
        <div className="bg-slate-800/30 rounded-3xl p-6 border border-slate-800/50 hover:border-slate-700/80 transition-all group cursor-default">
            <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-900 rounded-2xl group-hover:scale-110 transition-all duration-500 group-hover:bg-slate-800 group-hover:shadow-xl group-hover:shadow-indigo-500/10">
                    {icon}
                </div>
                <div className="text-[10px] text-emerald-500 font-black font-mono uppercase tracking-widest">{sub}</div>
            </div>
            <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{title}</h4>
            <div className="text-3xl font-black text-white tracking-tighter">
                {value}
            </div>
        </div>
    );
}

function ControlButton({ icon, active, danger, badge }) {
    return (
        <button className={`relative p-5 rounded-2xl border transition-all active:scale-90 group ${danger
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white shadow-lg shadow-rose-500/10'
                : active
                    ? 'bg-indigo-500 border-indigo-400 text-white shadow-2xl shadow-indigo-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 hover:bg-slate-800 shadow-xl'
            }`}>
            {React.cloneElement(icon, { size: 24, className: 'group-hover:scale-110 transition-transform' })}
            {badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
                    {badge}
                </span>
            )}
        </button>
    );
}

export default App;
