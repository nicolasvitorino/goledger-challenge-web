# Arquitetura do Projeto

## Estrutura Clean Architecture

```
src/
├── domain/          # Regras de negócio (Entities, Interfaces)
├── application/     # Casos de uso (Use Cases, Services)
├── interface/       # Adapters (Controllers, Presenters)
├── infrastructure/  # Implementações (HTTP Client, Config)
├── app/            # Next.js App Router
└── styles/         # Estilos CSS
```

## Por que Clean Architecture?

1. **Separação de Responsabilidades**: Cada camada tem uma responsabilidade clara
2. **Testabilidade**: Código desacoplado é mais fácil de testar
3. **Manutenibilidade**: Mudanças em uma camada não afetam as outras
4. **Escalabilidade**: Fácil adicionar novas features sem quebrar código existente

## Camadas

### Domain (Núcleo)

- **Entities**: Objetos que representam conceitos de negócio (TVShow, Season, Episode)
- **Interfaces**: Contratos que as outras camadas devem seguir
- **Sem dependências externas**: Não usa Next.js, axios, etc

### Application

- **Use Cases**: Orquestram a lógica de negócio (CreateTVShow, UpdateEpisode)
- **Services**: Implementações de negócio que não são tão específicas quanto Use Cases
- **Depende apenas de Domain**

### Interface

- **Adapters**: Convertem requisições externas em formato que a Application entende
- **Controllers**: Lidam com requisições HTTP
- **Presenters**: Formatam dados para a view

### Infrastructure

- **HTTP Client**: Requisições para a API do GoLedger
- **Implementações concretas**: Banco de dados, APIs externas, etc

## Commands CRUD na API GoLedger

- **CreateAsset**: Criar novo ativo (TVShow, Season, Episode)
- **UpdateAsset**: Atualizar ativo existente
- **DeleteAsset**: Deletar ativo
- **Search**: Buscar ativos por critérios
- **ReadAsset**: Ler um ativo específico

O projeto implementará esses comandos através do `AssetRepository` que será criado na camada de Infrastructure.
