"use client";

import { useState, FormEvent } from "react";

type Msg = {
    from: "user" | "bot";
    text: string;
};

export default function AssistantIA() {
    const [messages, setMessages] = useState<Msg[]>([
        {
            from: "bot",
            text:
                "Salut ! Je suis l’assistant IA de Luka. Tu veux en savoir plus sur ses projets ? 😊",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true); // 🔥 état ouverture/fermeture du chat

    async function sendMessage(e: FormEvent) {
        e.preventDefault();
        const content = input.trim();
        if (!content || loading) return;

        // 🔒 Anti-spam : max 20 questions / 30 minutes
        const now = Date.now();
        const limitWindow = 30 * 60 * 1000;
        const maxMessages = 20;

        let history: number[] = [];

        try {
            const raw = localStorage.getItem("assistantMsgHistory");
            history = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(history)) history = [];
        } catch {
            history = [];
        }

        history = history.filter((t) => now - t < limitWindow);

        if (history.length >= maxMessages) {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Tu as atteint la limite de 20 questions en 30 minutes. Réessaie plus tard 🚫" },
            ]);
            return;
        }

        history.push(now);
        localStorage.setItem("assistantMsgHistory", JSON.stringify(history));

        setMessages((prev) => [...prev, { from: "user", text: content }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: content }),
            });

            const data = await res.json();

            if (data.reply) {
                setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
            } else if (data.error === "quota") {
                setMessages((prev) => [
                    ...prev,
                    { from: "bot", text: "L’IA n’est pas disponible pour le moment (quota OpenAI dépassé)." },
                ]);
            } else {
                setMessages((prev) => [...prev, { from: "bot", text: "Erreur serveur." }]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Erreur de connexion au serveur." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* 🔘 Bulle d’ouverture */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center text-xl transition"
                >
                    💬
                </button>
            )}

            {/* 🟣 Fenêtre du chat */}
            {open && (
                <div className="fixed bottom-6 right-6 w-80 max-h-[70vh] rounded-xl bg-neutral-900/95 border border-neutral-700 shadow-lg flex flex-col overflow-hidden text-sm animate-fadeIn">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-neutral-700 font-semibold flex justify-between items-center">
                        Assistant IA – Luka

                        {/* ❌ Bouton fermer */}
                        <button
                            onClick={() => setOpen(false)}
                            className="text-neutral-400 hover:text-white text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={
                                    "max-w-[90%] px-3 py-2 rounded-xl " +
                                    (m.from === "user"
                                        ? "ml-auto bg-indigo-600 text-white"
                                        : "mr-auto bg-neutral-800 text-white")
                                }
                            >
                                {m.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="mr-auto text-xs text-neutral-400">L’IA écrit…</div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={sendMessage}
                        className="p-2 border-t border-neutral-700 flex gap-2"
                    >
                        <input
                            className="flex-1 bg-neutral-800 rounded-lg px-3 py-2 text-xs outline-none"
                            placeholder="Pose une question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 px-3 py-2 rounded-lg text-xs disabled:opacity-40"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
