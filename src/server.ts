import "dotenv/config"
import express from 'express'
import pkg from "pg";

console.log(process.env.LINK)


const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORTDATABASE),
});

const app = express()
app.use(express.json())

app.post("/webhook", async (req, res) => {

  if (req.body.isGroup === true) {
    return res.sendStatus(200);
  }

  const numero: string = String(req.body.phone);
  const mensagem: string = req.body.text?.message?.toLowerCase().trim() || "";

  console.log(`numero: ${numero}\nmensagem: ${mensagem}`);

  try {
    const response = await fetch(`https://api.z-api.io/instances/${process.env.SUA_INSTANCIA_CLIENT1}/token/${process.env.SEU_TOKEN_CLIENT1}/send-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": `${process.env.GERALTOKEN}`
      },
      body: JSON.stringify({
        phone: numero,
        message: 'teste'
      })
    });

    const data = await response.json();
    console.log("Resposta Z-API:", data);

  } catch (error) {
    console.error("Erro ao enviar:", error);
  }

  res.sendStatus(200);
});

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Banco conectado.");
  } catch (error) {
    console.error(error);
  }

  app.listen(process.env.PORTSERVER, () => {
    console.log(`Servidor rodando na porta ${process.env.PORTSERVER}`);
  });
};

startServer();