const express = require('express');
const { PrismaClient } = require('@prisma/client');

const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();
const app = express();

// json
app.use(express.json());

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// test endpoint
app.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'Hello World!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// http get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 14:00 minuto

// start app
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
