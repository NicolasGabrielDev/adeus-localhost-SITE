import { categoriasTable } from "./db/schema";
import { db } from "./db/db";
import type { BunRequest } from "bun";
import { eq } from "drizzle-orm";

export const categoriaRoutes = {
  "/categorias": {
    GET: async () => Response.json(await db.select().from(categoriasTable)),

    POST: async (request: Request) => {
      const dados = await request.json();

      if (typeof dados.nome !== "string" || !dados.nome.trim()) {
        return Response.json(
          { message: "Nome é obrigatório!" },
          { status: 422 },
        );
      }

      if (dados.nome.trim().length > 100) {
        return Response.json(
          { message: "O nome deve ter no máximo 100 caracteres!" },
          { status: 422 },
        );
      }

      if (typeof dados.cor !== "string" || !/^#[0-9a-fA-F]{6}$/.test(dados.cor)) {
        return Response.json(
          { message: "Informe uma cor no formato #RRGGBB!" },
          { status: 422 },
        );
      }

      const [categoria] = await db
        .insert(categoriasTable)
        .values({
          nome: dados.nome.trim(),
          cor: dados.cor,
        })
        .returning();

      return Response.json(categoria, { status: 201 });
    },
  },

  "/categorias/:id": {
    PUT: async (request: BunRequest<"/categorias/:id">) => {
      const idValido = Number(request.params.id);

      if (!Number.isInteger(idValido) || idValido <= 0) {
        return Response.json(
          { message: "Você mandou um ID inválido!" },
          { status: 400 },
        );
      }

      const dados = await request.json();

      if (typeof dados.nome !== "string" || !dados.nome.trim()) {
        return Response.json(
          { message: "Nome é obrigatório!" },
          { status: 422 },
        );
      }

      if (dados.nome.trim().length > 100) {
        return Response.json(
          { message: "O nome deve ter no máximo 100 caracteres!" },
          { status: 422 },
        );
      }

      if (typeof dados.cor !== "string" || !/^#[0-9a-fA-F]{6}$/.test(dados.cor)) {
        return Response.json(
          { message: "Informe uma cor no formato #RRGGBB!" },
          { status: 422 },
        );
      }

      const [categoria] = await db
        .update(categoriasTable)
        .set({
          nome: dados.nome.trim(),
          cor: dados.cor,
        })
        .where(eq(categoriasTable.id, idValido))
        .returning();

      if (!categoria) {
        return Response.json(
          { message: "Não achei sua categoria!" },
          { status: 404 },
        );
      }

      return Response.json(
        { message: "Sua categoria foi atualizada!" },
        { status: 200 },
      );
    },

    DELETE: async (request: BunRequest<"/categorias/:id">) => {
      const idValido = Number(request.params.id);

      if (!Number.isInteger(idValido) || idValido <= 0) {
        return Response.json(
          { message: "Você mandou um ID inválido!" },
          { status: 400 },
        );
      }

      try {
        const [categoria] = await db
          .delete(categoriasTable)
          .where(eq(categoriasTable.id, idValido))
          .returning();

        if (!categoria) {
          return Response.json(
            { message: "Esse ID que você me mandou não existe!" },
            { status: 404 },
          );
        }

        return Response.json(
          { message: "Deu certo excluir!" },
          { status: 200 },
        );
      } catch (error) {
        const databaseError = error as {
          code?: string;
          cause?: { code?: string };
        };

        if (
          databaseError.code === "23503" ||
          databaseError.cause?.code === "23503"
        ) {
          return Response.json(
            { message: "Essa categoria possui registros vinculados!" },
            { status: 409 },
          );
        }

        throw error;
      }
    },
  },
};
