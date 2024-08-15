import fs from 'fs';
import path from 'path';

export default function cssReloadPlugin() {
  return {
    name: 'css-reload',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.css')) {
        server.ws.send({ type: 'full-reload' });
      }
    }
  };
}
