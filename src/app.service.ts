import { Injectable } from '@nestjs/common';
import { Cliente } from './domain/cliente';
import { ClienteResponse } from './domain/cliente-resposta';
import { GoogleLlmService } from './google-llm.service';

@Injectable()
export class AppService {

  private readonly googleLlmService = new GoogleLlmService();

  getHello(): string {
    return 'Hello Francisco Sousa!';
  }


   async enviarClientePrompt(cliente: Cliente): Promise<ClienteResponse> {
    const prompt = `Cliente: ${cliente.nome}\nTelefone: ${cliente.telefone}\nPiscina: ${cliente.piscina ? 'tem piscina' : 'não tem piscina'}.`;

    try {
      const resposta = await this.googleLlmService.sendPrompt(prompt);
      return new ClienteResponse(cliente, resposta, 'success');
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : String(error);
      return new ClienteResponse(cliente, `Falha ao processar prompt: ${mensagemErro}`, 'error');
    }
  }


}
