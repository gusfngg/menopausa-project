import { GoogleGenAI, Type } from "@google/genai";
import { SymptomData, AIAdviceResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPersonalizedAdvice = async (data: SymptomData): Promise<AIAdviceResponse> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Atue como uma especialista em saúde da mulher, focada em menopausa, com um tom acolhedor, empoderador e gentil.
      
      Analise os seguintes dados reportados por uma usuária:
      - Intensidade Geral dos Sintomas (1-10): ${data.intensity}
      - Humor Atual: ${data.mood}
      - Qualidade do Sono: ${data.sleepQuality}
      - Ondas de Calor (Fogachos): ${data.hotFlashes}
      - Nível de Energia/Disposição: ${data.energyLevel}
      - Notas Adicionais: ${data.notes || "Nenhuma nota fornecida"}

      Forneça uma resposta JSON contendo:
      1. "advice": Um parágrafo curto, inspirador e informativo validando o que ela sente. Considere todos os sintomas reportados para criar uma resposta empática.
      2. "actionableSteps": Uma lista de exatamente 3 passos práticos, holísticos ou médicos (sugestão leve) para ela se sentir melhor hoje.
    `;

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
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AIAdviceResponse;

  } catch (error) {
    console.error("Error fetching advice:", error);
    return {
      advice: "No momento, estamos com dificuldade em conectar com nossa assistente virtual. Lembre-se: respire fundo, você é forte e essa fase é passageira.",
      actionableSteps: ["Beba um copo de água fresca", "Pratique 5 minutos de respiração consciente", "Tente descansar um pouco"]
    };
  }
};