import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import componentRoutes from './routes/component.routes.js';
import templateRoutes from './routes/template.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/templates', templateRoutes);

export default app;

