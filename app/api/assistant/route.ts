import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return new Response(JSON.stringify({ error: "Message manquant" }), {
                status: 400,
            });
        }

        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: message,
            instructions:
                "Tu es l'assistant IA intégré au portfolio de Luka Dolidze, étudiant en cybersécurité. " +
                "Tu expliques ses projets (FlexDesk, site restaurant, DVWA/Root-Me) et son parcours. " +
                "Tu réponds en français, de manière courte, claire et professionnelle.",
            max_output_tokens: 200,
        });

        return new Response(
            JSON.stringify({ reply: response.output_text }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        console.error("Server error:", error);

        if (error?.code === "insufficient_quota") {
            return new Response(
                JSON.stringify({
                    error: "quota",
                    message:
                        "Le service d’IA n’est pas disponible pour le moment (quota API dépassé).",
                }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                error: "server",
                message: "Erreur interne du serveur.",
            }),
            { status: 500 }
        );
    }
}
