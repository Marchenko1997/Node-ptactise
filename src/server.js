// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import dotenv from 'dotenv';

import { getAllStudents, getStudentById } from './db/services/students.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json({ data: students });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  });

  app.get('/students/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await getStudentById(studentId);
      res.status(200).json({ data: student });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};