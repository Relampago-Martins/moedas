# Pharus-Front

Projeto para controlar rendas, despesas, dividas, etc

## Framer Motion

Este projeto utiliza a biblioteca [Framer Motion](https://www.framer.com/motion/) para animações.
Caso queira otimizar, você pode [checar a doc para reduzir o tamanho do bundle](https://www.framer.com/motion/guide-reduce-bundle-size/).

## Estrutura

### Entendendo o que são Steps

Neste projeto criei um componente chamado `Stepper` que é utilizado para criar fluxos de múltiplas etapas (steps).
Ele é usado principalmente dentro de modais, com diversas telas divididas em etapas.

Um exemplo prático seria usar o `Stepper` para criar um crud de contas bancárias, onde o usuário pode:

- Ver a lista de contas bancárias
- Clicar em uma conta para ver detalhes
- Editar ou excluir a conta
- Adicionar uma nova conta

Cada uma dessas ações seria uma tela dedicada e portanto seriam representada como um "step" dentro do `Stepper`,
permitindo uma navegação fluida entre as etapas.

#### Melhoria

- Enviar dados diretamente ao navegar entre steps
- Não precisar informar o nível (level) do step ao navegar

O código atual para navegar entre steps é assim:

```tsx
goToStep({
    name: 'detalhe-conta-bancaria',
    level: 1,
});
events.submit('onSelectContaBancaria', conta);
```

O correto seria fazer algo assim:

```tsx
goToStep({
    name: 'detalhe-conta-bancaria',
    data: conta,
});
```

Outro problema está na hora de capturar o evento, pois:

- O tipo do dado está fixado para o nome do evento
- não é genérico para qualquer tipo de dado

Atualmente está assim:

```tsx
events.subscribe('onSelectContaBancaria', (conta) => {
    form.setValue('contaBancaria', conta);
});
```

O correto seria algo com tipagem dinâmica, como:

```tsx
subscribe<ContaBancaria>('onSelectContaBancaria', (conta) => {
    form.setValue('contaBancaria', conta);
});
```
