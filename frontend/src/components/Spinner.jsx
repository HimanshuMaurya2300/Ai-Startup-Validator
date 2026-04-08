export default function Spinner() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 16, padding: 64 }}>
            <div style={{ position: 'relative', width: 48, height: 48 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(102, 126, 234, 0.2)' }}></div>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#a78bfa', animation: 'spin 1s linear infinite' }}></div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>Loading...</p>
        </div>
    );
}