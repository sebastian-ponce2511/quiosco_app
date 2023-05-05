import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const productos = await prisma.producto.findMany({
    // Trae todos los productos de la categoria 1
    where: {
      categoriaId: 1,
    },
  });
  res.status(200).json(productos);
}
