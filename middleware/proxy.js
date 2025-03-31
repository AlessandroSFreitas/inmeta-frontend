import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {
  const proxy = createProxyMiddleware('/api', {
    target: 'https://backend-case-k15vpydzi-alessandrosfreitas-projects.vercel.app',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  });

  await new Promise((resolve, reject) => {
    proxy(event.node.req, event.node.res, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
});