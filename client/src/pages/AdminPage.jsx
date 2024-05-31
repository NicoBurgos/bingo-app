import { PhrasesList } from '../components/PhrasesList/PhrasesList'
import { WinnersList } from '../components/WinnersList/WinnersList'
import { useAdminStore } from '../store/adminStore'
import { useSocket } from '../hooks/useSocket'
import { useBingoGame } from '../hooks/useBingoGame'
import { useState } from 'react'
import { BINGO_ADMIN_KEY } from '../config'
import { Link } from 'react-router-dom'

export function AdminPage({ socket }) {
	const [credentials, setCredentials] = useState('')
	const { phrases, bingoEnded, winners } = useAdminStore()
	const { useAdminSocket } = useSocket({
		socket,
	})
	const { resetGame, getWinner } = useBingoGame({ socket })

	useAdminSocket()

	return (
		<section className="admin-page">
			<Link to="/">
				<button>Go to Home</button>
			</Link>
			<h1>Admin</h1>
			<input
				type="password"
				className="credentials-input"
				placeholder="Enter the key for admin controls"
				value={credentials}
				onChange={(e) => {
					setCredentials(e.target.value)
				}}
			/>

			{credentials === BINGO_ADMIN_KEY ? (
				<>
					<div className="admin-controls">
						<button className="admin-button" onClick={getWinner}>
							Get Winners
						</button>
						<button className="admin-button" onClick={resetGame}>
							Reset Bingo
						</button>
					</div>
					<div className="winners-container">
						{bingoEnded ? (
							<>
								<h2>Winners:</h2>
								{winners.length == 0 ? (
									'There are no winners'
								) : (
									<WinnersList></WinnersList>
								)}
							</>
						) : null}
					</div>
					<div className="phrases-container">
						<h2>Phrases: </h2>
						{phrases.length < 1 ? (
							<p>There are no phrases submitted</p>
						) : (
							<PhrasesList></PhrasesList>
						)}
					</div>
				</>
			) : null}
		</section>
	)
}
