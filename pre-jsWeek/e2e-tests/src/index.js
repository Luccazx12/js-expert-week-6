import Server from "./server.js";

Server.listen(3000).on("listening", () =>
  console.log(`running at: ${Server.address().port}`)
);
