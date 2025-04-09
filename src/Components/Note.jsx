import Nav from './Nav'
import {useParams} from "react-router-dom"
import {useContext, useEffect, useState} from 'react'
import {NoteList,notesContext} from '../Hooks/NoteList'
import {editnote} from './css/Notes.module.css'
import { useNote} from '../Hooks/useNote'
import Error404 from './404.jsx'

export default function Note(){
  const {notes, dispatch} = useContext(notesContext)
  console.log(notes)
  const {id} = useParams()
  const [noteID, setNoteID] = useState(id)
  const idExist = notes.some((note, index)=>{
      return note && index===Number(id)
    })
 if(!idExist){
   return(
     <Error404/>
     )
 } else{
  return(<>
    <Nav addnote={false} title={notes[noteID].title}/>
    <EditNote/>
    </>
    )
}
}
function EditNote () {
  const {notes, folders, dispatch} = useContext(notesContext)
  const {id} = useParams()
  function editHandle(e){
    console.log(id)
      dispatch({type: 'note/edit', payLoad: {id: id, value: e.target.value }})
  }
  function folderChangeHandle(e){
    console.log(notes)
    dispatch({type: 'folder/change', payLoad:{id: id, value: e.target.value }})
      console.log(newNote)
    
  }
  return(
    <div >
      <textarea className={editnote}  value={notes[Number(id)].text} onChange={editHandle}/>
      <select style={{width:'99%'}} value={notes[Number(id)].folder} onChange={e=>folderChangeHandle(e)}>
        {folders.map(folder=><option value={folder}>{folder}</option>)}
      </select>
    </div>
    )
}