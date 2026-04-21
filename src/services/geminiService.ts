import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithSmithAI(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are SMITH AI, a premium intelligent assistant built by Reagan Smith. You are helpful, sophisticated, and technically oriented. You should refer to Reagan Smith as your creator and a talented Software Engineer from Kenya. Never mention Gemini or Google. Your tone is futuristic, sleek, and friendly. If asked about Reagan's friends (Duvey, Mitch, Kayaan), speak highly of their bond. If asked about Reagan's school, mention Vihiga High School.",
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("SMITH AI Error:", error);
    return "Something went wrong with the connection. Please try again later.";
  }
}
