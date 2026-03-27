import express from 'express';
import path from 'path';

const app = express();
const port = 2091;

const widgetDistPath = path.resolve(__dirname, '../../dist');

app.use('/widget', express.static(widgetDistPath));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Widget static path: ${widgetDistPath}`);
});
