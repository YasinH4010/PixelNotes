/*
export function useNote({value}){
  
  localStorage.setItem('notes', value)
  console.log(localStorage.getItem('notes'))
  
}*/
export function useNote(value) {
  if(typeof(value[0])!== "string") {
    console.log('notes changed')
  localStorage.setItem('notes', JSON.stringify(value) || [])
  console.log(JSON.parse(localStorage.getItem('notes')))
  }else{
    console.log('folders changed')
    localStorage.setItem('folders',JSON.stringify(value || ['default']))
  console.log(JSON.parse(localStorage.getItem('folders')))} }
