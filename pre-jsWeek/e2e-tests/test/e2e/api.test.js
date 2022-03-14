import { jest, expect, test, describe, afterEach } from "@jest/globals";
import supertest from "supertest";
import Server from "../../src/server.js";
import { Database } from "../../src/database.js";

describe("API E2E Test Suite", () => {
  // Limpando o banco de dados após cada teste
  afterEach(() => {
    Database.clear();
  });

  test("POST / = should save an item an return ok", async () => {
    const response = await supertest(Server).post("/").send({
      nome: "Lucca",
      age: 19,
    });

    const expectedResponse = { ok: 1 };
    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse);
  });

  test("GET / = should return an array", async () => {
    const response = await supertest(Server).get("/");

    const data = JSON.parse(response.text);
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toEqual(0);
  });

  test("Delete / = should delete all database and return ok", async () => {
    // Apagando o banco de dados e verificando retorno da API
    const responseDelete = await supertest(Server).delete("/");
    const expectedResponse = { ok: 1 };
    expect(JSON.parse(responseDelete.text)).toStrictEqual(expectedResponse);

    // Verificando se o 'banco de dados' foi completamente apagado.
    const responseGet = await supertest(Server).get("/");
    const data = JSON.parse(responseGet.text);
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toEqual(0);
  });
});