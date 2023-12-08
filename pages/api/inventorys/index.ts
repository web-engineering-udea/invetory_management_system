// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { InventoryMovement } from '@prisma/client';
import prisma from '@/service/prisma';
import { checkPrivateApi, checkProtectedApi } from '@/utils/checkServerSession';

type Data = {
  inventoryMovements?: InventoryMovement[];
  message?: string;
  newInventoryMovement?: InventoryMovement;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        await checkPrivateApi(req, res);
        
        if (req.method === 'GET') {
            const inventoryMovements = await prisma.inventoryMovement.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return res.status(200).json({ inventoryMovements });
        }
        
        if (req.method === 'POST') {
            const { movementType, quantity, materialId, userId } = req.body;
            
            const newInventoryMovement = await prisma.inventoryMovement.create({
                data: {
                movementType,
                quantity,
                materialId,
                userId,
            },
        });

        return res.status(201).json({ newInventoryMovement });
        }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
