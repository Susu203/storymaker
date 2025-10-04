import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/idea", async (req, res) => {
  const { storyStart, length, audience, style } = req.body;

  if (!storyStart) {
    return res.status(400).json({ error: "El inicio de la historia es obligatorio" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const prompt = `
Continúa esta historia en español de forma coherente y creativa:

"${storyStart}"

Requisitos:
- Extensión: ${length === "short" ? "máximo 2 frases" : length === "medium" ? "1 párrafo" : "2 párrafos"}
- Audiencia: ${audience === "kids" ? "apta para niños, lenguaje sencillo" : "para público general"}
- Estilo: ${style}
- Mantén el tono y la coherencia narrativa
- Sin preámbulos ni introducciones, continúa directamente la historia
`;

    if (apiKey) {
      const geminiResult = await generateWithGemini(prompt, apiKey);
      if (geminiResult) {
        return res.json({ idea: geminiResult, source: "Google Gemini AI" });
      }
    }

    return res.json({
      idea: generateFallbackIdea(storyStart),
      source: "Generador Local",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function generateWithGemini(prompt, apiKey) {
  try {
    console.log("🔄 Enviando a Google Gemini Flash 2...");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const ideaText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (ideaText && ideaText.length >= 30) {
      console.log(`💡 Continuación: ${ideaText.substring(0, 80)}...`);
      return ideaText;
    }

    return null;
  } catch (error) {
    console.error("❌ Error con Gemini:", error.response?.status || error.message);
    return null;
  }
}

function generateFallbackIdea(storyStart) {
  console.log(`🎭 Fallback local generado`);
  return `(${storyStart})... y así, el destino tomó un giro inesperado.`;
}

export default router;
