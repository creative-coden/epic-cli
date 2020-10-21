module.exports = function(){
    return `export async function uploadService(cxt) {
  try {
    return 'Uploaded successfully';
  } catch (error) {
    console.error(error);
  }
}`
}