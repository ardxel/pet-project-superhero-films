import capitalizeFirstLetter from "../../common/tools/capitalizeFirstLetter";

describe("capitalizeFirstLetter module", () => {
  test('get "hello world" return "Hello world" ', () => {
    expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
  });
  test('get "123" return error', () => {
    // @ts-expect-error
    expect(() => capitalizeFirstLetter(123)).toThrow(Error);
  });
});
