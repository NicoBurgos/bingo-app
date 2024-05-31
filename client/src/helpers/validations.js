export const isOnlyLetters = (str) => {
	const regex = /^[A-Za-z\s]*$/
	return regex.test(str)
}

export const trimObjectValues = (obj) => {
	const trimmedObj = {}

	for (const key in obj) {
		const value = obj[key]
		trimmedObj[key] = value.trim()
	}
	return trimmedObj
}

export const verifyObjectKeys = (obj) => {
	for (let key in obj) {
		if (
			obj[key] === undefined ||
			obj[key] === null ||
			obj[key].trim() === '' ||
			(Array.isArray(obj[key]) && obj[key].length === 0)
		) {
			return false
		}
	}
	return true
}
export const hasUniqueValues = (obj) => {
	const values = Object.values(obj)
	const uniqueValues = new Set(values)
	return values.length === uniqueValues.size
}
