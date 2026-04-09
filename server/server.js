const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Import routes
const progressRoutes = require('./routes/progress');
const plannerRoutes = require('./routes/planner');
const chatRoutes = require('./routes/chat');
const categoriesRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

app.use('/api/progress', progressRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('PrepBot API is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Keep-alive to prevent premature exit
setInterval(() => {}, 1000 * 60 * 60);
