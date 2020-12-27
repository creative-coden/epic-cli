module.exports = function () {
  return `{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" }
  },
  "additionalProperties": false,
  "required": ["id", "name"]
}`;
};
