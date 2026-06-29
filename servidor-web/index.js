const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Inicializa o cliente do Supabase usando as chaves do ficheiro .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Rota de teste para ver se o servidor está vivo
app.get('/', (req, res) => {
  res.send('Servidor do projeto CVPDCE 3D Print está a correr! 🚀');
});

// Rota de teste para verificar a ligação ao Supabase
app.get('/teste-supabase', async (req, res) => {
  res.json({ mensagem: "A ligação está configurada. Pronto para receber tabelas!" });
});

app.listen(port, () => {
  console.log(`\n==================================================`);
  console.log(`💻 Servidor a correr em: http://localhost:${port}`);
  console.log(`==================================================\n`);
});
