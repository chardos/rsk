const { prettify } = require("../utils");
const addActionsToReduxFile = require("./addActionsToReduxFile");
const generateActionCode = require("../renderers/redux/generateActionCode");
const generateReducerCode = require("../renderers/redux/generateReducerCode");
const generateDuckCode = require("../renderers/redux/generateDuckCode");

describe("addActionsToReduxFile()", () => {
  describe("on an action file", () => {
    it("Matches the snapshot", () => {
      const existingFile = generateActionCode("Zone", ["AddZone"]);
      const result = addActionsToReduxFile(
        "Zone",
        ["RemoveZone"],
        existingFile
      );

      expect(prettify(result)).toMatchSnapshot();
    });
  });
  describe("on a reducer file", () => {
    it("Matches the snapshot", () => {
      const existingFile = generateReducerCode("Zone", ["AddZone"]);
      const result = addActionsToReduxFile(
        "Zone",
        ["RemoveZone"],
        existingFile
      );

      expect(prettify(result)).toMatchSnapshot();
    });
  });
  describe("on a duck file", () => {
    it("Matches the snapshot", () => {
      const existingFile = generateDuckCode("Zone", ["AddZone"]);
      const result = addActionsToReduxFile(
        "Zone",
        ["RemoveZone"],
        existingFile
      );

      expect(prettify(result)).toMatchSnapshot();
    });
  });
});
