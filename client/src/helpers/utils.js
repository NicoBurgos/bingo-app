export const verifyWinner = (winner_phrases, formInputs) => {
	if (!winner_phrases || !formInputs) return
	return Object.values(formInputs).every((element) =>
		winner_phrases.includes(element)
	)
}

export const arraysAreEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false
	}

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false
		}
	}

	return true
}
