import prisma from '@/service/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  indicators?: unknown;
  message?: string;
}

const collectionsIndicatorsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {

  if (req.method === 'GET') {
    const indicators = await prisma.$queryRaw`
                SELECT DATE("createdAt") AS date, SUM(quantity)::int AS quantity
                FROM "InventoryMovement"
                WHERE "materialId" = ${req.query.id}
                GROUP BY date
                ORDER BY date;
        `;
    return res.status(200).json({ indicators });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default collectionsIndicatorsApi;