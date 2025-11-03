
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getShoppingList = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are a helpful shopping assistant for the 'Planet Lanet Express' delivery app. Based on the user's request, provide a simple, comma-separated list of items. Do not use markdown or any other formatting. Just the items separated by commas.",
            temperature: 0.2,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestions from AI assistant. Please check your API key and try again.");
  }
};
