import http from "http";
import { Readable } from "stream";
import { randomUUID } from "crypto";

function* dataGenerator() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Lucca-${index}`,
    };

    yield data;
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for (const data of dataGenerator()) {
        console.log("sending", data);
        this.push(JSON.stringify(data) + "\n");
      }

      // Dados acabaram
      this.push(null);
    },
  });

  readable.pipe(response);
}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("server running at 3000"));
