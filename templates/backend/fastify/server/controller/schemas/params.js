module.exports = function () {
  return `{
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  },
  "additionalProperties": false,
  "required": ["id"]
}`;
};
