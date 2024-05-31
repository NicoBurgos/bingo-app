import { useAdminStore } from '../../store/adminStore'

export function WinnersList() {
	const { winners } = useAdminStore()
	return (
		<ul className="list">
			{winners.map((winner) => (
				<li key={winner} className="winner">
					{winner}
				</li>
			))}
		</ul>
	)
}
