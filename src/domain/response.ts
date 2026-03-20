import { Cliente } from "./cliente";

export class response {
  cliente: Cliente;
  resposta: string;
  status: string;

  constructor(cliente: Cliente, conteudo: string, status: string) {
    this.cliente = cliente;
    this.resposta = conteudo;
    this.status = status;
  }

}
