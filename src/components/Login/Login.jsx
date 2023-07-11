import { useRef, useState } from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import { useNavigate } from 'react-router-dom'
import useLoading from '../../hooks/useLoading'
import Loader from '../Loader/Loader'

function Login() {
	const [isLoading, load] = useLoading()
	const navigate = useNavigate()
	const { loginUser, signupUser } = useIdentityContext()
	const formRef = useRef()
	const [msg, setMsg] = useState('')

	const signup = () => {
		const email = formRef.current.email.value
		const password = formRef.current.password.value

		signupUser(email, password)
			.then((user) => {
				console.log('Success! Signed up', user)
				navigate('/chat')
			})
			.catch(
				(err) => console.error(err) || setMsg('Error: ' + err.message)
			)
	}

	return (
		<div className='flex justify-center items-center w-full h-full'>
			<form
				className='w-80'
				ref={formRef}
				onSubmit={(e) => {
					e.preventDefault()
					const email = e.target.email.value
					const password = e.target.password.value
					load(loginUser(email, password, true))
						.then((user) => {
							console.log('Success! Logged in', user)
							navigate('/chat')
						})
						.catch(
							(err) =>
								console.error(err) ||
								setMsg('Error: ' + err.message)
						)
				}}
			>
				<div className='mb-3'>
					<label className='flex justify-between'>
						Login
						<input
							className='rounded-sm bg-gray-400 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-900 px-2 transition-all'
							type='email'
							name='email'
						/>
					</label>
				</div>
				<div className='mb-5'>
					<label className='flex justify-between'>
						Password
						<input
							className='rounded-sm bg-gray-400 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-900 px-2 transition-all'
							type='password'
							name='password'
						/>
					</label>
				</div>
				<div className='flex justify-around'>
					<input
						className='cursor-pointer hover:text-gray-400 transition-all duration-300'
						type='submit'
						value='Log in'
					/>
					{isLoading && <Loader />}
					<button
						className='hover:text-gray-400 transition-all duration-300'
						onClick={signup}
					>
						Sign Up{' '}
					</button>
					{msg && <pre>{msg}</pre>}
				</div>
			</form>
		</div>
	)
}

export default Login
