module.exports = function (name) {
  return `{
  "name": "${name}",
  "background_color": "purple",
  "description": "Shows random fox pictures. Hey, at least it isn't cats.",
  "display": "fullscreen",
  "icons": [
    {
      "src": "/assets/icons/favicon.ico",
      "sizes": "192x192",
      "type": "image/ico"
    }
  ],
  "short_name": "${name}",
  "start_url": "/index.html"
} 
`;
};
