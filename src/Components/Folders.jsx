import styles from './css/Folders.module.css'
import {useContext, useState} from 'react'
import {notesContext} from '../Hooks/NoteList'
import {useNote} from '../Hooks/useNote'

export default function Folders() {
  const {folders, dispatch} = useContext(notesContext)
  return (
    <div className={styles.folders}>
      {folders.map(folder=>{
      return(<Folder key={folder} folderName={folder}/>)})}
      <AddFolder/>
    </div>
    )
}
function Folder({folderName}){
  const {folderFilter, folders, dispatch} = useContext(notesContext)
  function folderFilterHandle(){
    dispatch({type: "folder/filter", payLoad: folderName})
  }
  function folderDeleteHandle(){
    delete folders.folderName
    console.log('deleting folder...')
  }
  return <div onDoubleClick={folderDeleteHandle} onClick={folderFilterHandle} className={styles.folder}><p>{folderName}</p></div>
}

function AddFolder(){
  const {folders, dispatch} = useContext(notesContext)
  const [newFolder, setNewFolder] = useState("")
  function addFolderHandle(){
    console.log(folders)
    console.log(55)
     const folderExists = folders.some(folder=>folder===newFolder)
    if(newFolder && !folderExists){
      
      dispatch({type: 'folder/create', payLoad: newFolder})
      
      setNewFolder("")
    }else if(newFolder){
      setNewFolder("")
    } else {setNewFolder("new folder")}
}
function folderDeleteHandle(){
  console.log(564)
  const folderSplit = newFolder.split("")
  console.log(folderSplit)
  
  /**folderSplit.map((folder, index)=>{
    console.log(folder)
    if(index===0 && folder==="$"){
      console.log(index + "ok")
      
      if(index===1 && folder==="$"){
        console.log(index+ "ok")
        
        folderName= folderSplit.slice(2).join(" ")
        delete folders.folderName
        console.log('deleting folder...' + folderName)
      }
    }
  })**/
  if(folderSplit[0] === "$" && folderSplit[1] === "$"){
    const folderName = folderSplit.slice(2).join("")
    console.log(folderName)
    const folderIndex = folders.indexOf(folderName)
    console.log(folderIndex)
    if (folderIndex !== -1) {
      const newFolders= folders.filter((_, index) => index !== folderIndex)
  dispatch({type: "folder/delete", payLoad: newFolders})
  useNote(newFolders)
}

    /*useNote(folders)*/
  }
  
    
  }
  return <div className={styles.addFolder}><p onClick={addFolderHandle}>+</p>
  {newFolder? <input value={newFolder} onChange={e=>{
  setNewFolder(e.target.value)
  folderDeleteHandle()
  }}/>: ""}</div>
}