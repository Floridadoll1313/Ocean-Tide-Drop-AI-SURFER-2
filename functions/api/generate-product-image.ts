export async function onRequestPost({ request, env }) {
  try {
    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OpenAI API Key not configured" }), { status: 500 });
    }

    const { title, description } = await request.json();
    if (!title || !description) {
      return new Response(JSON.stringify({ error: "Title and description are required" }), { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `A cinematic, highly detailed digital artwork representing a marketing service tier named "${title}". Description: "${description}". The visual style should be neon-cyan and magenta, mythic surf, outer banks themed, digital ocean, futuristic. No text in the image.`,
        n: 1,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Failed to generate image" }), { status: response.status });
    }

    return new Response(JSON.stringify({ imageUrl: data.data[0].url }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), { status: 500 });
  }
}
