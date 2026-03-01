import supertest from "supertest";
import net from "node:net";
import app from "./App";

function canListenOnEphemeralPort(): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => resolve(false));
    server.listen(0, "127.0.0.1", () => {
      server.close(() => resolve(true));
    });
  });
}

describe("App", () => {
  it("works", async function () {
    const canListen = await canListenOnEphemeralPort();
    if (!canListen) {
      this.skip();
      return;
    }

    await supertest(app).get("/").expect("Content-Type", /json/).expect(200);
  });
});
