import assert from "node:assert/strict";
import app from "./App";

describe("App", () => {
  it("works", () => {
    assert.equal(typeof app, "function");
    assert.equal(typeof app.listen, "function");
  });
});
