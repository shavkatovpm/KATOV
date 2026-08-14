import { NotFoundClient } from '@/components/not-found-client';

// Deliberately free of dynamic APIs. The root not-found boundary is part of
// every route's render tree, so a single `headers()` call in here marks the
// entire site as dynamic: no page gets prerendered and every response ships
// `Cache-Control: private, no-cache, no-store`, which stops the CDN from ever
// caching HTML. The 404's language is resolved on the client instead.
export default function NotFound() {
  return (
    <html lang="uz" style={{ backgroundColor: '#000000' }}>
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#000000',
        }}
      >
        <NotFoundClient />
      </body>
    </html>
  );
}
