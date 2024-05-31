import { Bingo } from '../components/Bingo/Bingo'
import { useClientStore } from '../store/clientStore'
import { useSocket } from '../hooks/useSocket'
import { useVerifyWinner } from '../hooks/useVerifyWinner'
import { Link } from 'react-router-dom'

export function HomePage({ socket }) {
	const { onChangeUsername } = useClientStore()
	const { username, checkWinner, inputDisabled, error } = useClientStore()
	const { useClientSocket } = useSocket({
		socket,
	})
	useClientSocket()
	useVerifyWinner({ socket })

	return (
		<section className="home-page">
			<Link to="/admin">
				<button>Go to Admin</button>
			</Link>
			<h1>Bingo</h1>
			<h2>
				{inputDisabled && !checkWinner
					? 'You are Participating. Good Luck!'
					: checkWinner
					? checkWinner
					: null}
			</h2>
			<h3 className="error-msg">{error ? error : null}</h3>
			<div className="username-container">
				<input
					className="username-input"
					type="text"
					name="username"
					placeholder="Enter your username"
					value={username}
					onChange={onChangeUsername}
					disabled={inputDisabled}
				/>
			</div>
			<Bingo socket={socket}></Bingo>
		</section>
	)
}
