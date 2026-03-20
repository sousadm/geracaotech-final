import { GoogleLlmService } from './google-llm.service';
import { Cliente } from './domain/cliente';
import { ClienteResponse } from './domain/cliente-resposta';

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

  it('deve enviar prompt de cliente e retornar ClienteResponse com status success', async () => {
    const service = new GoogleLlmService();
    const cliente = new Cliente('Maria', '+5511999999999', true);

    const result = await service.enviarClientePrompt(cliente);

    expect(result).toBeInstanceOf(ClienteResponse);
    expect(result.cliente).toEqual(cliente);
    expect(result.resposta).toEqual('Resposta simulada do modelo');
    expect(result.status).toBe('success');
  });

  it('deve lançar erro quando GOOGLE_AI_API_KEY não estiver definido', () => {
    const oldKey = process.env.GOOGLE_AI_API_KEY;
    delete process.env.GOOGLE_AI_API_KEY;

    expect(() => new GoogleLlmService()).toThrow('GOOGLE_AI_API_KEY não está definida nas variáveis de ambiente');

    process.env.GOOGLE_AI_API_KEY = oldKey;
  });
});