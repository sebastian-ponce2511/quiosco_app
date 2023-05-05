// Acá, ne los archivos de la carpeta API también se pueden ejecutar el codigo de PRISMA y consultar la BASE DE DATOS
// Se pueden consultar los resultados en el navegador. Ej: localhost:3000/api/categorias

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });
  res.status(200).json(categorias);
}
