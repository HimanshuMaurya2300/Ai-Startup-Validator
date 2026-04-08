import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getGridCols = () => {
        if (windowWidth >= 1024) return 3;
        if (windowWidth >= 768) return 2;
        return 1;
    };

    const submitIdea = async () => {
        if (!title.trim() || !description.trim()) {
            return toast.error("Please fill in all fields");
        }

        try {
            setLoading(true);

            await axios.post("http://localhost:5000/ideas", {
                title: title.trim(),
                description: description.trim(),
            });

            toast.success("Idea validated successfully!");
            setTitle("");
            setDescription("");
            navigate('/dashboard');
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0, background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)' }}>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #667eea, #764ba2)', top: -300, left: -200 }}></div>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #764ba2, #667eea)', bottom: -300, right: -200 }}></div>
            </div>
            
            <main style={{ flex: 1, position: 'relative', zIndex: 10, width: '100%' }}>
                <div style={{ width: '100%', padding: '40px 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }}></span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#cbd5e1' }}>AI-Powered Analysis</span>
                        </div>
                        
                        <h1 style={{ fontSize: windowWidth < 640 ? '2rem' : '2.5rem', fontWeight: 700, marginBottom: 24, lineHeight: 1.2, letterSpacing: '-0.025em' }}>
                            Validate Your{" "}
                            <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Startup Idea
                            </span>
                        </h1>
                        
                        <p style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '42rem', margin: '0 auto 32px', lineHeight: 1.6 }}>
                            Get instant, data-driven insights on market potential, competition analysis, and profitability scores powered by advanced AI.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: windowWidth < 640 ? 16 : 32, fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg style={{ width: 12, height: 12, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span style={{ fontWeight: 500 }}>Market Analysis</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg style={{ width: 12, height: 12, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span style={{ fontWeight: 500 }}>Competitor Research</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg style={{ width: 12, height: 12, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span style={{ fontWeight: 500 }}>Profitability Score</span>
                            </div>
                        </div>
                    </div>

                    <div ref={formRef} style={{ borderRadius: 16, padding: '32px 40px', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)', maxWidth: 600, margin: '80px auto 0' }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Submit Your Idea</h2>
                            <p style={{ color: '#94a3b8' }}>Describe your startup concept and get AI-powered insights</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                                    Startup Title
                                </label>
                                <input
                                    ref={titleRef}
                                    type="text"
                                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f1f5f9', fontSize: '0.875rem', outline: 'none', transition: 'all 0.2s' }}
                                    placeholder="e.g., AI-Powered Recipe Generator"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && submitIdea()}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                                    Description
                                </label>
                                <textarea
                                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f1f5f9', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
                                    placeholder="Describe your startup idea, target audience, unique value proposition, and key features..."
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={submitIdea}
                                disabled={loading || !title.trim() || !description.trim()}
                                style={{ width: '100%', padding: '14px 24px', fontSize: '1rem', fontWeight: 600, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)', color: 'white', boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.25)', transition: 'all 0.2s', opacity: loading || !title.trim() || !description.trim() ? 0.5 : 1, cursor: loading || !title.trim() || !description.trim() ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                        <svg style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                                            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                        <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Generate AI Report
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`, gap: 20, marginTop: 48 }}>
                        <div style={{ borderRadius: 12, padding: 24, textAlign: 'center', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 8, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#818cf8' }}>
                                <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 8 }}>Market Insights</h3>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>Understand your target market size, trends, and growth opportunities</p>
                        </div>
                        <div style={{ borderRadius: 12, padding: 24, textAlign: 'center', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 8, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#818cf8' }}>
                                <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 8 }}>Competitor Analysis</h3>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>Identify key competitors and their market positioning strategies</p>
                        </div>
                        <div style={{ borderRadius: 12, padding: 24, textAlign: 'center', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 8, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#818cf8' }}>
                                <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 8 }}>Profitability Score</h3>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>Get a comprehensive, data-driven profitability assessment</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}