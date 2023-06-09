import { useEffect, useRef, useState } from 'react'
import { GiInfo, GiSettingsKnobs } from 'react-icons/gi'
import { Outlet, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { RequestBody, openAI } from '../components/Api/chatGptApi'
import ChatResponse from '../components/ChatResponse/ChatResponse'
import ChatTextarea from '../components/ChatTextarea/ChatTextarea'
import Loader from '../components/Loader/Loader'
import { rolesOptions } from '../utils/rolesOptions'

const CreateChat = () => {
	const [loading, setLoading] = useState(false)
	const [roleIndex, setRoleIndex] = useState(0)
	const [variability, setVariability] = useState(1)
	const [temperature, setTemperature] = useState(0.7)
	const [penalty, setPenalty] = useState(0)
	const [tokens, setTokens] = useState(2048)
	const [chatResponses, setChatResponses] = useState([])
	const [chatSettings, setChatSettings] = useState(false)
	const navigate = useNavigate()
	const scrolled = useRef(null)

	const onResponse = (event) => {
		const { currentTarget: target } = event
		target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
	}

	const setDefaultValues = () => {
		setRoleIndex(roleIndex)
		setVariability(variability)
		setTemperature(temperature)
		setPenalty(penalty)
		setTokens(tokens)
	}

	const clearChat = () => {
		setChatResponses([])
		setRoleIndex(0)
		setVariability(1)
		setTemperature(0.7)
		setPenalty(0)
		setTokens(2048)
	}

	const sendMessage = async (prompt) => {
		try {
			setLoading(true)

			const newQuestion = [
				...chatResponses.map((el) => el.message),
				prompt,
			].join('\n')

			const roleMessages = {
				role: 'system',
				content: rolesOptions[roleIndex].value,
			}
			const requestBody = new RequestBody(
				newQuestion,
				roleMessages,
				variability,
				temperature,
				penalty,
				tokens
			)

			const response = await openAI(requestBody)
			setDefaultValues()
			setChatResponses((prev) => [
				...prev,
				{
					key: uuidv4(),
					message: response,
				},
			])
			setLoading(false)
		} catch (error) {
			console.log('Error:', error.message)
		}
	}

	useEffect(() => {
		scrolled.current.addEventListener('DOMNodeInserted', onResponse)
	}, [])

	return (
		<>
			<div className='w-full h-full flex flex-col'>
				<form className='w-full'>
					<ChatTextarea onSubmit={sendMessage} />

					{chatSettings && (
						<div className='flex justify-center gap-x-10 items-center px-3 md:flex-col md:gap-y-5 md:px-0'>
							<select
								className='w-1/4 h-7 bg-zinc-600 text-sm text-zinc-300 font-extralight rounded-md p-1 shadow-[0_0_15px_rgba(0,0,0,0.50)] 
                            hover:ring-1 hover:ring-zinc-400 transition-all focus:outline-none xl:w-1/3 lg:w-4/5 md:w-11/12'
								onChange={(e) => setRoleIndex(e.target.value)}
								value={roleIndex}
							>
								{rolesOptions.map((option, i) => (
									<option key={option.name} value={i}>
										{option.label}
									</option>
								))}
							</select>

							<div className='w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6'>
								<div className='w-full flex flex-col justify-center items-center gap-y-2'>
									<div className='w-full flex justify-between items-center text-xs text-zinc-400'>
										<p>1</p>
										<p>2</p>
										<p>3</p>
										<p>4</p>
										<p>5</p>
									</div>
									<input
										className='uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]'
										type='range'
										min='1'
										max='5'
										value={variability}
										onChange={(e) =>
											setVariability(+e.target.value)
										}
									/>
								</div>
								<div className='w-full flex flex-col justify-center items-center gap-y-2'>
									<div className='w-full flex justify-between items-center text-xs text-zinc-400'>
										<p>0.2</p>
										<p>0.4</p>
										<p>0.6</p>
										<p>0.8</p>
										<p>1</p>
										<p>1.2</p>
										<p>1.4</p>
										<p>1.6</p>
										<p>1.8</p>
										<p>2</p>
									</div>
									<input
										className='uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]'
										type='range'
										step='0.1'
										min='0.2'
										max='2'
										value={temperature}
										onChange={(e) =>
											setTemperature(+e.target.value)
										}
									/>
								</div>
							</div>
							<div className='w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6'>
								<div className='w-full flex flex-col justify-center items-center gap-y-2'>
									<div className='w-full flex justify-between items-center text-xs text-zinc-400'>
										<p>0</p>
										<p>0.2</p>
										<p>0.4</p>
										<p>0.6</p>
										<p>0.8</p>
										<p>1</p>
									</div>
									<input
										className='uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]'
										type='range'
										step='0.1'
										min='0'
										max='1'
										value={penalty}
										onChange={(e) =>
											setPenalty(+e.target.value)
										}
									/>
								</div>
								<div className='w-full flex flex-col justify-center items-center gap-y-2'>
									<div className='w-full flex justify-between items-center text-xs text-zinc-400'>
										<p>100</p>
										<p>500</p>
										<p>900</p>
										<p>1300</p>
										<p>1700</p>
										<p>2100</p>
									</div>
									<input
										className='uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]'
										type='range'
										step='400'
										min='100'
										max='2100'
										value={tokens}
										onChange={(e) =>
											setTokens(+e.target.value)
										}
									/>
								</div>
							</div>
						</div>
					)}

					<div className='invisible'>Open settings</div>

					<div className='h-8 flex justify-start items-center gap-x-10'>
						<button
							type='button'
							onClick={() => navigate('/chat/howtouse')}
							className='text-xl text-zinc-400 hover:text-zinc-300 transition-all'
						>
							<GiInfo />
						</button>

						<button
							type='button'
							onClick={() => {
								setChatSettings((prev) => !prev)
							}}
						>
							<GiSettingsKnobs className='text-2xl text-zinc-300 focus:text-zinc-500' />
						</button>
						<button
							className='text-md text-zinc-500 shadow-[0_0_15px_rgba(0,0,0,0.50)]
                        bg-zinc-700 rounded-md px-2 py-0.5 hover:text-zinc-400 hover:ring-1 hover:ring-zinc-400 transition-all'
							title='Clear chat history and reset settings'
							type='button'
							onClick={() => {
								clearChat()
							}}
						>
							Clear chat
						</button>
						{loading && <Loader />}
					</div>
				</form>

				<div ref={scrolled} className='w-full overflow-y-auto mt-4'>
					{chatResponses.length > 0 &&
						chatResponses.map((answer) => (
							<ChatResponse key={answer.key} response={answer} />
						))}
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default CreateChat
