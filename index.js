const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

var requestCounts = 0;

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  if (index < 0) {
    return res.status(400).json({ error: 'Project does not exists' });
  } 

  req.projectId = index;

  return next();
}

server.use( (req, res, next) => {
  console.log(`Requests: ${++requestCounts}`);

  return next();
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });

  return res.json( projects );
});

server.get('/projects', (req, res) => {
  return res.json( projects );
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const newProjectName = req.body.title;
  
  const index = req.projectId;

  projects[index].title = newProjectName;

  return res.json( projects );
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  
  const index = req.projectId;

  projects.splice(index, 1);

  return res.json( projects );
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const taskName = req.body.title;

  const index = req.projectId;

  projects[index].tasks.push(taskName);

  return res.json( projects );
});

server.listen(3000);