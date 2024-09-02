import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function POST(req) {
    try {
        const { interests, strengths, careerGoals } = await req.json();

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an AI assistant for a university's "Major Advisor" system. A student has provided the following information:
Interests: ${interests}
Strengths: ${strengths}
Career Goals: ${careerGoals}

Based on this information, provide a helpful recommendation for the student's major and career path. Explain your reasoning and include relevant details about why this major and career path would be a good fit for the student.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        return NextResponse.json({ recommendation: generatedText });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
