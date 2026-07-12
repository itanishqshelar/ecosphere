"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Globe, AlignLeft, Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreatePolicyPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !scope.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/policies/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), scope: scope.trim(), content: content.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(`Policy "${title}" created successfully`);
      router.push("/governance/policies");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => router.back()} className="btn-ghost text-sm flex items-center gap-1.5 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="section-title">Create New Policy</h2>
        <p className="section-subtitle mb-6">Draft a new company policy for employee acknowledgement</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 space-y-5"
      >
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
            <FileText className="w-4 h-4" /> Policy Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Remote Work Policy"
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors"
            style={{
              background: "hsl(var(--surface))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
            onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
            <Globe className="w-4 h-4" /> Scope
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g. All Departments, Engineering, Company-wide"
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors"
            style={{
              background: "hsl(var(--surface))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
            onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
            <AlignLeft className="w-4 h-4" /> Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the full policy content here..."
            rows={10}
            className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-y"
            style={{
              background: "hsl(var(--surface))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
            onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex items-center gap-2"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {submitting ? "Creating..." : "Create Policy"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-ghost">
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}
