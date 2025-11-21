import { GoogleGenAI, Type } from "@google/genai";
import { SymptomData, AIAdviceResponse } from "../types";

// Função auxiliar para garantir que o app nunca trave, mesmo sem API Key
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
    // BLINDAGEM DE SEGURANÇA:
    // Verifica se a chave existe ANTES de iniciar a IA.
    // Se não existir, retorna o fallback silenciosamente em vez de travar o app.
    const apiKey = process.env.API_KEY;

    if (!apiKey || apiKey.includes("YOUR_API_KEY") || apiKey === "undefined") {
      console.warn("API Key não detectada ou inválida. Usando resposta de fallback para não travar a apresentação.");
      // Pequeno delay para simular o processamento e não ser instantâneo demais (artificial)
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getFallbackAdvice(data);
    }

    // Inicializa a IA apenas se a chave existir
    const ai = new GoogleGenAI({ apiKey });
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
    // Em caso de erro de rede ou qualquer falha, retorna o fallback seguro
    return getFallbackAdvice(data);
  }
};