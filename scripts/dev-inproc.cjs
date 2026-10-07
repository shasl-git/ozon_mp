/* eslint-disable */
// Однопроцессный запуск Next.js dev-сервера.
// Обход ограничения песочницы DSH: node-процессы здесь не могут порождать
// дочерние процессы, а CLI `next dev` стартует сервер через child_process.fork.
// В обычной (вне песочницы) среде используйте `npm run dev`.
const http = require('http');
const next = require('next');

const dev = true;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, dir: process.cwd(), hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, hostname, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
