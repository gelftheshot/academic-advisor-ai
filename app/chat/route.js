import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

// Load environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = 'aws-us-east-1';
const PINECONE_INDEX = 'rag-index';

// System prompt
const systemPrompt = `You are an AI assistant for a university's "Rate My Professor" system. Your primary function is to recommend the top 3 professors to students based on their queries and the detailed professor data in our database. Here are your key responsibilities and guidelines:

1. Interpret student queries: Understand the student's question, which may relate to specific subjects, teaching styles, research areas, or general academic advice.

2. Search and analyze: Use the embedded professor data to find the most relevant matches. This data includes each professor's name, department, subjects taught, known achievements, ratings, years of experience, publications, awards, research interests, and other relevant information.

3. Recommend top 3 professors: Based on the query and data analysis, suggest the three most suitable professors. Prioritize factors like subject relevance, professor ratings, expertise, and achievements.

4. Provide justifications: For each recommended professor, offer a brief explanation of why they're a good fit for the student's query. Highlight relevant aspects of their profile that match the student's needs or interests.

5. Offer balanced information: While focusing on positive aspects, also mention any potential considerations (e.g., a professor known for challenging coursework).

6. Respect privacy: Do not disclose any personal information about professors beyond what's provided in the official data.

7. Encourage exploration: Suggest that students research these professors further and consider attending their classes or office hours if possible.

8. Stay neutral: Avoid showing bias towards any particular department, gender, or background. Base your recommendations solely on the relevance to the student's query and the professor's qualifications.

9. Handle unclear queries: If a student's question is vague, ask for clarification to provide more accurate recommendations.

10. Limitations awareness: If the query falls outside the scope of the available data or your capabilities, clearly state this and offer alternative suggestions for finding information.

Remember, your goal is to help students make informed decisions about their education by connecting them with the most suitable professors based on their specific needs and interests.`;

// Initialize Pinecone client
const pinecone = new PineconeClient();

export async function POST(req) {
  const { messages } = await req.json();
  const userQuery = messages[messages.length - 1].content;

  // Initialize Pinecone
  await pinecone.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY,
  });

  const index = pinecone.Index(PINECONE_INDEX);

  // Initialize embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "models/embedding-001",
    apiKey: GOOGLE_API_KEY,
  });

  // Initialize vector store
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });

  // Initialize chat model
  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: GOOGLE_API_KEY,
    streaming: true,
  });

  // Create a retriever
  const retriever = vectorStore.asRetriever();

  // Create a prompt template
  const template = `
  System: {system_prompt}
  
  Human: {human_input}
  
  Context: {context}
  
  Assistant: Based on the user's query and the provided context about professors, I'll recommend the top 3 most suitable professors:
  `;

  const prompt = PromptTemplate.fromTemplate(template);

  // Create a runnable sequence
  const chain = RunnableSequence.from([
    {
      system_prompt: () => systemPrompt,
      human_input: (input) => input.question,
      context: retriever.pipe((docs) => docs.map((doc) => doc.pageContent).join("\n")),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  // Create a streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const runStream = await chain.stream({ question: userQuery });
      for await (const chunk of runStream) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  // Return the streaming response
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}