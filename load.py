import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import json

# Load environment variables from .env.local
load_dotenv(dotenv_path='.env.local')

# Get API keys
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
GOOGLE_API_KEY = os.getenv('GOOGLE_GENERATIVE_AI_API_KEY')

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_GENERATIVE_AI_API_KEY not found in environment variables")

index_name = 'rag-index'
dim = 768  # Dimension for embeddings

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check if index exists and create if it doesn't
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=dim,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    print(f"Created new index '{index_name}' with dimension {dim}")
else:
    print(f"Using existing index '{index_name}'")

# Get the index
index = pc.Index(index_name)

def json_file_path(json_file_path):
    # Load JSON data
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    # Convert each JSON object to a string
    texts = [json.dumps(item) for item in data]
    
    # Initialize Google Generative AI embedding model
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY,
        dimensions=768
    )
    
    # Create Pinecone vector store
    vectorstore = LangchainPinecone.from_texts(
        texts=texts,
        embedding=embeddings,
        index_name=index_name,
        namespace="json_data"
    )
    
    print(f"Embedded {len(texts)} JSON objects into Pinecone index '{index_name}'")

# Call the function with your JSON file
json_file_path('data.json')