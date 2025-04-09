import styles from './css/Nav.module.css'
import { useState, useContext} from 'react'
import { useNote} from '../Hooks/useNote'
import Notes from './Notes'
import {notesContext} from '../Hooks/NoteList'
export default function AddNotes() {
  const [addNote, setAddNote]= useState(false)
  return(
    <>
    <p className={styles.addnotes} onClick={()=>{
      setAddNote(!addNote)
    }}> {addNote? "-" : "+"} </p>
    {addNote? <AddNote setAddNote={setAddNote}/> : ""}
    </>
    )
}
function AddNote({setAddNote}){
  /*const [notes, setNotes]= useState([])*/
  const {notes, dispatch} = useContext(notesContext)
  const [title,setTitle] = useState("")
  function handleAdd(){
    if(title && title.length < 21){
    const key = notes.length
    const newNote = {key: key, title: title, folder: "default", text: "there is nothing here..!"}
    dispatch({type: "note/create", payLoad: newNote})
    /*useNote([...notes, newNote])*/
    console.log(notes)
    setAddNote(false)
    }else{
      alert('your title must be have 1 to 20 words')
    }
  }
  
  return(<>
    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
    <button onClick={()=>handleAdd()}>add</button>
    </>)
}