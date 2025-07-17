#!/bin/bash

# Deployment script for Render
echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! dist/ folder created."
    echo "📁 Contents of dist/:"
    ls -la dist/
else
    echo "❌ Build failed! dist/ folder not found."
    exit 1
fi

echo "🎉 Deployment preparation complete!"
echo "📋 Next steps:"
echo "1. Push your code to your Git repository"
echo "2. Connect your repository to Render"
echo "3. Set the GEMINI_API_KEY environment variable in Render"
echo "4. Deploy using the render.yaml configuration" 