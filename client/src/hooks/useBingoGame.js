import { arraysAreEqual } from '../helpers/utils'
import { useAdminStore } from '../store/adminStore'

let winnerPhrases = []
export function useBingoGame({ socket }) {
	const { resetBingo, updateBingoEnded, winnerPhrasesForm, updateWinners } =
		useAdminStore()

	const resetGame = () => {
		resetBingo()
		socket.emit('reset_bingo')
	}

	const getWinner = () => {
		if (winnerPhrasesForm.length == 0) return

		const selectedPhrases = Object.keys(winnerPhrasesForm).filter(
			(phrase) => winnerPhrasesForm[phrase]
		)

		if (arraysAreEqual(selectedPhrases, winnerPhrases)) return

		winnerPhrases = selectedPhrases
		updateWinners([])
		socket.emit('set_winner', selectedPhrases)
		updateBingoEnded(true)
	}

	return {
		resetGame,
		getWinner,
	}
}
