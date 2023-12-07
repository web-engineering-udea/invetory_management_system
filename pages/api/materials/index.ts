// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Material } from '@prisma/client';
import prisma from '@/service/prisma';
import { checkPrivateApi, checkProtectedApi } from '@/utils/checkServerSession';

type Data = {
  materials?: Material[];
  message?: string;
  newMaterial?: Material;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        
        if (req.method === 'GET') {
            await checkPrivateApi(req, res);
            const materials = await prisma.material.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return res.status(200).json({ materials });
        }
        
        if (req.method === 'POST') {
            await checkProtectedApi(req, res, 'ADMIN');
            const { name, quantity, userId } = req.body;
            
            const newMaterial = await prisma.material.create({
              data: {
                name,
                quantity,
                userId,
        },
      });

      return res.status(201).json({ newMaterial });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
