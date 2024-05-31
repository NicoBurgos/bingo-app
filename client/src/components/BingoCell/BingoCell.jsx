import { isOnlyLetters } from '../../helpers/validations.js'
import { useClientStore } from '../../store/clientStore.js'

export function BingoCell({ objKey }) {
	const { checkWinner, formInputs, inputDisabled, winnerPhrases } =
		useClientStore()
	const { updateFormInputs } = useClientStore()

	const getBackgroundColor = (value) => {
		if (value === '' || !checkWinner) return 'white'
		return winnerPhrases.includes(value) ? 'green' : 'red'
	}

	const handleInputChange = (e) => {
		const { id, value } = e.target
		if (!isOnlyLetters(value)) return

		updateFormInputs({ ...formInputs, [id]: value.toLowerCase() })
	}

	return (
		<input
			className="bingo-input"
			type="text"
			id={objKey}
			value={formInputs[objKey]}
			onChange={handleInputChange}
			style={{
				backgroundColor: getBackgroundColor(formInputs[objKey]),
				color: 'black',
			}}
			disabled={inputDisabled}
			placeholder="Enter a phrase"
		/>
	)
}
