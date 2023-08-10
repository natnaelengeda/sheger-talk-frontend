import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const Bot = require('./controllers/Bot');
const Index = require('./routes/Index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Index);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});