import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const EditBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3000/books/${id}`)
    .then((res) => {
      setTitle(res.data.title)
      setAuthor(res.data.author)
      setPublishYear(res.data.publishYear)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      alert('An error happened')
      console.log(error)
    })
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true)
    axios.put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book Edited Successfully', { variant: 'success' })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        // alert('An Error happened')
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-[600px]">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
