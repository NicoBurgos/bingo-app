import { create } from 'zustand'

const initialInputs = {
	phrase1: '',
	phrase2: '',
	phrase3: '',
	phrase4: '',
	phrase5: '',
	phrase6: '',
}
export const useClientStore = create((set) => ({
	username: '',
	formInputs: initialInputs,
	inputDisabled: false,
	checkWinner: null,
	error: null,
	winnerPhrases: [],

	onChangeUsername: (e) => {
		const { value } = e.target
		set({ username: value.replace(/[^\w\s]/gi, '') })
	},

	updateFormInputs: (newInputs) => {
		set({ formInputs: newInputs })
	},

	updateCheckWinner: (value) => {
		set({ checkWinner: value })
	},

	updateInputDisabled: (value) => {
		set({ inputDisabled: value })
	},

	updateWinnerPhrases: (newPhrases) => {
		set({ winnerPhrases: newPhrases })
	},

	updateError: (newError) => {
		set({ error: newError })
	},

	resetWinnerPhrases: () => {
		set({ winnerPhrases: [] })
	},

	resetInputs: () => {
		set({
			username: '',
			formInputs: initialInputs,
			inputDisabled: false,
			checkWinner: null,
			winnerPhrases: [],
			error: null,
		})
	},
}))
