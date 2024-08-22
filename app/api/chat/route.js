import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = 'rag-index';
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Initialize Pinecone client
    const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
    const index = pinecone.Index(PINECONE_INDEX);

    // Create embedding for the user's query
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "models/embedding-001",
      apiKey: GOOGLE_API_KEY,
    });
    const queryEmbedding = await embeddings.embedQuery(message);

    // Query Pinecone
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    const relevantProfessors = queryResponse.matches.map(match => match.metadata);
    
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an AI assistant for a university's "Rate My Professor" system. A student has asked the following question: "${message}"

Based on this query and the following professor data, provide a helpful response:
${JSON.stringify(relevantProfessors, null, 2)}

Please recommend the most suitable professor(s) for the student's needs, explaining your reasoning. Include relevant details about the professors' expertise, teaching style, and any other information that might be helpful for the student.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}