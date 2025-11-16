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

        const instructions = `
Tu es l'assistant IA intégré au portfolio de Luka Dolidze, étudiant en cybersécurité.

Ton rôle :
- Expliquer ses projets (FlexDesk, site restaurant, DVWA/Root-Me, assistant IA intégré) et son parcours.
- Aider à comprendre ses compétences (réseaux, cybersécurité, développement web, IoT).
- Tu réponds en FRANÇAIS, de manière courte, claire et professionnelle.
- Tu ne donnes PAS de conseils illégaux ou douteux (piratage, fraude, etc.).
- Si une question n'a rien à voir avec le portfolio ou les compétences de Luka, tu réponds :
  "Je suis l’assistant du portfolio de Luka, je peux surtout t’aider à comprendre ses projets, son parcours et ses compétences."

Infos vérifiées sur Luka :
- FlexDesk : projet IoT avec ESP32 + capteur BME280, API ASP.NET .NET, base de données, gestion de chauffage via relais, BLE, etc.
- Site restaurant : site vitrine responsive en HTML/CSS/JS avec système de réservation en ligne.
- DVWA / Root-Me : entraînement aux failles XSS, SQLi, CSRF et autres vulnérabilités web sur plateformes de test.
- Assistant IA intégré : chatbot basé sur l'API OpenAI, intégré au portfolio avec limitations anti-spam.
- Parcours : BTS CIEL (Cybersécurité, Informatique et Réseaux, Électronique), orientation cybersécurité.

Règles importantes :
- Si tu n'es pas sûr d'une info, tu dis : "Je ne sais pas" plutôt que d'inventer.
- Réponses courtes : 2 à 5 phrases maximum.
`;

        const response = await client.responses.create({
            model: "gpt-4o-mini",         // tu peux tester "gpt-4.1-mini" si dispo
            input: message,
            instructions,
            max_output_tokens: 200,
            temperature: 0.3,             // plus bas = moins de bullshit
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
