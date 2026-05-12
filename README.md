# FoodList 🍽️

App de receitas que conecta pessoas em grupos para compartilhar e descobrir receitas de seus interesses.

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
│   ├── userContext.jsx        # Contexto de perfil do usuário (persistido)
│   ├── recipesContext.jsx     # Contexto de receitas — CRUD + persistência
│   ├── userSession.js         # Singleton de sessão de autenticação
│   └── validateData.js        # Strategy pattern para validações
└── views/
    ├── styles/
    │   └── themeContext.jsx   # Tema claro/escuro (persistido)
    ├── feedScreen/
    │   └── feedScreen.jsx     # Feed com busca e lista de receitas
    ├── recipeScreen/
    │   ├── recipeScreen.jsx   # Visualização detalhada da receita
    │   └── createRecipeScreen.jsx
    └── configScreen/
        ├── configScreen.jsx
        ├── editarPerfilScreen.jsx
        ├── changePasswordScreen.jsx
        └── changeEmailScreen.jsx
```

---

## Telas

### 🏠 Feed (`FeedScreen`)
Tela inicial do app após o login.
- Barra de busca filtrando por nome, descrição e tags em tempo real
- `FlatList` de cards de receitas com nome, descrição resumida e tags
- Estado vazio com mensagem orientativa
- Botão `+` para navegar até a tela de adicionar receita

### 📄 Receita (`RecipeScreen`)
Exibe todas as informações de uma receita selecionada.
- Nome, Tags, Descrição, Ingredientes e Modo de Preparo em seções visuais
- Data de criação no rodapé

### ➕ Adicionar Receita (`CreateRecipeScreen`)
- Campos: Nome *(obrigatório)*, Descrição, Ingredientes *(obrigatório)*, Modo de Preparo *(obrigatório)* e Tags
- Botão de envio desabilitado enquanto campos obrigatórios estiverem vazios
- Receita persistida via `RecipesContext` + `AsyncStorage`

### ⚙️ Configurações (`SettingsScreen`)
- Acesso a Editar Perfil, Alterar Senha e Alterar Email
- Toggle de Dark Mode com persistência
- Opções de Logout e Excluir Conta

### 👤 Editar Perfil (`EditProfileScreen`)
- Edição de nome, username e foto de perfil (galeria)
- Botão "Save" habilitado apenas quando há alterações pendentes

### 🔒 Alterar Senha (`ChangePasswordScreen`)
- Indicador visual de força da senha (Fraca → Forte)
- Checklist de requisitos em tempo real
- Campos de senha com toggle de visibilidade

### 📧 Alterar Email (`ChangeEmailScreen`)
- Fluxo em 2 etapas com indicador de progresso
- Etapa 1: novo email + confirmação + senha atual
- Etapa 2: código de verificação de 6 dígitos

---

## Padrão de UI

Todas as telas seguem o mesmo design system:

- **Tipografia de título**: Georgia (iOS) / serif (Android), `fontSize: 28`, `fontWeight: 700`
- **Cards**: `borderRadius: 20`, cor `t.CARD`
- **Inputs**: `borderRadius: 16` (campos de texto) ou `borderRadius: 50` (campos inline)
- **Botão primário**: `borderRadius: 50`, altura 54, cor `t.SAVE_BTN`
- **Botão voltar**: círculo 36×36, cor `t.BACK_BTN`
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

---

## Confira os rascunhos das telas

Para acessar os rascunhos [clique aqui](imgs/README.md).