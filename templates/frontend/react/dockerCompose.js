module.exports = function(){
    return `web:
  image: nginx
  volumes:
   - ./dist:/usr/share/nginx/html
  ports:
   - "8080:80"
`
}