import { Route, Routes } from 'react-router-dom'
import ChatForm from './components/ChatForm/ChatForm'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import ImageForm from './components/ImageForm/ImageForm'
import { HowToUse } from './pages/HowToUse'
import { Welcome } from './pages/Welcome'

function App() {
	return (
		<div className='w-full h-screen bg-zinc-800 flex flex-col'>
			<Header />
			<main className='grow w-3/4 h-full mx-auto bg-zinc-800 px-4 py-10 md:w-11/12 overflow-y-auto'>
				<Routes>
					<Route index element={<Welcome />} />
					<Route path='/chat' element={<ChatForm />}>
						<Route path='howtouse' element={<HowToUse />} />
					</Route>
					<Route path='/image' element={<ImageForm />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
