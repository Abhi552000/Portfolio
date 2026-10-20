"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons/SocialIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: false,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Spam honeypot detection
    if (formData.botcheck) {
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage("Contact service is not configured. Please contact directly via email.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Inquiry from ${formData.name.trim() || "Visitor"}`,
          from_name: formData.name.trim() || "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", botcheck: false });
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Failed to transmit message. Please try again or email directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please verify your connection or use the direct email link."
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build <span className="text-gradient-cyan">Something Extraordinary</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Whether you are looking for a Software Developer, Full-Stack Capable Engineer, or Web Architecture Consultant — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Contact Channels</span>
              </h3>

              {/* Direct Email Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 overflow-hidden">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Direct Email</span>
                  <span className="font-mono text-xs sm:text-sm text-cyan-300 font-bold break-all sm:break-normal block">{PERSONAL_INFO.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors shrink-0"
                  title="Copy Email Address"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{PERSONAL_INFO.location} (UTC+5:30)</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-colors shadow-md"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-colors shadow-md"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Message Transmitted!</h3>
                      <p className="text-sm text-gray-300 max-w-md mx-auto">
                        Your inquiry was routed directly to Abhishek&apos;s inbox via Web3Forms. Expect a response shortly!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                      <span className="text-[10px] font-mono text-cyan-400/80 px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-500/20">
                        Live Delivery
                      </span>
                    </div>

                    {/* Botcheck Honeypot */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      checked={formData.botcheck}
                      onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Error Banner */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold">{errorMessage}</p>
                          <p className="text-[11px] text-rose-400/80 mt-1">
                            You can also send an email directly to{" "}
                            <a
                              href={`mailto:${PERSONAL_INFO.email}`}
                              className="underline hover:text-white"
                            >
                              {PERSONAL_INFO.email}
                            </a>
                            .
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400">Your Name</label>
                        <input
                          type="text"
                          required
                          disabled={status === "submitting"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400">Your Email</label>
                        <input
                          type="email"
                          required
                          disabled={status === "submitting"}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-400">Project / Role Details</label>
                      <textarea
                        required
                        rows={4}
                        disabled={status === "submitting"}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Discussing Software Developer opportunities, Node.js & React stack, or Monorepo Setup..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shimmer-effect disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

