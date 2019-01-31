import axios from 'axios';

export function addStudent(newStudent) {
	return dispatch => {
		dispatch({
			type: 'ADD_STUDENT',
			payload: axios.post('https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student', newStudent)
		});
	};
}

export function editStudent(studentId, editedData) {
	return dispatch => {
		dispatch({
			type: 'EDIT_STUDENT',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}`, editedData)
		});
	};
}

export function deleteStudent(id) {
	return dispatch => {
		dispatch({
			type: 'DELETE_STUDENT',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${id}`)
		});
	};
}

export function addPayment(newPayment, studentId) {
	return dispatch => {
		dispatch({
			type: 'ADD_PAYMENT',
			payload: axios.post(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment`, newPayment)
		});
	};
}

export function editPayment(editedPayment, studentId, paymentId) {
	return dispatch => {
		dispatch({
			type: 'EDIT_STUDENT',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment/${paymentId}`, editedPayment)
		});
	};
}

export function deletePayment(studentId, paymentId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_STUDENT',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment/${paymentId}`)
		});
	};
}

export function addInstallment(newInstallment, studentId, paymentId) {
	return dispatch => {
		dispatch({
			type: 'ADD_INSTALLMENT',
			payload: axios.post(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment/${paymentId}/installment`, newInstallment)
		});
	};
}

export function editInstallment(editedInstallment, studentId, paymentId, installmentId) {
	return dispatch => {
		dispatch({
			type: 'EDIT_INSTALLMENT',
			payload: axios.put(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment/${paymentId}/installment/${installmentId}`, editedInstallment)
		});
	};
}



export function deleteInstallment(studentId, paymentId) {
	return dispatch => {
		dispatch({
			type: 'DELETE_INSTALLMENT',
			payload: axios.delete(`https://eduatlas.com/tuition/5bbe191a64512a2f77b84c70/student/${studentId}/payment/${paymentId}/installment/${installmentId}`)
		});
	};
}
