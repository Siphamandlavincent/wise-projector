
# UHLAKANIPHO AI Assistant

![UHLAKANIPHO Logo](https://i.postimg.cc/3NrMbdj9/Spha-Apps-Logo.png)

## Overview

UHLAKANIPHO is a powerful AI assistant application that provides wisdom and project generation capabilities. The name "UHLAKANIPHO" means "Wisdom" in the Zulu language, reflecting the app's purpose to deliver intelligent insights and assistance.

## Features

- **AI Chat Interface**: Communicate with various AI models
- **Project Generation**: Generate project code and ideas
- **Model Selection**: Choose from a variety of AI models with different capabilities
- **Image Support**: Some models support image analysis and processing

## AI Models Integrated

The application integrates with multiple AI models through OpenRouter API:

| Model | Description | Image Support |
|-------|-------------|--------------|
| Gemini | Google's most capable multimodal model | Yes |
| Llama 2 | Meta's powerful open-source language model | No |
| Mistral | Fast and efficient language model | No |
| Gemma | Google's lightweight and efficient model | No |
| DeepSeek Chat | Advanced conversation model | No |
| DeepSeek Coder | Specialized in code generation and analysis | No |
| CodeLlama | Meta's code-specialized language model | No |

Additional models configured in the environment:
- DeepSeek R1
- DeepSeek Distill
- Gemini Experimental
- Llama 3.3
- OpenChat

## Theme Colors

The application uses a custom theme with the following color codes:

```css
/* Primary Colors */
--wisdom-primary: #FFE900; /* Bright Yellow */
--wisdom-dark: #332421;    /* Dark Brown */

/* Additional Colors */
--wisdom-secondary: #10B981;
--wisdom-accent: #8B5CF6;
--wisdom-light: #F8FAFC;
```

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **Icons**: Lucide React

## Environment Variables

The application requires the following environment variables:

```
# OpenRouter API Key (for accessing multiple models)
OPENROUTER_API_KEY=your_openrouter_api_key

# Site Configuration
SITE_NAME=UHLAKANIPHO AI Agent

# Theme Colors
VITE_PRIMARY_COLOR=#FFE900
VITE_DARK_COLOR=#332421
VITE_SITE_NAME=UHLAKANIPHO
```

Additional API keys for specific models can be added if you want to use them directly.

## Step-by-Step Setup Guide

1. **Clone the repository**

```bash
git clone <repository-url>
cd uhlakanipho-ai
```

2. **Install dependencies**

```bash
npm install
```

3. **Create the environment file**

Create a `.env` file in the root directory with the required API keys and configurations as shown above.

4. **Run the development server**

```bash
npm run dev
```

5. **Building for production**

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/             # shadcn UI components
│   ├── ChatInterface.tsx    # AI chat implementation
│   ├── Header.tsx           # App header
│   ├── Footer.tsx           # App footer
│   ├── ProjectGenerator.tsx # Project generation interface
│   ├── ApiKeyForm.tsx       # API key input form
│   └── ModelSelector.tsx    # AI model selector
├── pages/
│   ├── Index.tsx       # Main page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Components

### ChatInterface

The chat interface provides a conversational UI to interact with various AI models. It supports:
- Text messaging
- Image uploads (for models with image support)
- Model switching
- Message history

### ModelSelector

Allows users to select from various AI models with different capabilities, displaying relevant information about each model.

### ProjectGenerator

Enables users to generate project ideas and code based on their requirements.

## Dependencies

This project uses the following key dependencies:

- React & React DOM
- React Router DOM
- shadcn/ui (built on Radix UI primitives)
- Tailwind CSS & related plugins
- Lucide React (for icons)
- React Hook Form
- Zod (for validation)
- Tanstack React Query
- Recharts (for charts)

## Logo and Branding

The logo is sourced from: https://i.postimg.cc/3NrMbdj9/Spha-Apps-Logo.png

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed as a demonstration of integrating multiple AI models through a unified interface.
