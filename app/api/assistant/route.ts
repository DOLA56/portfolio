import OpenAI from "openai";
import fs from "fs";
import path from "path";

// IMPORTANT : on force le runtime Node.js pour pouvoir utiliser fs
export const runtime = "nodejs";

// Chemin vers cv.txt 
const cvPath = path.join(process.cwd(), "app", "api", "assistant", "cv.txt");
const cvContent = fs.readFileSync(cvPath, "utf8");

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
Tu es l’assistant IA intégré au portfolio de Luka Dolidze, étudiant en cybersécurité.

Voici son CV :
${cvContent}

Ton rôle :
- Expliquer ses projets (FlexDesk, Atelier Lou Pastou, DVWA/Root-Me, assistant IA intégré) et son parcours.
- Aider à comprendre ses compétences (réseaux, cybersécurité, dev web, IoT).
- Répondre en FRANÇAIS, de manière courte, claire et professionnelle.
- Tu ne donnes PAS de conseils illégaux ou douteux (piratage, fraude, etc.).
- Si une question n’a rien à voir avec le portfolio ou son profil, redirige vers le sujet MAIS varie ta formulation à chaque fois. Ne répète jamais deux fois la même phrase de redirection. Sois naturel, parfois court, parfois un peu plus détaillé, parfois avec humour léger.

Règles :
- Si l’info est dans le CV ci-dessus, tu la donnes DIRECTEMENT sans hésiter. Par exemple si on demande le téléphone, l’email, le portfolio, tu réponds avec la valeur exacte du CV.
- Si tu n’es pas sûr d’une info qui n’est PAS dans le CV, tu dis : "Je ne sais pas" plutôt que d’inventer.
- Réponses courtes : 2 à 5 phrases maximum.
- Tu n’as PAS besoin de te présenter à chaque réponse.
`;

        const response = await client.responses.create({
            model: "gpt-4o-mini", 
            input: message,
            instructions,
            max_output_tokens: 200,
            temperature: 0.3,
        });

        return new Response(JSON.stringify({ reply: response.output_text }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
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
