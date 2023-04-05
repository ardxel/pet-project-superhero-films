import { getTokenFromLocalStorage } from "@tools/index";
import { validate as uuidValidate } from "uuid";

const MOCK_TOKEN = "50c524dc-bde5-497c-8458-f4cb618b9e50";

beforeEach(() => {
  localStorage.removeItem("user");
});

describe("getTokenFromLocalStorage module", () => {
  test("get token with set token", () => {
    localStorage.setItem("user", JSON.stringify(MOCK_TOKEN));

    expect(getTokenFromLocalStorage()).toBe(MOCK_TOKEN);
  });

  test("get token with fake set token", () => {
    localStorage.setItem(
      "user",
      JSON.stringify(MOCK_TOKEN.split("").reverse().join(""))
    );

    expect(getTokenFromLocalStorage()).not.toBe(MOCK_TOKEN);
  });

  test("validate token", () => {
    localStorage.setItem("user", JSON.stringify("qwerty12345"));

    expect(uuidValidate(getTokenFromLocalStorage() as string)).toBeFalsy();
  });

  test("validate token v2", () => {
    localStorage.setItem("user", JSON.stringify(MOCK_TOKEN));

    expect(uuidValidate(getTokenFromLocalStorage() as string)).toBeTruthy();
  });
});
