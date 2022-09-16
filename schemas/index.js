const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

module.exports = {
  ajv,
  errorsText(errors = []) {
    return ajv.errorsText(errors, {
      separator: "\n",
      dataVar: "frontmatter",
    });
  },
  notes: ajv.compile(require("./notes")),
};
