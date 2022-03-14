import { createServer } from "http";
import { once } from "events";
import { randomUUID } from "crypto";
import { Database } from "./database.js";

function responseJSON(data, response) {
  return response.end(JSON.stringify(data));
}

async function handler(request, response) {
  const { method } = request;

  switch (method) {
    case "GET":
      return responseJSON([...Database.values()], response);

    case "POST":
      const body = JSON.parse(await once(request, "data"));
      console.log("recebido", body);

      const id = randomUUID();

      Database.set(id, body);
      return responseJSON({ ok: 1 }, response);

    // case "PUT":
    //   return responseJSON({ ok: 1 }, response);

    case "DELETE":
      Database.clear();
      return responseJSON({ ok: 1 }, response);
  }
}

export default createServer(handler);