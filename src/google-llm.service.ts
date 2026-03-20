import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GoogleLlmService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Substitua pela sua chave de API do Google AI Studio
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY não está definida nas variáveis de ambiente');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async sendPrompt(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Erro ao enviar prompt para Google LLM: ${error.message}`);
    }
  }
}