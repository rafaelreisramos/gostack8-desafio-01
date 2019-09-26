const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });

  return res.json( projects );
});

server.get('/projects', (req, res) => {
  return res.json( projects );
})

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const newProjectName = req.body.title;
  
  const index = projects.findIndex(item => item.id === id);

  projects[index].title = newProjectName;

  return res.json( projects );
})

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  
  const index = projects.findIndex(item => item.id === id);

  projects.splice(index, 1);

  return res.json( projects );
})

server.listen(3000);