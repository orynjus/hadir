import { GoogleGenAI } from "@google/genai";

// For models that don't require user-selected key
const getGenAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const editImageWithFlashImage = async (base64Data: string, mimeType: string, prompt: string) => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image returned from AI");
};
