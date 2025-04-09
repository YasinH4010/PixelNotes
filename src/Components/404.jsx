import {Link} from 'react-router-dom'
import AddNote from './AddNote'
export default function Error404(){
  return( <>
    <h2>this note does not exist</h2>
    <Link to="/">
      back to home
    </Link>
    <p>create a note</p> <AddNote/>
    </>)
}