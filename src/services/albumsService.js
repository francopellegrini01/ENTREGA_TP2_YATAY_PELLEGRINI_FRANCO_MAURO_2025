import { promises as fs } from 'fs';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'src', 'database', 'albums_15.csv');
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';

export const AlbumsService = {
  generarCSV: async () => {
    const resp = await fetch(ALBUMS_URL);

    if (!resp.ok) {
      throw new Error('No se pudo obtener la lista de albums');
    }

    const data = await resp.json();

    const first15 = data.slice(0, 15);

    const header = 'userId,id,title\n';
    const rows = first15
      .map((a) => {
        const safeTitle = String(a.title).replace(/"/g, '""');
        return `${a.userId},${a.id},"${safeTitle}"`;
      })
      .join('\n');

    const csv = header + rows;

    const dir = path.dirname(CSV_PATH);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(CSV_PATH, csv, 'utf-8');

    return csv;
  },
};
