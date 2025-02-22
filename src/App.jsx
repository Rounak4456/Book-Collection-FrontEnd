import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import CreateBook from './Pages/CreateBook'
import DeleteBook from './Pages/DeleteBook'
import EditBook from './Pages/EditBook'
import ShowBook from './Pages/ShowBook'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App
