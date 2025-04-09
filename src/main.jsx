import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Note from './Components/Note.jsx'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {NoteList, notesContext} from './Hooks/NoteList'
import Error404 from './Components/404.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteList>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="/note" element={<Note/>}/>
        <Route path="/note/:id" element={<Note/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    </NoteList>
    
  </StrictMode>,
)
