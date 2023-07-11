import { HiChatAlt2 } from 'react-icons/hi'
import { IoIosLogOut, IoMdImages } from 'react-icons/io'
import { useIdentityContext } from 'react-netlify-identity'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from './logo.png'

function Header() {
	const path = useLocation()
	const navigate = useNavigate()
	const { logoutUser } = useIdentityContext()

	const Logout = () => {
		logoutUser()
		navigate('/')
	}

	return (
		<div className='w-full h-14 bg-zinc-950 px-10 shrink-0 md:px-5'>
			<div className='h-full flex justify-between items-center'>
				<div className='flex justify-center items-center gap-5'>
					<img
						onClick={() => location.reload()}
						className='h-8 hover:cursor-pointer'
						src={logo}
					/>
					<h1 className='text-zinc-300 text-md'>WizardChat</h1>
				</div>
				{path.pathname !== '/' && (
					<div className='flex justify-center gap-x-7'>
						<Link to='/chat'>
							<HiChatAlt2 className='text-2xl text-zinc-400 hover:text-zinc-100 transition-all duration-300' />
						</Link>
						<Link to='/image'>
							<IoMdImages className='text-2xl text-zinc-400 hover:text-zinc-100 transition-all duration-300' />
						</Link>
						<IoIosLogOut
							className='text-2xl text-zinc-400 hover:text-zinc-100 cursor-pointer transition-all duration-300'
							onClick={Logout}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
