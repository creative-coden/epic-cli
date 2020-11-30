module.exports = function(){
    return `interface IFile {
  file: { [key: string]: string }
}

export function uploadService(file: IFile): string | void {
  try {
    console.log(file);
    return "Uploaded successfully";
  } catch (error) {
    console.error(error);
  }
}`
}