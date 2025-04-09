import {useState, createContext, useEffect, useReducer} from 'react'
import {useNote} from './useNote'
import PageNotFound from '../Components/404.jsx' 
const notesContext = createContext()

function NoteList({children}){
  /* ---
  STATE MANAGEMENT
  --- */
  
  const initialState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    folders: JSON.parse(localStorage.getItem('folders')) || ['default'],
    folderFilter: ""
  }
  const [{notes, folders, folderFilter}, dispatch] = useReducer(reducer, initialState)
  
  function reducer(state, action){
    switch(action.type){
      
      case 'note/create':
        useNote([...state.notes , action.payLoad])
        return{...state, notes: [...state.notes , action.payLoad]}
        
      case 'note/edit':
        const newNoteEditChanged = state.notes.map((note, index)=>index===Number(action.payLoad.id) ? {...note, text: action.payLoad.value} : note)
        useNote(newNoteEditChanged)
        return{...state, notes: newNoteEditChanged}
        
      case 'note/delete':
        var note = state.notes
        delete note[action.payLoad]
        return{...state, notes: note}
        useNote(note)
      
      case 'folder/create':
       if(state.folders){
        useNote([...state.folders, action.payLoad])
        return{...state, folders: [...state.folders, action.payLoad]}
       }else{
      useNote([action.payLoad])
      return{...state, folders: [action.payLoad]}
      }
      case 'folder/delete':
        return{...state, folders: action.payLoad}
      case 'folder/change':
        const newNoteFolderChanged = state.notes.map((note, index)=>index===Number(action.payLoad.id) ? {...note, folder: action.payLoad.value} : note) 
        useNote(newNoteFolderChanged)
        return{...state, notes: newNoteFolderChanged}
        
      case 'folder/filter':
        return{...state, folderFilter: action.payLoad}
    }
  }
  
  
  
  /* ---
  STATE MANEGEMENT
  --- */

useEffect(function(){
  function deleteHandle(index){
    console.log('deleting...')
    dispatch({type: "note/delete", payLoad: index})
  }
  notes.map((note, index)=>{
    if(note){
    if(note.text === "$$DELETE"){
      deleteHandle(index)
    }}})
}, [notes])

  /*const [folders, setFolders] = useState(JSON.parse(localStorage.getItem('folders')) || ['default'])
  const [folderFilter, setFolderFilter] = useState(false)
  console.log(notes)*/
  console.log(initialState.folders)
  console.log(folders)
  return <notesContext.Provider value={{
    notes,
    folders,
    folderFilter,
    dispatch
  }}>
    {children}
  </notesContext.Provider>
}

export { NoteList, notesContext}