import { OpenAI } from "openai";

const HF_TOKEN = import.meta.env.HF_TOKEN;

export const POST = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Messages doit être un tableau",
          received: typeof messages,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new OpenAI({
      baseURL: import.meta.env.HF_URL,
      apiKey: HF_TOKEN,
    });

    const systemMessage = {
      role: "system",
      content: `You are an SVG eyeglasses generator. Generate SVG code with:
      - <g id="branches">...</g>
      - <g id="monture">...</g>
      - Use MONTURE_COLOR and BRANCHES_COLOR placeholders
      Always return only valid SVG code.`,
    };

    const chatCompletion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [systemMessage, ...messages],
    });

    const message = chatCompletion.choices[0].message;
    const svgMatch = message.content.match(/<svg[\s\S]*?<\/svg>/i);
    const finalSvg = svgMatch ? svgMatch[0] : message.content;

    return new Response(
      JSON.stringify({
        svg: {
          content: finalSvg,
          role: "assistant",
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la génération",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
