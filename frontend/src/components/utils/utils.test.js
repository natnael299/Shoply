import { formatPrice } from "./utils.js";
import { it, describe, expect } from "vitest"
describe("test format currency", () => {
  it("test with regular num", () => {
    expect(formatPrice(2033)).toBe("20.33");
  });

  it("test round ups and downs", () => {
    expect(formatPrice(2033.7)).toBe("20.34");
    expect(formatPrice(2033.1)).toBe("20.33");
  });

  it("test 0's", () => {
    expect(formatPrice(2000)).toBe("20.00");
  });
});