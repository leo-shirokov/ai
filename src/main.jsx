import React from 'react'
import ReactDOM from 'react-dom/client'
import { IdentityContextProvider } from 'react-netlify-identity'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const url = 'https://avadakedavrachat.netlify.app'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<IdentityContextProvider url={url}>
				<App />
			</IdentityContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
