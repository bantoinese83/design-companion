#!/bin/bash

echo "🏗️ Architectural Design Companion - API Key Setup"
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local file already exists."
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
fi

# Prompt for API key
echo "Get your Gemini API key from: https://ai.google.dev/gemini-api/docs/api-key"
echo ""
read -p "Enter your Gemini API key: " api_key

# Validate input
if [ -z "$api_key" ]; then
    echo "❌ Error: API key cannot be empty"
    exit 1
fi

# Create .env.local file
echo "GEMINI_API_KEY=$api_key" > .env.local

echo ""
echo "✅ API key configured successfully!"
echo "📄 Created .env.local with your API key"
echo ""
echo "🚀 You can now run: npm run dev"
echo ""
echo "Note: Restart your development server if it's already running."