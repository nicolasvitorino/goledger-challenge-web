/**
 * Interface base para todos os Use Cases
 * Define o contrato que qualquer Use Case deve implementar
 */
export interface IUseCase<TRequest, TResponse> {
  /**
   * Executa o use case
   */
  execute(request: TRequest): Promise<TResponse>;
}
