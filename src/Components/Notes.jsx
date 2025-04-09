import styles from './css/Notes.module.css'
import {useContext} from 'react'
import {notesContext} from '../Hooks/NoteList'
import {Link} from 'react-router-dom'

export default function Notes(){
  const {notes, folderFilter} = useContext(notesContext)
  
  console.log(folderFilter)
  return(
    <div className={styles.notes}>
      {notes.map(note=>{
      if(note){
      var newText = note.text.slice(0,60)
      if(note.text.length > 60){
        newText+="..."
      }
      if(folderFilter){
      if(folderFilter===note.folder){
      return(<Note key={note.key} id={note.key} title={note.title} text={newText}/>)}
      } else{
      return(<Note key={note.key} id={note.key} title={note.title} text={newText}/>)
      }}})}
      
    </div>
    )
}

function Note({title,text,id}){
  console.log(id)
  function noteHandle(){
    
  }
  return (
    <Link className={styles.noteLink} to={`/note/${id}`}>
    <div onClick={noteHandle} className={styles.note}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
    </Link>
    )
}
