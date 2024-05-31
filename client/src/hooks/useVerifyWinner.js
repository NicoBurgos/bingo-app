import { useEffect } from 'react'
import { useClientStore } from '../store/clientStore'
import { verifyWinner } from '../helpers/utils'
import confetti from 'canvas-confetti'

export function useVerifyWinner({ socket }) {
	const {
		winnerPhrases,
		formInputs,
		checkWinner,
		updateCheckWinner,
		username,
	} = useClientStore()

	useEffect(() => {
		if (winnerPhrases.length < 1) return
		verifyWinner(winnerPhrases, formInputs)
			? updateCheckWinner('You Win!')
			: updateCheckWinner('You Lose!')
	}, [winnerPhrases])

	useEffect(() => {
		if (checkWinner == 'You Win!') {
			socket.emit('send_winner', username)
			confetti()
		}
	}, [checkWinner])
}
