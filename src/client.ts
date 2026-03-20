export class Client {
  nome: string;
  telefone: string;
  piscina: boolean;

  constructor(nome: string, telefone: string, piscina: boolean) {
    this.nome = nome;
    this.telefone = telefone;
    this.piscina = piscina;
  }

  toString(): string {
    return `Cliente: ${this.nome}, Telefone: ${this.telefone}, Piscina: ${this.piscina ? 'sim' : 'não'}`;
  }
}
