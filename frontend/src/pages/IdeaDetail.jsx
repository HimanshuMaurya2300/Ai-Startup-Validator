import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function IdeaDetail() {
    const { id } = useParams();
    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const reportRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/ideas/${id}`)
            .then(res => {
                setIdea(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    const getGridCols = () => {
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

    if (!idea) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0, background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)' }}>
                    <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #667eea, #764ba2)', top: -300, left: -200 }}></div>
                    <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #764ba2, #667eea)', bottom: -300, right: -200 }}></div>
                </div>
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>Idea not found</h2>
                    <Link to="/dashboard" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
                        Back to Dashboard
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const r = idea && idea.report ? idea.report : {};

    const downloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = 20;
        const margin = 20;
        const contentWidth = pageWidth - 2 * margin;
        
        const checkPageBreak = (requiredSpace) => {
            if (y + requiredSpace > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        };
        
        doc.setFontSize(22);
        doc.setTextColor(30, 30, 50);
        doc.text("Startup Idea Validation Report", margin, y);
        y += 10;
        
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, y);
        y += 8;
        
        doc.setDrawColor(100, 100, 150);
        doc.setLineWidth(0.8);
        doc.line(margin, y, pageWidth - margin, y);
        y += 12;
        
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 60);
        const titleLines = doc.splitTextToSize(idea.title, contentWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 8 + 6;
        
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        const descLines = doc.splitTextToSize(idea.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 6 + 12;
        
        checkPageBreak(50);
        
        const scoreColor = score >= 70 ? [16, 185, 129] : score >= 40 ? [217, 119, 6] : [220, 38, 38];
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 60);
        doc.text("Profitability Score", margin, y);
        y += 8;
        
        doc.setFontSize(18);
        doc.setTextColor(...scoreColor);
        doc.text(String(score), margin, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(`Risk Level: ${r?.risk_level || 'Medium'}    |    Competitors: ${r?.competitor?.length || 0}`, margin, y);
        y += 15;
        
        const sections = [
            { title: "Problem", content: r?.problem || 'N/A' },
            { title: "Target Customer", content: r?.customer || 'N/A' },
            { title: "Market", content: r?.market || 'N/A' },
            { title: "Tech Stack", content: Array.isArray(r?.tech_stack) ? r.tech_stack.join(', ') : r?.tech_stack || 'N/A' }
        ];
        
        sections.forEach(section => {
            const contentLines = doc.splitTextToSize(section.content, contentWidth - 15);
            const sectionHeight = contentLines.length * 6 + 18;
            checkPageBreak(sectionHeight + 8);
            
            doc.setFillColor(245, 245, 250);
            doc.roundedRect(margin, y, contentWidth, sectionHeight, 3, 3, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(50, 50, 80);
            doc.text(section.title, margin + 8, y + 8);
            
            doc.setFontSize(10);
            doc.setTextColor(90, 90, 90);
            doc.text(contentLines, margin + 8, y + 16);
            
            y += sectionHeight + 8;
        });
        
        if (r?.competitor && r.competitor.length > 0) {
            const competitorsContent = r.competitor.map((c, i) => `${i + 1}. ${c}`).join('   |   ');
            const competitorsLines = doc.splitTextToSize(competitorsContent, contentWidth - 15);
            const competitorsHeight = competitorsLines.length * 6 + 18;
            checkPageBreak(competitorsHeight + 8);
            
            doc.setFillColor(245, 245, 250);
            doc.roundedRect(margin, y, contentWidth, competitorsHeight, 3, 3, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(50, 50, 80);
            doc.text("Competitors", margin + 8, y + 8);
            
            doc.setFontSize(10);
            doc.setTextColor(90, 90, 90);
            doc.text(competitorsLines, margin + 8, y + 16);
            
            y += competitorsHeight + 8;
        }
        
        if (r?.justification) {
            const justificationLines = doc.splitTextToSize(r.justification, contentWidth - 15);
            const justificationHeight = justificationLines.length * 6 + 18;
            checkPageBreak(justificationHeight + 8);
            
            doc.setFillColor(245, 245, 250);
            doc.roundedRect(margin, y, contentWidth, justificationHeight, 3, 3, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(50, 50, 80);
            doc.text("AI Justification", margin + 8, y + 8);
            
            doc.setFontSize(10);
            doc.setTextColor(90, 90, 90);
            doc.text(justificationLines, margin + 8, y + 16);
            
            y += justificationHeight + 8;
        }
        
        y += 8;
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text("Generated by Startup Idea Validator", margin, pageHeight - 10);
        
        const fileName = `${idea.title.replace(/[^a-zA-Z0-9]/g, '_')}_report.pdf`;
        doc.save(fileName);
        toast.success("Report downloaded successfully!");
    };

    const score = r && r.profitability_score != null ? r.profitability_score : 0;
    const riskLevel = r && r.risk_level ? r.risk_level : 'Medium';
    const riskColor = riskLevel && typeof riskLevel === 'string' && riskLevel.toLowerCase().includes('low') ? '#4ade80' : riskLevel && typeof riskLevel === 'string' && riskLevel.toLowerCase().includes('high') ? '#f87171' : '#fbbf24';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0, background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)' }}>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #667eea, #764ba2)', top: -300, left: -200 }}></div>
                <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', opacity: 0.15, filter: 'blur(200px)', background: 'linear-gradient(135deg, #764ba2, #667eea)', bottom: -300, right: -200 }}></div>
            </div>
            
            <main style={{ flex: 1, position: 'relative', zIndex: 10, width: '100%' }}>
                <div style={{ width: '100%', padding: '40px 40px 64px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                        <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <button onClick={downloadPDF} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Report
                        </button>
                    </div>

                    <div style={{ borderRadius: 16, padding: '24px 32px', marginBottom: 32, background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div style={{ display: 'flex', flexDirection: windowWidth < 1024 ? 'column' : 'row', gap: 24 }}>
                            <div style={{ flex: 1 }}>
                                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12 }}>{idea.title}</h1>
                                <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>{idea.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, color: riskColor, background: `${riskColor}20`, border: `1px solid ${riskColor}30` }}>
                                        {riskLevel} Risk
                                    </span>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                                        {r?.competitor?.length || 0} Competitors
                                    </span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Profitability</div>
                                <div style={{ width: 70, height: 70, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.375rem', fontWeight: 800, color: '#22c55e', background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9), rgba(22, 22, 38, 0.95))' }}>
                                    {score}
                                </div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Score</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`, gap: 20, marginBottom: 20 }} ref={reportRef}>
                        <ReportCard title="Problem" content={r?.problem} />
                        <ReportCard title="Target Customer" content={r?.customer} />
                        <ReportCard title="Market" content={r?.market} />
                        <ReportCard title="Tech Stack" content={Array.isArray(r?.tech_stack) ? r.tech_stack.join(', ') : r?.tech_stack} />
                        <ReportCard title="Risk Level" content={r?.risk_level} />
                        <ReportCard title="Profitability" content={`${r?.profitability_score}/100`} />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <ReportCard title="Competitors" competitors={r?.competitor} />
                    </div>

                    <div>
                        <ReportCard title="AI Justification" content={r?.justification} highlight />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function ReportCard({ title, content, competitors, highlight }) {
    return (
        <div style={{ borderRadius: 12, padding: 20, background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9) 0%, rgba(22, 22, 38, 0.95) 100%)', border: highlight ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <svg style={{ width: 16, height: 16, color: '#818cf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 style={{ fontWeight: 600, fontSize: '0.875rem' }}>{title}</h3>
            </div>
            
            {content && (
                <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.875rem' }}>
                    {content}
                </p>
            )}

            {competitors && Array.isArray(competitors) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                    {competitors.map((comp, i) => (
                        <span key={i} style={{ padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 500, color: '#cbd5e1', background: 'rgba(255,255,255,0.05)' }}>
                            {comp}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}