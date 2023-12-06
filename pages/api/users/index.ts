// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import prisma from '@/service/prisma';
import { checkProtectedApi } from '@/utils/checkServerSession';

type Data = {
  users?: User[];
  message?: string;
  newUser?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await checkProtectedApi(req, res, 'ADMIN');

    if (req.method === 'GET') {
      const users = await prisma.user.findMany({
        orderBy: {
          email: 'asc',
        },
      });
      return res.status(200).json({ users });
    }

    // if (req.method === 'POST') {
    //   const { email, name, roleId } = req.body;

    //   const newUser = await prisma.user.create({
    //     data: {
    //       name,
    //       email,
    //       roleId,
    //     },
    //   });

    //   return res.status(201).json({ newUser });
    // }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
