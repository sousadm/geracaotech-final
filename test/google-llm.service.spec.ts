import { GoogleLlmService } from './google-llm.service';

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockResolvedValue('Resposta simulada do modelo'),
        },
      }),
    }),
  })),
}));

describe('GoogleLlmService', () => {
  beforeAll(() => {
    process.env.GOOGLE_AI_API_KEY = 'teste-chave';
  });

  it('deve enviar prompt e retornar resposta do LLM', async () => {
    const service = new GoogleLlmService();
    const prompt = 'Escreva um poema curto';

    const result = await service.sendPrompt(prompt);

    expect(result).toEqual('Resposta simulada do modelo');
  });

  it('deve lançar erro quando GOOGLE_AI_API_KEY não estiver definido', () => {
    const oldKey = process.env.GOOGLE_AI_API_KEY;
    delete process.env.GOOGLE_AI_API_KEY;

    expect(() => new GoogleLlmService()).toThrow('GOOGLE_AI_API_KEY não está definida nas variáveis de ambiente');

    process.env.GOOGLE_AI_API_KEY = oldKey;
  });
});