# FoodList 🍽️

Aplicativo mobile de gerenciamento de receitas culinárias, desenvolvido em **React Native**. Permite cadastrar, visualizar, editar e excluir receitas, com suporte a temas claro/escuro e persistência local de dados.

[![Licença MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

---

## Integrantes
|  Nome | Responsável por... |
| --- | --- |
|[Heitor Oliveira Terto](https://github.com/Its8or) | ConfigScreen: Tela Principal, trocar email, trocar senha e Editar Perfil; e criação de todos os arquivos auxiliares. |
|[João Claudio Bezerra](https://github.com/joaoclaudiotech) | AuthScreen: Login e Registro; e criação de todos os arquivos auxiliares. |
|[Jorge Luiz da Silva Magalhães](https://github.com/JoojS2) | Feed; e criação de todos os arquivos auxiliares. |
|[Lucas Roberto Oliveira](https://github.com/lucasx86) | Receitas; e criação de todos os arquivos auxiliares. |

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React Native (Expo) | Framework principal |
| React Navigation (Stack) | Navegação entre telas |
| AsyncStorage | Persistência local de dados |
| Context API | Gerenciamento de estado global |
| Expo Image Picker | Seleção de foto de perfil |

---
 
## Funcionalidades
 
- **Autenticação** — cadastro e login de usuários com sessão persistida
- **Feed de Receitas** — listagem com busca por nome, descrição e tags
- **Gerenciamento de Receitas** — criar, visualizar e editar receitas com ingredientes, modo de preparo e tags
- **Perfil de Usuário** — edição de nome, e-mail, senha e foto de perfil
- **Tema Claro / Escuro** — alternância com preferência salva localmente
- **Persistência Local** — todos os dados armazenados via `AsyncStorage`, sem necessidade de backend

---
## Estrutura do Projeto

```
├── services/
│   ├── authContext.jsx        # Contexto de autenticação (login, cadastro, logout)
│   ├── userContext.jsx        # Contexto de perfil do usuário
│   ├── recipesContext.jsx     # Contexto de receitas (CRUD)
│   ├── profile.js             # Utilitário: geração de iniciais do nome
│   ├── storage/
│   │   └── users.js           # Armazenamento de usuários
│   └── validators/
│       ├── loginValidator.js  # Validações do formulário de login
│       └── registerValidator.js # Validações do formulário de cadastro
│
└── views/
    ├── AuthScreen/
    │   ├── TelaLogin.js        # Tela de login
    │   └── TelaCadastro.js     # Tela de cadastro
    ├── feedScreen/
    │   └── feedScreen.jsx      # Feed principal com lista e busca
    ├── recipeScreen/
    │   ├── createRecipeScreen.jsx # Criação de nova receita
    │   ├── editRecipeScreen.jsx   # Edição de receita existente
    │   └── recipeScreen.jsx       # Visualização de receita
    ├── configScreen/
    │   ├── configScreen.jsx       # Tela de configurações
    │   ├── editarPerfilScreen.jsx # Edição de perfil
    │   ├── changeEmailScreen.jsx  # Alteração de e-mail
    │   └── changePasswordScreen.jsx # Alteração de senha
    └── styles/
        └── themeContext.jsx    # Contexto de tema (claro/escuro)
```
---

## Fluxo de Navegação

```
App
├── AuthNavigator       (exibido enquanto não autenticado)
│   ├── TelaLogin
│   └── TelaCadastro
└── AppNavigator        (exibido após login)
    ├── Feed
    ├── Recipe
    ├── EditRecipe
    ├── AddRecipe
    ├── Settings
    ├── EditProfile
    ├── ChangePassword
    └── ChangeEmail
```

A troca entre os navegadores é automática: quando `isAuthenticated` muda no `AuthContext`, o `RootNavigator` renderiza o stack correto sem nenhuma navegação manual.

---
## Contextos (Estado Global)
 
### `AuthContext`
Gerencia autenticação com persistência de sessão via `AsyncStorage`.
 
| Valor / Função | Descrição |
|---|---|
| `currentUser` | Objeto do usuário logado |
| `isAuthenticated` | Booleano de estado de autenticação |
| `loading` | Aguarda carregamento inicial do AsyncStorage |
| `register({ nome, email, senha })` | Cadastra novo usuário; retorna `false` se nome duplicado |
| `login(nome, senha)` | Autentica o usuário; retorna `false` se inválido |
| `logout()` | Encerra a sessão |
| `nomeUnico(nome)` | Verifica se um nome de usuário está disponível |
 
### `RecipesContext`
CRUD completo de receitas com persistência local.
 
| Valor / Função | Descrição |
|---|---|
| `recipes` | Array de todas as receitas |
| `addRecipe(recipe)` | Adiciona nova receita com `id` e `createdAt` gerados automaticamente |
| `deleteRecipe(id)` | Remove receita pelo ID |
| `updateRecipe(id, data)` | Atualiza campos de uma receita existente |
 
### `UserContext`
Gerencia o perfil do usuário logado.
 
| Valor / Função | Descrição |
|---|---|
| `perfil` | Objeto com `nome`, `username`, `email` e `foto` |
| `atualizarPerfil(novoPerfil)` | Persiste e atualiza o perfil no estado e no AsyncStorage |
 
### `ThemeContext`
Controla o tema visual com persistência da preferência.
 
| Valor / Função | Descrição |
|---|---|
| `theme` | Objeto com todas as variáveis de cor do tema ativo |
| `isDark` | Booleano indicando tema escuro |
| `toggleTheme()` | Alterna entre claro e escuro e persiste a preferência |
 
---
## Validações
 
### Cadastro (`registerValidator.js`)
- Todos os campos obrigatórios (nome, e-mail, senha, confirmação)
- E-mail deve ser `@gmail.com` ou `@hotmail.com`
- Senha com no mínimo 6 caracteres
- Confirmação de senha deve coincidir
- Nome de usuário único
### Login (`loginValidator.js`)
- Nome e senha não podem ser vazios
- Credenciais verificadas contra a lista de usuários
---
 
## Campos de uma Receita
 
| Campo | Obrigatório | Descrição |
|---|---|---|
| `nome` | ✅ | Nome da receita |
| `descricao` | ❌ | Breve descrição |
| `ingredientes` | ✅ | Lista de ingredientes |
| `modoPreparo` | ✅ | Passo a passo do preparo |
| `tags` | ❌ | Tags separadas por vírgula (ex: `sobremesa, fácil`) |
 
---

## Telas

### 🔑 Login (`TelaLogin`)
Primeira tela exibida ao abrir o app (quando não autenticado).
- Campos de nome e senha com toggle de visibilidade
- Validação de campos vazios e credenciais inválidas
- Link para a tela de cadastro

### 👤 Cadastro (`TelaCadastro`)
- Campos: nome de usuário, e-mail, senha e confirmação de senha
- Validações: e-mail `@gmail.com` ou `@hotmail.com`, senha mínima de 6 caracteres, nome único
- Após cadastro redireciona para o Login

### 🏠 Feed (`FeedScreen`)
Tela inicial do app após o login.
- Barra de busca filtrando por nome, descrição e tags em tempo real
- `FlatList` de cards de receitas com nome, descrição resumida e tags
- Estado vazio com mensagem orientativa
- Botão `+` para adicionar nova receita

### 📄 Receita (`RecipeScreen`)
Exibe todas as informações de uma receita selecionada.
- Nome, Tags, Descrição, Ingredientes e Modo de Preparo em seções visuais
- Botão ✏️ no header para navegar até a edição
- Botão **Apagar Receita** com confirmação — remove do contexto e volta ao Feed

### ✏️ Editar Receita (`EditRecipeScreen`)
- Formulário pré-populado com os dados da receita selecionada
- Botão "Salvar Alterações" habilitado apenas quando há modificações e campos obrigatórios preenchidos
- Após salvar navega de volta ao Feed

### ➕ Adicionar Receita (`CreateRecipeScreen`)
- Campos: Nome *(obrigatório)*, Descrição, Ingredientes *(obrigatório)*, Modo de Preparo *(obrigatório)* e Tags
- Botão de envio desabilitado enquanto campos obrigatórios estiverem vazios
- Receita persistida via `RecipesContext` + `AsyncStorage`

### ⚙️ Configurações (`SettingsScreen`)
- Acesso a Editar Perfil, Alterar Senha e Alterar Email
- Toggle de Dark Mode com persistência
- Logout e Excluir Conta com confirmação via `Alert` — troca para `AuthNavigator` automaticamente

### 👤 Editar Perfil (`EditProfileScreen`)
- Edição de nome, username e foto de perfil (galeria)
- Botão "Save" habilitado apenas quando há alterações pendentes

### 🔒 Alterar Senha (`ChangePasswordScreen`)
- Indicador visual de força da senha (Fraca → Forte)
- Checklist de requisitos em tempo real
- Campos de senha com toggle de visibilidade

### 📧 Alterar Email (`ChangeEmailScreen`)
- Fluxo em 2 etapas com indicador de progresso
- Etapa 1: novo e-mail + confirmação + senha atual
- Etapa 2: código de verificação de 6 dígitos

---

## Padrão de UI

Todas as telas seguem o mesmo design system:

- **Tipografia de título**: Georgia (iOS) / serif (Android), `fontSize: 28`, `fontWeight: 700`
- **Layout**: `SafeAreaView` → `KeyboardAvoidingView` → `ScrollView` + footer fixo
- **Espaçador superior**: `header` com `paddingTop: 35`, `paddingBottom: 16`
- **Cards**: `borderRadius: 20`, cor `t.CARD`
- **Inputs de linha**: `borderRadius: 50`, altura 52, borda `t.TEAL` no foco
- **Inputs de área**: `borderRadius: 16`, altura 130
- **Botão primário**: `borderRadius: 50`, altura 54, cor `t.SAVE_BTN`
- **Botão voltar / ícone**: círculo 36×36, cor `t.BACK_BTN`
- **Cor de destaque**: `#1BB585` (verde-esmeralda) — `t.TEAL`
- **Cor de perigo**: `#D85A30` — `t.DANGER`
- **Tema**: claro e escuro via `ThemeContext`, persistido com `AsyncStorage`

---

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

## Dependências

```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install expo-image-picker
```
## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.