import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { GoogleGenAI } from '@google/genai';

// AI setup (safe + env-based)
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Optional test call (won’t crash app if it fails)
async function main() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Explain how AI works in a few words',
    });

    console.log('AI Test Response:', response.text);
  } catch (error) {
    console.warn('AI test skipped or failed:', error);
  }
}

main().catch(console.error);

// React render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);