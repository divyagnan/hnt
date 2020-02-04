import { hnt, hasBrackets, stripBrackets } from "../src/hnt"

// fixtures
const arr1 = [{ people: [{ name: "john" }] }]
const arr2 = [[[[{ name: "john" }]]]]
const arr3 = undefined
const arr4 = null

// test the main hnt function
describe("hnt works", () => {
  it("properly returns deeply nested values", () => {
    expect(hnt(arr1, "[0].people[0].name", "--")).toEqual("john")
    expect(hnt(arr2, "[0][0][0]", "--")).toEqual([{ name: "john" }])
  })
  it("returns a fallback when the path is undefined", () => {
    expect(hnt(arr1, "people[0]", "--")).toEqual("--")
    expect(hnt(arr2, "[3]", 3)).toEqual(3)
    expect(hnt(arr2, "[0][0][1]", [{ name: "john" }])).toEqual([
      { name: "john" }
    ])
  })
  it("handles initial empty (undef, null) values", () => {
    expect(hnt(arr3, "[0].people[0].name", "--")).toEqual("--")
    expect(hnt(arr4, "[0].people[0].name", "--")).toEqual("--")
  })
})

test("Properly determines if a string has []", () => {
  expect(hasBrackets("[0]")).toBeTruthy()
  expect(hasBrackets("person")).toBeFalsy()
})

test("Properly strips enclosing brackets", () => {
  expect(stripBrackets("[0]")).toBe("0")
})
