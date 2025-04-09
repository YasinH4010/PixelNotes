import AddNote from './AddNote.jsx'



export default function Nav({addnote= true, title="PIXEL NOTES"}) {
  
  return (
    <nav><h3>{title}</h3>
    {addnote && <AddNote/>}
    </nav>
    )
}