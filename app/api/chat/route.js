import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { PineconeStore } from "@langchain/pinecone";

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
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();
  const userQuery = messages[messages.length - 1].content;

  // Get the index
  const index = pinecone.index(PINECONE_INDEX);

  // Initialize embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "models/embedding-001",
    apiKey: GOOGLE_API_KEY,
  });

  // Initialize vector store with error handling
  let vectorStore;
  try {
    vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });
  } catch (error) {
    console.error("Error initializing vector store:", error);
    return new NextResponse("Error initializing vector store", { status: 500 });
  }

  // Create a retriever with error handling
  const retriever = vectorStore.asRetriever({
    callbacks: [{
      handleRetrieverError: (error) => {
        console.error("Retriever error:", error);
        return []; // Return an empty array if there's an error
      }
    }]
  });

  // Initialize chat model
  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: GOOGLE_API_KEY,
    streaming: true,
  });

  // Create a prompt template
  const template = `
  System: {system_prompt}
  
  Human: {human_input}
  
  Context: {context}
  
  Assistant: Based on the user's query and the provided context about professors, I'll recommend the top 3 most suitable professors:
  `;

  const prompt = PromptTemplate.fromTemplate(template);

  // Create a runnable sequence with error handling
  const chain = RunnableSequence.from([
    {
      system_prompt: () => systemPrompt,
      human_input: (input) => input.question,
      context: async (input) => {
        try {
          const docs = await retriever.getRelevantDocuments(input.question);
          return docs.map((doc) => doc.pageContent).join("\n");
        } catch (error) {
          console.error("Error retrieving documents:", error);
          return ""; // Return an empty string if there's an error
        }
      },
    },
    prompt,
    async (input) => {
      try {
        return await model.invoke(input);
      } catch (error) {
        if (error.message.includes("RECITATION")) {
          console.error("RECITATION error:", error);
          return "I apologize, but I couldn't generate a response due to content restrictions. Could you please rephrase your question?";
        }
        throw error;
      }
    },
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