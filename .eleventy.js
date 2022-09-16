// const dedent = require("dedent");
const schemas = require("./schemas");

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
 module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("notes", collectionApi => collectionApi.getFilteredByGlob(["./src/notes/*.md"]));
  eleventyConfig.addCollection("$schema", async function (collectionApi) {
    const coll = collectionApi.getAll();
    const errors = [];
    for (const page of coll) {
      const {schema, page: {inputPath}} = page.data;
      try {
        switch (schema) {
          case "notes":
            const valid = schemas.notes(page.data);
            if (!valid) {
              errors.push({
                inputPath,
                message: schemas.errorsText(schemas.notes.errors),
                errors: schemas.notes.errors
              });
            }
            break;
          default:
            if (!!schema && !(schema in schemas)) {
              errors.push({
                inputPath,
                message: `Unknown schema: '${schema}'`
              });
            }
            break;
        }
      } catch (err) {
        console.error(err);
        process.exitCode = 2;
      }
    }
    if (errors.length) {
      // console.error(JSON.stringify(errors, null, 2));
      for (const err of errors) {
        console.error(`[${err.inputPath}] ${err.message}`);
      }
      console.error("");
      process.exitCode = 1;
    }
    return [];
  });

  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
