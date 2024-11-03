const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());
let alunos = [];

// Endpoint de Raiz para Teste
app.get('/', (req, res) => {
    res.send('API de Alunos está rodando!');
});

// CREATE
app.post('/alunos', (req, res) => {
    const { nome, email, nome_curso } = req.body;
    const novoAluno = { id: uuidv4(), nome, email, nome_curso };
    alunos.push(novoAluno);
    console.log(`Aluno criado com sucesso: ${JSON.stringify(novoAluno)}`);
    res.status(201).json(novoAluno);
});

// READ
app.get('/alunos', (req, res) => {
    console.log('Listando todos os alunos');
    res.json(alunos);
});

app.get('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        console.log(`Aluno encontrado: ${JSON.stringify(aluno)}`);
        res.json(aluno);
    } else {
        console.log(`Aluno com id ${id} não encontrado`);
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// UPDATE
app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, nome_curso } = req.body;
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        aluno.nome = nome || aluno.nome;
        aluno.email = email || aluno.email;
        aluno.nome_curso = nome_curso || aluno.nome_curso;
        console.log(`Aluno atualizado com sucesso: ${JSON.stringify(aluno)}`);
        res.json(aluno);
    } else {
        console.log(`Aluno com id ${id} não encontrado para atualização`);
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// DELETE
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const index = alunos.findIndex(a => a.id === id);
    if (index !== -1) {
        alunos.splice(index, 1);
        console.log(`Aluno com id ${id} excluído com sucesso`);
        res.status(204).end();
    } else {
        console.log(`Aluno com id ${id} não encontrado para exclusão`);
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
