import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import{ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'


const NotePage = () => {

	let {id} = useParams()
	let navigate = useNavigate()

	let [note, setNote] = useState(null)

	useEffect(() => {
		getNote()
	}, [id])


	let getNote = async() => {
		if (id === 'new') return

		let response = await fetch(`/api/notes/${id}`)
		let data = await response.json()
		setNote(data)
	}

	let createNote = async () => {
		fetch(`/api/notes/create/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(note)
		})	
	}

	let updateNote = async () => {
		fetch(`/api/notes/${id}/update/`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(note)
		})
	}

	let deleteNote = async () => {
		fetch(`/api/notes/${id}/delete/`, {
			method: 'DELETE',
			headers: {
				'content-type' : 'application/json'
			}
		})
		navigate('/')
	}

	let handleSubmit = ()=> {
		if(id !== 'new' && !note.body){
			deleteNote()
		}else if(id !== 'new'){
			updateNote()
		}else if(id == 'new' && note !== null){
			createNote()
		}
		navigate('/')
	}
	


	return (
		<div className='note'>
			<div className='note-header'>
				<h3>
					<ArrowLeft onClick={handleSubmit}/>
				</h3>
				{id !== 'new' ? (
					<button onClick={deleteNote}>Delete</button>
				): (
					<button onClick={handleSubmit}>Done</button>
				)}
				
			</div>
			<textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value })}} value={note?.body}></textarea>
		</div>
	)
}

export default NotePage