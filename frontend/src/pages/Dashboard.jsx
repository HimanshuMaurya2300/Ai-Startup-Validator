import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        fetchIdeas();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchIdeas = () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/ideas`)
            .then(res => setIdeas(res.data))
            .catch(() => setIdeas([]))
            .finally(() => setLoading(false));
    };

    const deleteIdea = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/ideas/${id}`);
            setIdeas(ideas.filter(idea => idea._id !== id));
            toast.success("Idea deleted successfully!");
        } catch {
            toast.error("Failed to delete idea");
        }
    };

    const getGridCols = () => {
        if (windowWidth >= 1024) return 3;
        if (windowWidth >= 768) return 2;
        return 1;
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Spinner />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0, background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)' }}>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #667eea, #764ba2)', top: -300, left: -200 }}></div>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #764ba2, #667eea)', bottom: -300, right: -200 }}></div>
            </div>
            
            <main style={{ flex: 1, position: 'relative', zIndex: 10, width: '100%' }}>
                <div style={{ width: '100%', padding: '40px 40px 64px' }}>
                    <div style={{ display: 'flex', flexDirection: windowWidth < 640 ? 'column' : 'row', gap: 16, marginBottom: 40, alignItems: windowWidth < 640 ? 'stretch' : 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>Your Ideas</h1>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>View and manage all your validated startup ideas</p>
                        </div>
                        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)', color: 'white', fontWeight: 600, textDecoration: 'none', borderRadius: 8, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.2)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Idea
                        </Link>
                    </div>

                    {ideas.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 64 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <svg style={{ width: 32, height: 32, color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>No ideas yet</h3>
                            <p style={{ color: '#94a3b8', marginBottom: 24, maxWidth: '25rem', margin: '0 auto 24px', fontSize: '0.875rem' }}>
                                Start by validating your first startup idea
                            </p>
                            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)', color: 'white', fontWeight: 600, textDecoration: 'none', borderRadius: 8, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.2)', fontSize: '0.875rem' }}>
                                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Submit Your First Idea
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`, gap: 20 }}>
                            {ideas.map((idea) => (
                                <IdeaCard key={idea._id} idea={idea} onDelete={deleteIdea} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function IdeaCard({ idea, onDelete }) {
    const score = idea.report?.profitability_score || 0;
    const scoreColor = score >= 70 ? '#34d399' : score >= 40 ? '#fbbf24' : '#fb7185';
    const scoreBg = score >= 70 ? 'rgba(52, 211, 153, 0.1)' : score >= 40 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 113, 133, 0.1)';
    const riskLevel = idea.report?.risk_level || 'Medium';

    return (
        <Link to={`/idea/${idea._id}`} style={{ borderRadius: 12, overflow: 'hidden', display: 'block', textDecoration: 'none', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg style={{ width: 16, height: 16, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div style={{ height: 36, padding: '0 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, color: scoreColor, background: scoreBg, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {score}%
                        </div>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(idea._id); }} style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(239, 68, 68, 0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg style={{ width: 14, height: 14, color: '#f87171' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m4 0h6" />
                        </svg>
                    </button>
                </div>

                <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>
                    {idea.title}
                </h2>

                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: 12, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {idea.description}
                </p>

                {idea.report && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: '0.75rem', color: '#64748b' }}>
                        <span>{riskLevel} Risk</span>
                        <span style={{ width: 1, height: 12, background: '#334155' }}></span>
                        <span>{idea.report.competitor?.length || 0} Competitors</span>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 500, color: '#818cf8', marginLeft: 'auto' }}>
                        <span>View Report</span>
                        <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>

            <div style={{ height: 2, width: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)', opacity: 0 }}></div>
        </Link>
    );
}