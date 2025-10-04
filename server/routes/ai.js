import express from "express";
// Importa axios para hacer solicitudes HTTP
import axios from "axios";

//Creamos un router para definir las rutas que luego exportaremos
const router = express.Router();

//Peticion post usando la variable topic que mandamos desde el frontend
router.post("/idea", async (req, res) => {
  const { topic, length, audience, style } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const prompt = `
Genera una historia en español sobre: ${topic}

Requisitos:
- Extensión: ${length === "short" ? "máximo 2 frases" : length === "medium" ? "1 párrafo" : "2 párrafos"}
- Audiencia: ${audience === "kids" ? "apta para niños, lenguaje sencillo" : "para público general"}
- Estilo: ${style}
- Sin preámbulos, solo la idea
`;

    if (apiKey) {
      const geminiResult = await generateWithGemini(prompt, apiKey);
      if (geminiResult) {
        return res.json({ idea: geminiResult, source: "Google Gemini AI" });
      }
    }

    return res.json({ idea: generateFallbackIdea(topic), source: "Generador Local" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


async function generateWithGemini(topic, apiKey) {
  try {
    const prompt = `Genera una idea creativa para una historia en español sobre: ${topic}

Requisitos:
- 2-3 oraciones máximo
- Incluir protagonista interesante
- Conflicto o giro inesperado
- Sin preámbulos, solo la idea`;

    console.log("🔄 Enviando a Google Gemini Flash 2...");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      }
    );

    // La respuesta tiene la estructura: candidates[0].content.parts[0].text
    const ideaText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (ideaText && ideaText.length >= 30) {
      console.log(`💡 Idea: ${ideaText.substring(0, 80)}...`);
      return ideaText;
    }

    return null;
  } catch (error) {
    console.error(
      "❌ Error con Gemini:",
      error.response?.status || error.message,
      error.response?.data
    );
    return null;
  }
}

function generateFallbackIdea(topic) {
  const selected = "Error de conexión con IA, intenta de nuevo.";
  console.log(`🎭 Fallback local generado`);
  return selected;
}

export default router;