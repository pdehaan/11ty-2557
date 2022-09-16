module.exports = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string", nullable: true },
    // date: { type: "string", format: "date-time" },
    cover: { type: "string", nullable: true },
    categories: { type: "array", items: { type: "string"}, nullable: true },
    tags: { type: "array", items: { type: "string", minLength: 1, nullable: false }},
  },
  required: ["title"],
  additionalProperties: true,
};
