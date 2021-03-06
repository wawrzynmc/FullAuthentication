import { useCallback, useReducer } from 'react';

// Reducer
const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue; // continue if input is undefined (like 'name' during swithcing from singup to login)
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			};
		case 'SET_DATA':
			return {
				inputs: action.inputs,
				isValid: action.formIsValid,
			};
		case 'CLEAR_DATA':
			const clearedInputs = {};
			Object.keys(state.inputs).forEach(
				(input) =>
					(clearedInputs[input] = { value: '', isValid: false })
			);
			return {
				inputs: clearedInputs,
				isValid: false,
			};
		default:
			return state;
	}
};

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity,
	});

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGE',
			value: value,
			isValid: isValid,
			inputId: id,
		});
	}, []);

	const setfFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: 'SET_DATA',
			inputs: inputData,
			formIsValid: formValidity,
		});
	}, []);

	const clearFormData = useCallback(() => {
		dispatch({
			type: 'CLEAR_DATA',
		});
	}, []);

	return [formState, inputHandler, setfFormData, clearFormData];
};
