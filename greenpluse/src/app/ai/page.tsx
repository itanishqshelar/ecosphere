"use client";

import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  "Which department emitted the most carbon?",
  "How can HR improve its ESG score?",
  "Suggest a CSR activity for July.",
  "Why is our governance score low?",
];

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your GreenPulse AI assistant powered by Groq. Ask me anything about your ESG performance, challenges, or sustainability recommendations!" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "I'm analyzing your ESG data... (Connect Groq API key to enable real responses)" }]);
    setInput("");
  };

  return (
    <div className="page-wrapper h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">AI ESG Assistant</h2>
          <p className="text-xs text-[hsl(var(--foreground-muted))]">Powered by Groq · LLaMA 3</p>
        </div>
        <span className="ml-auto badge-green badge flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
          Online
        </span>
      </div>

      {/* Chat Window */}
      <div className="card flex-1 p-4 space-y-4 overflow-y-auto min-h-[400px]">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${m.role === "assistant" ? "bg-primary-500/20" : "bg-accent-500/20"}`}>
                {m.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-primary-500" /> : <User className="w-3.5 h-3.5 text-accent-500" />}
              </div>
              <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm ${m.role === "assistant" ? "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--foreground))]" : "bg-primary-500 text-white"}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      <div className="flex gap-2 flex-wrap">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)} className="btn-secondary text-xs py-1.5 px-3">
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask about your ESG performance..."
          className="input flex-1"
        />
        <button onClick={() => send(input)} className="btn-primary px-4">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}



