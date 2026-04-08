export default function Footer() {
    return (
        <footer style={{ padding: '24px 40px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(15, 15, 26, 0.9)', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg style={{ width: 16, height: 16, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Startup Idea Validator</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    AI-powered startup idea validation platform
                </p>
            </div>
        </footer>
    );
}