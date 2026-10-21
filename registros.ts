import { registrosTable } from "./db/schema";
import { db } from "./index";
import type { BunRequest } from "bun";
import { eq } from "drizzle-orm";

export const registroRoutes = {
  "/registros": {
    GET: async () => Response.json(await db.select().from(registrosTable)),

    POST: async (request: Request) => {
      const dados = await request.json();

      if (!dados.nome || !dados.descricao) {
        return Response.json(
          { message: "Nome e Descrição são dados obrigatórios!" },
          { status: 422 },
        );
      }

      if (String(dados.nome).length > 150) {
        return Response.json(
          { message: "O número máximo de caracteres é 150!" },
          { status: 422 },
        );
      }

      const [registro] = await db
        .insert(registrosTable)
        .values({
          nome: dados.nome,
          descricao: dados.descricao,
          ativo: true,
          registroId: dados.registroId,
        })
        .returning();

      return Response.json(registro, { status: 201 });
    },
  },

  "/registros/:id": {
    PUT: async (request: BunRequest<"/registros/:id">) => {
      const idValido = Number(request.params.id);

      if (!Number.isInteger(idValido) || idValido <= 0) {
        return Response.json(
          { message: "Você mandou um ID inválido!" },
          { status: 400 },
        );
      }

      const dados = await request.json();

      if (!dados.nome || !dados.descricao) {
        return Response.json(
          { message: "Nome e Descrição são dados obrigatórios!" },
          { status: 422 },
        );
      }

      if (String(dados.nome).length > 150) {
        return Response.json(
          { message: "O número máximo de caracteres é 150!" },
          { status: 422 },
        );
      }

      const [registro] = await db
        .update(registrosTable)
        .set({
          nome: dados.nome,
          descricao: dados.descricao,
          ativo: true,
          registroId: dados.registroId,
        })
        .where(eq(registrosTable.id, idValido))
        .returning();

      if (!registro) {
        return Response.json(
          { message: "Não achei seu registro!" },
          { status: 404 },
        );
      }

      return Response.json(
        { message: "Seu registro foi atualizado!" },
        { status: 200 },
      );
    },

    DELETE: async (request: BunRequest<"/registros/:id">) => {
      const idValido = Number(request.params.id);

      if (!Number.isInteger(idValido) || idValido <= 0) {
        return Response.json(
          { message: "Você mandou um ID inválido!" },
          { status: 400 },
        );
      }

      const [registro] = await db
        .delete(registrosTable)
        .where(eq(registrosTable.id, idValido))
        .returning();

      if (!registro) {
        return Response.json(
          { message: "Esse ID que você me mandou não existe!" },
          { status: 404 },
        );
      }

      return Response.json(
        { message: "Deu certo excluir!" },
        { status: 200 },
      );
    },
  },
};
