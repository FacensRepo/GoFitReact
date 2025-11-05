# Sistema de Autenticação para Páginas de Jogos

## O que foi implementado

Foi criado um sistema completo de autenticação modal que exibe um formulário de login/cadastro sobreposto às páginas de jogos quando o usuário não está autenticado.

### Componentes criados:

1. **AuthModal** (`src/components/AuthModal/index.tsx`)
   - Modal com formulário de login e cadastro
   - Totalmente estilizado com Tailwind CSS
   - Animações suaves de entrada
   - Alterna entre modos login/cadastro
   - Validação de formulário

2. **ProtectedGamePage** (`src/components/ProtectedGamePage/index.tsx`)
   - Wrapper para páginas que contêm jogos
   - Verifica se usuário está autenticado
   - Exibe AuthModal quando não autenticado
   - Desfoca o conteúdo da página quando modal está aberto

3. **Página de Login** (`src/pages/LogIn/index.tsx`)
   - Página dedicada de login/cadastro
   - Design moderno com Tailwind CSS
   - Redirecionamento após sucesso

4. **Página de Jogos** (`src/pages/Games/index.tsx`)
   - Exemplo de implementação
   - Grid com 6 cards de jogos
   - Protegida com ProtectedGamePage

## Como usar

### Para proteger uma página com jogos:

```tsx
import { ProtectedGamePage } from "../../components/ProtectedGamePage";

export function MinhaPageDeJogos() {
  return (
    <ProtectedGamePage>
      {/* Seu conteúdo aqui */}
      <div>
        <h1>Meus Jogos</h1>
        {/* Jogos, cards, etc */}
      </div>
    </ProtectedGamePage>
  );
}
```

### Acessar a página de exemplo:

Navegue para `/games` para ver o sistema funcionando.

## Integração com API

Atualmente, o sistema está configurado para fazer requisições para:
- `POST /api/login` - Para autenticação
- `POST /api/register` - Para cadastro

**Você precisa implementar esses endpoints no backend ou ajustar as URLs no código:**

### Locais para ajustar:

1. **AuthModal** (`src/components/AuthModal/index.tsx:24-27`)
2. **LogIn** (`src/pages/LogIn/index.tsx:20-23`)

Exemplo de ajuste:

```tsx
// Trocar:
const endpoint = isLogin ? "/api/login" : "/api/register";

// Por (exemplo com GraphQL):
const mutation = isLogin ? LOGIN_MUTATION : REGISTER_MUTATION;
```

## Fluxo de funcionamento

1. Usuário acessa página protegida (ex: `/games`)
2. Sistema verifica se há token no localStorage
3. Se **não autenticado**:
   - Conteúdo da página fica desfocado
   - Modal de autenticação aparece sobreposto
   - Usuário não pode interagir com a página
4. Após login/cadastro bem-sucedido:
   - Token é salvo no localStorage
   - Modal desaparece
   - Conteúdo da página fica acessível

## Rotas disponíveis

- `/login` - Página dedicada de login
- `/games` - Exemplo de página protegida com jogos
- `/nutrition` - Página de nutrição protegida com modal
- `/checkin` - Página de check-in protegida com modal

## Como funciona o ProtectedGamePage

O componente **ProtectedGamePage** mantém o usuário na página atual e exibe um modal de autenticação sobreposto ao conteúdo (que fica desfocado). Após o login, o modal desaparece e o usuário pode interagir normalmente com a página.

## Estilização

Todo o sistema foi estilizado com **Tailwind CSS**, incluindo:
- Animações de fade-in e slide-in
- Efeito de blur no conteúdo
- Design responsivo
- Estados de hover e focus
- Feedback visual de erros

## Próximos passos

1. Integrar com sua API de autenticação real
2. Adicionar mais jogos à página `/games`
3. Implementar sistema de pontuação/ranking
4. Adicionar validações adicionais (email, senha forte, etc)
5. Implementar recuperação de senha
6. Adicionar logout
