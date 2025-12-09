import { GoogleGenAI, Type } from "@google/genai";
import { TripData } from "../types";

export const generateTripPlan = async (): Promise<TripData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    我是一名游客，计划去河南郑州的“只有河南·戏剧幻城”游玩两天。
    目标：用两天时间看完所有的表演（或者尽可能多）。
    请为我生成一份详细的攻略数据。

    要求包含以下内容：
    1. 分析：为什么大家都推荐去“只有河南”？它的核心魅力是什么？
    2. 剧目列表：列出3大主剧场和部分精彩的微剧场，标明哪些是“必看”。
    3. 行程：生成详细的2天日程表，包含早中晚的具体时间安排，考虑到剧场之间的移动和排队时间。
       - 第一天侧重于主剧场和核心区域。
       - 第二天查漏补缺，观看微剧场和夜景。

    请严格按照JSON Schema返回数据。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: {
            type: Type.OBJECT,
            properties: {
              whyPopular: { type: Type.STRING, description: "Detailed explanation why it is recommended" },
              culturalSignificance: { type: Type.STRING, description: "Short summary of cultural value" }
            },
            required: ["whyPopular", "culturalSignificance"]
          },
          shows: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Major", "Micro"] },
                duration: { type: Type.STRING },
                description: { type: Type.STRING },
                mustSee: { type: Type.BOOLEAN },
                location: { type: Type.STRING }
              },
              required: ["name", "type", "description", "mustSee"]
            }
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.INTEGER },
                title: { type: Type.STRING },
                events: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      description: { type: Type.STRING },
                      isShow: { type: Type.BOOLEAN },
                      showName: { type: Type.STRING }
                    },
                    required: ["time", "activity", "description", "isShow"]
                  }
                }
              },
              required: ["dayNumber", "title", "events"]
            }
          }
        },
        required: ["analysis", "shows", "itinerary"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No data received from Gemini");
  }

  return JSON.parse(response.text) as TripData;
};