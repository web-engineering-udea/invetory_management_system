import prisma from '@/service/prisma';
import { checkProtectedApi } from '@/utils/checkServerSession';
import { Material } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  material?: Material;
  message?: string;
}

const materialApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await checkProtectedApi(req, res, 'ADMIN');

  if (req.method === 'PUT') {
    const materialId = req.query.id as string;

    const updatedMaterial = await prisma.material.update({
      where: {
        id: materialId,
      },
      data: {
        name: req.body.name,
        quantity: req.body.quantity,
      },
    });

    return res.status(200).json({ material: updatedMaterial });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default materialApi;
