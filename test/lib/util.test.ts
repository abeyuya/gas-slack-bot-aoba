import { expect } from "chai";
import { randomPickup, timeToSlackFormat } from "../../src/lib/util";

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

  describe("timeToSlackFormat", () => {
    it("正常系", () => {
      const result = timeToSlackFormat(new Date());
      console.log(result);
      const r = result.split(".");

      expect(r.length === 2).to.be.true;
      expect(r[0].length === 10).to.be.true;
      expect(r[1].length === 6).to.be.true;
    });
  });
});
