import { GoogleGenAI, Type } from "@google/genai";
import { SymptomData, AIAdviceResponse } from "../types";

const getFallbackAdvice = (data: SymptomData): AIAdviceResponse => {
  return {
    advice: "No momento, estamos operando em modo de demonstração local. Lembre-se: respire fundo, você é forte e essa fase é passageira. Sua saúde é prioridade.",
    actionableSteps: [
      "Beba um copo de água fresca agora",
      "Pratique 5 minutos de respiração consciente",
      "Tente descansar um pouco se possível"
    ]
  };
};

export const getPersonalizedAdvice = async (data: SymptomData): Promise<AIAdviceResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey.includes("YOUR_API_KEY") || apiKey === "undefined") {
      console.warn("API Key não detectada. Usando fallback.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getFallbackAdvice(data);
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.0-flash"; 

    const prompt = `
Atue como uma especialista em saúde da mulher, focada em menopausa, com tom acolhedor e gentil. Voce realiza instrusções que a pessoa se sinta extremamente individual e personalizada

Dados da usuária:
- Intensidade dos Sintomas: ${data.intensity}/10
- Humor: ${data.mood}
- Qualidade do Sono: ${data.sleepQuality}
- Ondas de Calor: ${data.hotFlashes}
- Nível de Energia: ${data.energyLevel}
- Notas: ${data.notes || "Nenhuma"}

Responda com um JSON válido contendo:
- "advice": Um parágrafo curto e empático, cite os sintomas que ela relatou nas notas (máximo 440 caracteres)
- "actionableSteps": Array com exatamente 3 passos práticos (cada um com máximo 100 caracteres)

IMPORTANTE: Não use quebras de linha dentro das strings. Mantenha tudo em uma linha.
    `.trim();

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            actionableSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["advice", "actionableSteps"]
        },
        temperature: 0.7,
        maxOutputTokens: 500
      }
    });

    const text = response.text;
    
    if (!text) {
      console.warn("Resposta vazia da API");
      return getFallbackAdvice(data);
    }

    console.log("Resposta bruta da API:", text.substring(0, 200) + "...");

    let cleanText = text.trim();
    
    cleanText = cleanText.replace(/```json\n?|\n?```/g, "");
    
    cleanText = cleanText.replace(/\n/g, " ");
    
    const parsed = JSON.parse(cleanText) as AIAdviceResponse;
    
    if (!parsed.advice || !Array.isArray(parsed.actionableSteps)) {
      throw new Error("JSON inválido retornado");
    }

    return parsed;

  } catch (error) {
    console.error("Error fetching advice:", error);
    
    if (error instanceof SyntaxError) {
      console.error("JSON Parse Error - resposta estava malformada");
    }
    
    return getFallbackAdvice(data);
  }
};