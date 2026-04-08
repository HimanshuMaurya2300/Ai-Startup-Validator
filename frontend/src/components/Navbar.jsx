import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%', padding: '20px 40px', background: 'rgba(15, 15, 26, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.25)' }}>
                        <svg style={{ width: 16, height: 16, color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Startup Idea Validator</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/dashboard" style={{ padding: '8px 16px', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', textDecoration: 'none', borderRadius: 8 }}>
                        Ideas
                    </Link>
                    <Link to="/" style={{ marginLeft: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)', color: 'white', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', borderRadius: 8, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.25)', transition: 'all 0.2s' }}>
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}