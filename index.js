const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.get('/', (req, res) => {
  return res.send('Hello World');
});

server.post('/projects', (req, res) => {
  const { id, project } = req.body;

  projects.push({ id: id, project: project, tasks: [] });

  return res.json( projects );
});

server.listen(3000);