import { useAdminStore } from '../../store/adminStore'

export function PhrasesList() {
	const { phrases, winnerPhrasesForm, updateWinnerPhrasesForm } =
		useAdminStore()

	return (
		<ul className="list">
			{phrases.map((phrase, index) => (
				<li key={index} className="list-item">
					<p>{phrase}</p>
					<input
						className="checkbox-input"
						type="checkbox"
						name={`phrase${index + 1}`}
						checked={winnerPhrasesForm[phrase] || false}
						onChange={() => updateWinnerPhrasesForm(phrase)}
					/>
				</li>
			))}
		</ul>
	)
}
