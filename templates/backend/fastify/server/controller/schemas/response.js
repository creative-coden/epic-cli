module.exports = function () {
  return `{
  "200": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" }
      }
    },
    "additionalProperties": false,
    "required": ["id", "name"]
  }
}`;
};
