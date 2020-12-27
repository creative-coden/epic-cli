module.exports = function(){
    return `import build from '../support/setup';

(async function () {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/'
  });

  console.log('status code: ', response.statusCode);
  console.log('body: ', response.body);
})();
    `
}