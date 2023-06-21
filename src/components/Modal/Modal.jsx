import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'

function Modal({ open, onClose, children }) {
	function escHandler({ key }) {
		if (key === 'Escape') {
			onClose()
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', escHandler)
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('keydown', escHandler)
			}
		}
	}, [])

	if (typeof document !== 'undefined') {
		return createPortal(
			<div
				className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}
			>
				{/* backdrop */}
				<div
					className={`fixed inset-0 bg-black ${
						open ? 'opacity-50' : 'pointer-events-none opacity-0'
					} transition-opacity duration-300 ease-in-out`}
					onClick={onClose}
				/>

				{/* content */}
				<div
					className={`fixed w-full h-fit top-1/3 bg-zinc-800 text-md text-zinc-500 
                    font-extralight shadow-lg w-fit px-6 py-8 rounded-md md:bottom-0 md:top-14 
                    md:overflow-auto md:h-3/4 ${
						open ? 'opacity-100' : 'pointer-events-none opacity-0'
					} transition-opacity duration-300 ease-in-out`}
				>
					<div>
						<button className='pb-4' onClick={onClose}>
							<CgClose />
						</button>
					</div>
					{children}
				</div>
			</div>,
			document.body
		)
	} else {
		return null
	}
}

export default Modal
