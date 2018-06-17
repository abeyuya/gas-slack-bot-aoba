import { expect } from "chai";
import { randomPickup } from "../../src/lib/util";

describe("lib/util", () => {
  describe("randomPickup", () => {
    it("正常系", () => {
      const items = ["a", "b", "c", "d"];
      const results = randomPickup(items, 2);
      expect(results.length === 2).to.be.true;

      results.forEach((r) => {
        expect(items.includes(r)).to.be.true;
      });
    });
  });
});
