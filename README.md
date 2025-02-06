# AI Content Generator

An AI-powered content generation platform built with Next.js, TypeScript, and Google's Gemini AI API that helps create various types of content using customizable templates.

## Features

- 🤖 AI Content Generation with customizable templates
- 🔐 Secure user authentication via Clerk.js
- 📊 Real-time usage tracking and credits system
- 📝 Content history management
- 💾 PostgreSQL database with DrizzleORM
- 📱 Responsive design using TailwindCSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL (Neon)
- **ORM**: DrizzleORM
- **Authentication**: Clerk.js
- **AI**: Google Gemini AI
- **UI**: shadcn/ui components

## Installation

# Clone the repository

git clone https://github.com/thanhng2706/AI-Content-Gen.git
cd ai-content-generator

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Environment Setup

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_key
DATABASE_URL=your_neon_db_url

# Authentication
Beautiful and secure authentication powered by Clerk.js <br>
![LogInPage](/ai-content-generator/Image/LogInPage.png)

# Dashboard
Intuitive dashboard with multiple content templates <br>
![FrontPage](/ai-content-generator/Image/FrontPage.png)

# Content Generation (one of them)
AI-powered content generation with customizable inputs <br>
![AIGen](/ai-content-generator/Image/AIGen.png)

# History Management
Track and manage your generated content <br>
![HistoryPage](/ai-content-generator/Image/HistoryPage.png)

# User Settings
Manage your account and usage <br>
![SettingPage](/ai-content-generator/Image/SettingPage.png)

License
MIT © Thanh Nguyen

Contact
GitHub: @thanhng2706