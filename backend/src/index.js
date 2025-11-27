// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');
const app = express();

// first: standard cors (convenience)
app.use(cors());

// explicit header middleware to make absolutely sure preflight and requests get the headers
app.use((req, res, next) => {
  // allow your local dev origin and Railway + any frontend you will deploy
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://fullstack-track3-production.up.railway.app',
    // add your frontend deploy URL(s) here if any (Vercel/Netlify)
    // 'https://your-frontend.vercel.app'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // fallback to allow all (safe for this demo). Change to origin if you prefer restricted.
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
