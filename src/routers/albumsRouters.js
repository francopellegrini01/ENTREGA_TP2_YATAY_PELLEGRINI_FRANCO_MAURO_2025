import { Router } from 'express';
import { AlbumsService } from '../services/albumsService.js';

const router = Router();

// GET /api/v1/albums/csv
router.get('/api/v1/albums/csv', async (req, res) => {
  try {
    const csv = await AlbumsService.generarCSV();

    res.setHeader('Content-Type', 'text/csv');

    return res.status(200).send(csv);
  } catch (error) {
    console.error('Error al generar CSV de albums:', error);

    return res.status(500).json({
      statusCode: 500,
      error: 'Error al generar el CSV de albums',
    });
  }
});

export default router;
