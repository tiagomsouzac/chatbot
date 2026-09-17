# Chatbot

## Português

Aplicação de chat com Google Gemini.

### Requisitos

- Node.js 20 ou superior.
- Uma chave da API do Google GenAI.

### Baixar o projeto

```powershell
git clone <https://github.com/tiagomsouzac/chatbot> chatbot
cd chatbot
```

Também é possível baixar o projeto como ZIP.

### Instalar

```powershell
npm install
```

### Configurar

Crie o arquivo `.env` a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Edite `.env`:

```env
AGENT_API_KEY=sua-chave-da-api
AGENT_MODEL=gemini-flash-latest
```

Não publique o arquivo `.env`.

### Executar

```powershell
npm run dev
```

Abra <http://localhost:3000> no navegador.

### Produção

```powershell
npm run build
npm start
```

## English

Chat application using Google Gemini.

### Requirements

- Node.js 20 or newer.
- A Google GenAI API key.

### Download

```powershell
git clone <https://github.com/tiagomsouzac/chatbot> chatbot
cd chatbot
```

You can also download the project as a ZIP file.

### Install

```powershell
npm install
```

### Configure

Create `.env` from the example file:

```powershell
Copy-Item .env.example .env
```

Edit `.env`:

```env
AGENT_API_KEY=your-api-key
AGENT_MODEL=gemini-flash-latest
```

Do not publish `.env`.

### Run

```powershell
npm run dev
```

Open <http://localhost:3000> in your browser.

### Production

```powershell
npm run build
npm start
```
