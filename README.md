# FoodList 🍽️

App de receitas que conecta pessoas em grupos para compartilhar e descobrir receitas de seus interesses.

---

## Integrantes
|  Nome | Matricula |
| --- | --- |
|[Heitor Oliveira Terto](https://github.com/Its8or) | 01881047 |
|[João Claudio Bezerra](https://github.com/joaoclaudiotech) | 01864641 |
|[Jorge Luiz da Silva Magalhães](https://github.com/JoojS2) | 01816817 |
|[Lucas Roberto Oliveira](https://github.com/lucasx86) | 01854426 |

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

## Estrutura do Projeto

```
├── App.js
├── services/
│   ├── authContext.jsx        # Autenticação — login, cadastro, logout (persistido)
│   ├── userContext.jsx        # Perfil do usuário (persistido)
│   ├── recipesContext.jsx     # Receitas — CRUD + persistência
│   ├── userSession.js         # Singleton de sessão (legado)
│   └── validateData.js        # Strategy pattern para validações
└── views/
    ├── styles/
    │   └── themeContext.jsx   # Tema claro/escuro (persistido)
    ├── authScreen/
    │   ├── TelaLogin.jsx      # Login
    │   └── TelaCadastro.jsx   # Cadastro de conta
    ├── feedScreen/
    │   └── feedScreen.jsx     # Feed com busca e lista de receitas
    ├── recipeScreen/
    │   ├── recipeScreen.jsx   # Visualização detalhada + editar + apagar
    │   ├── createRecipeScreen.jsx
    │   └── editRecipeScreen.jsx
    └── configScreen/
        ├── configScreen.jsx
        ├── editarPerfilScreen.jsx
        ├── changePasswordScreen.jsx
        └── changeEmailScreen.jsx
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