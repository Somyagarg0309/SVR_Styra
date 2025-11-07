const axios = require("axios");

const IMAGE_TO_TXT_API = process.env.IMAGE_TO_TXT_API;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function fashionBotHandler(req, res) {
  try {
    const { image, prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    let dressDescription = null;

    if (image) {
      const imageResp = await axios.post(
        "https://api.imagedescriber.app/api/v1/generate_content",
        { image, prompt: "Give me clear and in-depth detailing of the image", lang: "en" },
        { headers: { Authorization: `Bearer ${IMAGE_TO_TXT_API}`, "Content-Type": "application/json" } }
      );
      if (imageResp.data?.code === 0) dressDescription = imageResp.data.data.content || null;
    }

    const systemContent = `
You are an expert fashion stylist. User provides a dress description and asks for advice.
Based on dress description, suggest jewelry, makeup, and accessories. Keep it practical and <= 100 words and in pragraph form.
Dress Description: ${dressDescription || "null"}
`;
    const userContent = `User Question: ${prompt}`;

    const groqResp = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userContent }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      { headers: { Authorization: `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" } }
    );

    const advice = groqResp.data.choices?.[0]?.message?.content || "No advice generated.";
    res.json({ advice });
  } catch (error) {
    console.error("Error in fashionBotHandler:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { fashionBotHandler };
