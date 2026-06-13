"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Send, Mail, Linkedin, Github } from "lucide-react";

export function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus({ type: 'error', message: data.error || 'Something went wrong.' });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to send message.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 relative bg-card/50 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <div>
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="text-primary text-sm font-mono tracking-wider uppercase">Let's Connect</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-space font-bold text-white mb-6 leading-tight">
                                Have an idea? <br />
                                <span className="text-secondary italic">Let's build it.</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-12">
                                I'm currently available for freelance projects and full-time roles. If you're looking for a Senior Mobile Developer to bring your vision to life, drop me a message.
                            </p>

                            <div className="flex gap-4">
                                <a 
                                    href="mailto:adoniassahilehibeste12@gmail.com" 
                                    className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all group"
                                >
                                    <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/adonias-hibeste" 
                                    target="_blank" rel="noreferrer"
                                    className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all group"
                                >
                                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                                <a 
                                    href="https://github.com/Adonias-hibeste" 
                                    target="_blank" rel="noreferrer"
                                    className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all group"
                                >
                                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form Side */}
                    <ScrollReveal delay={0.2}>
                        <div className="bg-background border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
                            
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Name</label>
                                    <input
                                        type="text" id="name" name="name" required
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                    <input
                                        type="email" id="email" name="email" required
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                    <textarea
                                        id="message" name="message" required rows={4}
                                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="w-full bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-background font-bold uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <Send className="w-4 h-4" />}
                                </button>

                                {submitStatus && (
                                    <div className={`p-4 rounded-xl text-sm font-mono ${submitStatus.type === 'success' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                        {submitStatus.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
