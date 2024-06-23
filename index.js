const express = require('express');

const app = express();

app.listen(3000, () => console.log('Servidor Online'));

app.get('/atendimentos', (req, res) => res.send('Oi'));