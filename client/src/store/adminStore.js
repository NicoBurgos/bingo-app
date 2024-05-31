import { create } from 'zustand'

export const useAdminStore = create((set) => ({
	phrases: [],
	winnerPhrasesForm: [],
	winners: [],
	bingoEnded: false,

	updatePhrases: (newPhrases) => {
		set({ phrases: newPhrases })
	},

	updateWinners: (newWinners) => {
		set({ winners: newWinners })
	},

	updateBingoEnded: (newValue) => {
		set({ bingoEnded: newValue })
	},

	updateWinnerPhrasesForm: (phrase) =>
		set((state) => ({
			winnerPhrasesForm: {
				...state.winnerPhrasesForm,
				[phrase]: !state.winnerPhrasesForm[phrase],
			},
		})),

	resetBingo: () => {
		set({
			phrases: [],
			winnerPhrasesForm: [],
			winners: [],
			bingoEnded: false,
		})
	},
}))
