"use client";

import { motion } from "framer-motion";
import { mockCSRActivities } from "@/lib/mock-data";
import { Plus, MapPin, Calendar, Users, Upload } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";
import { toast } from "sonner";

export default function CSRPage() {
  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">CSR Activities</h2>
          <p className="section-subtitle mt-0.5">Corporate Social Responsibility events</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> Create Event</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Events",   value: "24", color: "text-accent-500",   bg: "bg-accent-500/10"   },
          { label: "Participants",   value: "169", color: "text-primary-500", bg: "bg-primary-500/10"  },
          { label: "Points Awarded", value: "28.4K",color:"text-purple-500",  bg: "bg-purple-500/10"   },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 text-center"
          >
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCSRActivities.map((event, i) => {
          const pct = Math.round((event.participants / event.maxParticipants) * 100);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 }}
              className="card p-5 group hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-[hsl(var(--foreground))] group-hover:text-primary-500 transition-colors">
                    {event.title}
                  </h4>
                  <span className="badge-blue badge mt-1">{event.category}</span>
                </div>
                <span className={cn("badge capitalize", getStatusColor(event.status))}>{event.status}</span>
              </div>

              <div className="space-y-1.5 text-xs text-[hsl(var(--foreground-muted))] mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary-500" />
                  {event.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-500" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                  {event.participants}/{event.maxParticipants} participants • {event.points} pts
                </div>
              </div>

              {/* Fill bar */}
              <div className="mb-4">
                <div className="flex justify-between text-2xs mb-1">
                  <span className="text-[hsl(var(--foreground-muted))]">Capacity</span>
                  <span className="font-semibold">{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-[hsl(var(--surface-overlay))] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary flex-1 text-xs py-1.5">View Details</button>
                <button
                  onClick={() => toast.success("Joined! Upload your proof after the event.")}
                  className="btn-primary flex-1 text-xs py-1.5"
                >
                  Join Event
                </button>
                <button
                  onClick={() => toast.info("Upload feature coming soon!")}
                  className="btn-ghost text-xs py-1.5 px-3"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
