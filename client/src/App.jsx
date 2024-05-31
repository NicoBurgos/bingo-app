import './App.css'
import io from 'socket.io-client'
import { SERVER_URL } from './config.js'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'

const socket = io.connect(SERVER_URL)
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage socket={socket} />}></Route>
				<Route path="/admin" element={<AdminPage socket={socket} />}></Route>
				<Route path="/*" element={<Navigate to="/" />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
