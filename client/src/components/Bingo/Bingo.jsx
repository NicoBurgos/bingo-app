import {
	hasUniqueValues,
	trimObjectValues,
	verifyObjectKeys,
} from '../../helpers/validations.js'
import { useClientStore } from '../../store/clientStore.js'
import { BingoCell } from '../BingoCell/BingoCell'

export function Bingo({ socket }) {
	const { formInputs, username, inputDisabled, winnerPhrases } =
		useClientStore()
	const { updateFormInputs, updateInputDisabled, updateError } =
		useClientStore()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!verifyObjectKeys(formInputs)) {
			updateError('Error: Complete all the inputs.')
			return
		}
		if (!hasUniqueValues(formInputs)) {
			updateError('Error: Phrases must be unique.')
			return
		}
		if (username == '') {
			updateError('Error: Missing username.')
			return
		}

		const trimmedObj = trimObjectValues(formInputs)
		updateError(null)
		updateInputDisabled(true)
		updateFormInputs(trimmedObj)
		const arrayPhrases = Object.values(trimmedObj)
		socket.emit('submit_phrases', arrayPhrases)
		socket.emit('request_all_phrases')
	}

	return (
		<form onSubmit={handleSubmit} className="bingo-form">
			{Object.keys(formInputs).map((key, index) => (
				<BingoCell
					key={index}
					objKey={key}
					winnerPhrases={winnerPhrases}
				></BingoCell>
			))}
			<button
				className="bingo-button"
				style={{
					backgroundColor: inputDisabled ? 'gray' : 'blue',
					cursor: inputDisabled ? 'default' : 'pointer',
				}}
				type="submit"
				disabled={inputDisabled}
			>
				Confirm
			</button>
		</form>
	)
}
