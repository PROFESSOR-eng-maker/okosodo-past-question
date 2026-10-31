const ALLOWED_ORIGIN = "https://professor-eng-maker.github.io";
const MODEL = "@cf/zai-org/glm-4.7-flash";

function json(data, status = 200, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
      "Cache-Control": "no-store"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) {
      return new Response("Forbidden", { status: 403 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin"
        }
      });
    }

    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
      return json({ service: "Okosodo AI Study Assistant", status: "online" });
    }
    if (url.pathname !== "/api/chat" || request.method !== "POST") {
      return json({ error: "Not found." }, 404);
    }
    if (!env.AI) return json({ error: "The AI model binding is not enabled yet." }, 503);
    const length = Number(request.headers.get("Content-Length") || 0);
    if (length > 24000) return json({ error: "That conversation is too long. Start a new chat." }, 413);

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Please send a valid question." }, 400); }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: "Type a study question first." }, 400);
    }
    const messages = body.messages.slice(-10).filter(item =>
      item && (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string" && item.content.trim().length > 0 &&
      item.content.length <= 2500
    );
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return json({ error: "Your latest message must be a question." }, 400);
    }

    const system = {
      role: "system",
      content: "You are Okosodo AI Study Assistant, a friendly and patient tutor for secondary-school and examination students in Nigeria. Help with WAEC, NECO, JAMB and school subjects. Explain concepts in clear age-appropriate language, show working step by step for maths and science, define unfamiliar terms, and use short examples. If a question is ambiguous, ask one concise clarification. When asked for practice, create original questions and provide answers with explanations. Never claim original questions are official past papers. Do not request personal information. Do not provide dangerous instructions. Be honest when unsure and encourage checking important facts with textbooks and teachers. Keep answers focused and easy to understand."
    };

    try {
      const result = await env.AI.run(MODEL, {
        messages: [system, ...messages],
        max_tokens: 700,
        temperature: 0.45
      });
      const answer = typeof result?.response === "string"
        ? result.response
        : typeof result?.result?.response === "string"
          ? result.result.response
          : typeof result?.choices?.[0]?.message?.content === "string"
            ? result.choices[0].message.content
            : "";
      if (!answer.trim()) return json({ error: "The AI could not produce an answer. Please try again." }, 502);
      return json({ response: answer.trim() });
    } catch (error) {
      return json({ error: "The free AI service is busy or its daily allowance has been reached. Please try again later." }, 503);
    }
  }
};
