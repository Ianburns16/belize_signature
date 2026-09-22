"use client";

import { useState, useMemo } from "react";
import { Search, Mail, CheckCircle2, Circle, MessageSquare, X, Calendar, User, ExternalLink, ArrowRight } from "lucide-react";
import { toggleContactStatus } from "@/app/actions/contact";

interface MessageItem {
  id: number;
  created_at: string;
  name: string | null;
  email: string | null;
  question: string | null;
  contacted: boolean;
}

interface AdminMessagesClientProps {
  initialMessages: MessageItem[];
}

export function AdminMessagesClient({ initialMessages }: AdminMessagesClientProps) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "uncontacted" | "contacted">("all");
  const [activeMessage, setActiveMessage] = useState<MessageItem | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    setTogglingId(id);
    // Optimistic update
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, contacted: !currentStatus } : msg))
    );
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage((prev) => (prev ? { ...prev, contacted: !currentStatus } : null));
    }

    try {
      await toggleContactStatus(id, currentStatus);
    } catch (e) {
      // Revert on error
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, contacted: currentStatus } : msg))
      );
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage((prev) => (prev ? { ...prev, contacted: currentStatus } : null));
      }
    } finally {
      setTogglingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const query = search.toLowerCase();
      const matchesSearch =
        (msg.name?.toLowerCase().includes(query) ?? false) ||
        (msg.email?.toLowerCase().includes(query) ?? false) ||
        (msg.question?.toLowerCase().includes(query) ?? false);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "uncontacted" && !msg.contacted) ||
        (statusFilter === "contacted" && msg.contacted);

      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  const uncontactedCount = messages.filter((m) => !m.contacted).length;
  const contactedCount = messages.filter((m) => m.contacted).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
            Customer Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and respond to messages submitted via the website contact form.
          </p>
        </div>

        {uncontactedCount > 0 && (
          <div className="bg-orange-50 border border-brand-orange/30 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-brand-dark">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse"></span>
            <span>{uncontactedCount} inquiry{uncontactedCount > 1 ? "s" : ""} awaiting response</span>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange outline-none focus:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-semibold self-stretch sm:self-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "all" ? "bg-white text-brand-dark shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            All <span className="text-[10px] px-1.5 py-0.2 bg-gray-200 rounded-full">{messages.length}</span>
          </button>
          <button
            onClick={() => setStatusFilter("uncontacted")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "uncontacted" ? "bg-white text-brand-orange shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            Needs Response <span className="text-[10px] px-1.5 py-0.2 bg-orange-100 text-brand-orange rounded-full">{uncontactedCount}</span>
          </button>
          <button
            onClick={() => setStatusFilter("contacted")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "contacted" ? "bg-white text-green-700 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Contacted <span className="text-[10px] px-1.5 py-0.2 bg-green-100 text-green-800 rounded-full">{contactedCount}</span>
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      !msg.contacted ? "bg-orange-50/20" : ""
                    }`}
                  >
                    {/* Date */}
                    <td className="p-4 pl-6 whitespace-nowrap text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>

                    {/* Sender Name & Email */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-brand-dark text-sm">
                        {msg.name || "Unknown"}
                      </div>
                      {msg.email && (
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-brand-orange hover:underline block mt-0.5"
                        >
                          {msg.email}
                        </a>
                      )}
                    </td>

                    {/* Question snippet */}
                    <td className="p-4 max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {msg.question || "No message content"}
                      </p>
                      {msg.question && msg.question.length > 80 && (
                        <button
                          type="button"
                          onClick={() => setActiveMessage(msg)}
                          className="text-xs text-brand-dark/70 hover:text-brand-orange font-semibold mt-1 inline-block"
                        >
                          Read full inquiry &rarr;
                        </button>
                      )}
                    </td>

                    {/* Status Pill / Toggle */}
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(msg.id, msg.contacted)}
                        disabled={togglingId === msg.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          msg.contacted
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-orange-100 text-brand-orange hover:bg-orange-200"
                        } disabled:opacity-50`}
                      >
                        {msg.contacted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Contacted
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5" /> Needs Response
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveMessage(msg)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold rounded-lg transition-colors"
                        >
                          View
                        </button>
                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}?subject=Re:%20Belize%20Signature%20Adventures%20Inquiry&body=Hi%20${encodeURIComponent(
                              msg.name || "there"
                            )},%0D%0A%0D%0AThank%20you%20for%20contacting%20Belize%20Signature%20Adventures!`}
                            className="px-3 py-1.5 bg-brand-orange text-white hover:bg-brand-orange/90 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Mail className="w-3.5 h-3.5" /> Reply
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-gray-700">No messages found</p>
                      <p className="text-xs text-gray-400">
                        {search || statusFilter !== "all"
                          ? "Try clearing your search query or switching tabs."
                          : "No inquiries submitted yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                    activeMessage.contacted
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-brand-orange"
                  }`}
                >
                  {activeMessage.contacted ? "Contacted" : "Needs Response"}
                </span>
                <h3 className="text-xl font-heading text-brand-dark uppercase">
                  {activeMessage.name || "Anonymous Traveler"}
                </h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-bold uppercase text-gray-400">Email:</span>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="text-brand-orange font-semibold hover:underline"
                >
                  {activeMessage.email || "None"}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="font-bold uppercase text-gray-400">Received:</span>
                <span>
                  {new Date(activeMessage.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Message Content
              </label>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-800 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {activeMessage.question}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleToggleStatus(activeMessage.id, activeMessage.contacted)}
                className="text-xs font-semibold text-gray-600 hover:text-brand-dark flex items-center gap-1.5"
              >
                {activeMessage.contacted ? (
                  <>
                    <Circle className="w-4 h-4 text-gray-400" /> Mark as Needs Response
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Mark as Contacted
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                {activeMessage.email && (
                  <a
                    href={`mailto:${activeMessage.email}?subject=Re:%20Belize%20Signature%20Adventures%20Inquiry&body=Hi%20${encodeURIComponent(
                      activeMessage.name || "there"
                    )},%0D%0A%0D%0AThank%20you%20for%20contacting%20Belize%20Signature%20Adventures!`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" /> Reply Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
