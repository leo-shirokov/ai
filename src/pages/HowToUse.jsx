import { useState } from 'react'
import { GoSettings } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal/Modal'

export const HowToUse = () => {
	const [open, setOpen] = useState(true)
	const navigate = useNavigate()
	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false)
				navigate('/chat')
			}}
		>
			<div className='text-zinc-400 text-md font-extralight leading-6'>
				<p className=''>
					The <span className='font-normal'>prompt</span> can be
					entered in any language.&nbsp;
					<span className='font-normal'>Clear chat</span> every time
					when you change conversation topic.
				</p>
				<br />
				<GoSettings className='text-2xl px-1 float-right' />
				<p>
					<span className='text-zinc-500 font-normal underline'>
						Drop-down list:
					</span>
					&nbsp; select chat behavior role (default is helpful
					assistant, suitable for most cases)
				</p>
				<p>
					<span className='text-zinc-500 font-normal underline'>
						Scale-1
					</span>
					&nbsp;
					<span className='font-bold'>Variability:</span> number of
					answer options (from 1 to 5)
				</p>
				<p>
					<span className='text-zinc-500 font-normal underline'>
						Scale-2
					</span>
					&nbsp;
					<span className='font-bold'>Variety:</span> higher is more
					creative, lower is more deterministic (from 0.2 to 2, step
					0.1)
				</p>
				<p>
					<span className='text-zinc-500 font-normal underline'>
						Scale-3
					</span>
					&nbsp;
					<span className='font-bold'>Penalty:</span> decreased
					likelihood of repeated responses in chat mode (from 0 to 1,
					step 0.1)
				</p>
				<p>
					<span className='text-zinc-500 font-normal underline'>
						Scale-4
					</span>
					&nbsp;
					<span className='font-bold'>Answer length:</span> the
					higher, the more complete the answer (from 100 tokens to
					2100, step 400 tokens)
				</p>
			</div>
		</Modal>
	)
}
