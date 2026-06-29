const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Rota inicial do servidor
app.get('/', (req, res) => {
  res.send('Servidor de Inventário CVPDCE 3D Print - Ativo 🚀');
});

// Rota para listar todas as impressoras registradas no Supabase
app.get('/api/impressoras', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('impressoras')
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar o catálogo de consumíveis e o stock atual
app.get('/api/consumiveis', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consumiveis')
      .select('*')
      .order('nome', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`\n==================================================`);
  console.log(`💻 Servidor de Inventário em: http://localhost:${port}`);
  console.log(`==================================================\n`);
});
