import { useState } from 'react'
import Modal from '../components/Modal/Modal'

export const Welcome = () => {
	const [open, setOpen] = useState(true)
	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false)
			}}
		>
			<div className='text-zinc-400 text-md font-extralight leading-6'>
				<p>
					Sorry, registration required. Contact the application
					administrator.
				</p>
			</div>
		</Modal>
	)
}
