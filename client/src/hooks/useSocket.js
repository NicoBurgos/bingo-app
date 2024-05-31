import { useEffect } from 'react'
import { useClientStore } from '../store/clientStore'
import { useAdminStore } from '../store/adminStore'

export function useSocket({ socket }) {
	const { updateInputDisabled, resetInputs, updateWinnerPhrases } =
		useClientStore()
	const { updatePhrases, updateWinners } = useAdminStore()

	const useClientSocket = () => {
		useEffect(() => {
			socket.on('clear_bingo', () => {
				resetInputs()
			})

			socket.on('get_winner', (winner_phrases) => {
				updateInputDisabled(true)
				updateWinnerPhrases(winner_phrases)
			})

			return () => socket.off()
		}, [])
	}

	const useAdminSocket = () => {
		useEffect(() => {
			socket.emit('request_initial_data')

			socket.on('send_initial_data', (allPhrases) => {
				const initialCheckedState = allPhrases.reduce((acc, phrase) => {
					acc[phrase] = false
					return acc
				}, {})
				updateWinnerPhrases(initialCheckedState)
				updatePhrases(allPhrases)
			})

			socket.on('get_all_phrases', (allPhrases) => {
				const initialCheckedState = allPhrases.reduce((acc, phrase) => {
					acc[phrase] = false
					return acc
				}, {})
				updateWinnerPhrases(initialCheckedState)
				updatePhrases(allPhrases)
			})

			socket.on('get_winners', (users) => {
				updateWinners(users)
			})
		}, [])
	}

	return {
		useAdminSocket,
		useClientSocket,
	}
}
