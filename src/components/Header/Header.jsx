import { HiChatAlt2 } from 'react-icons/hi'
import { IoMdImages } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import logo from './logo.png'

function Header() {
	const path = useLocation()
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
							<HiChatAlt2 className='text-2xl text-zinc-400 hover:text-zinc-100' />
						</Link>
						<Link to='/image'>
							<IoMdImages className='text-2xl text-zinc-400 hover:text-zinc-100' />
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Header
