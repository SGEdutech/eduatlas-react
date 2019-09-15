import moment from 'moment';
import { titleCase } from './string-manipulation';

function getAmountCollected(installmentInfo) {
	return installmentInfo.feeCollected.toString();
}

function getDate() {
	return [
		{ text: 'Dated', style: 'bigger' },
		moment().format('MMM Do YY')
	];
}

function getDescription(installmentInfo) {
	const names = ['Course Code/Name: ', 'Course Fee:', 'ADD: GST @ ' + installmentInfo.courseGstPercentage];
	const gstAmount = (installmentInfo.courseFee * installmentInfo.courseGstPercentage) / 100
	const values = [installmentInfo.courseCode, installmentInfo.courseFee, gstAmount];

	/* 	names.push('Mode Of Payment: ')
		values.push(installmentInfo.modeOfPayment) */

	/* if (installmentInfo.modeOfPayment === 'card') {
		const { bank, transactionId } = installmentInfo;
		if (bank) {
			names.push('Bank Name');
			values.push(bank);
		}
		if (transactionId) {
			names.push('Transaction ID');
			values.push(transactionId);
		}
	} else if (installmentInfo.modeOfPayment === 'cheque') {
		const { date, bank, chequeNumber } = installmentInfo;
		if (date) {
			names.push('Date of Cheque');
			values.push(date.format('MMM Do YY'));
		}
		if (bank) {
			names.push('Bank Name');
			values.push(bank);
		}
		if (chequeNumber) {
			names.push('Cheque Number');
			values.push(chequeNumber);
		}
	} else {
		const { transactionId } = installmentInfo;
		if (transactionId) {
			names.push('Transaction ID');
			values.push(transactionId);
		}
	} */

	return [
		{
			width: '*',
			stack: names,
			style: 'm1'
		},
		{
			alignment: 'right',
			width: '*',
			stack: values,
			style: 'm1'
		}];
}

function getPaymentMethodDetails(installmentInfo) {
	const names = []
	const values = []
	names.push('Mode Of Payment:')
	values.push(installmentInfo.modeOfPayment)

	if (installmentInfo.modeOfPayment === 'card') {
		const { bank, transactionId } = installmentInfo;
		if (bank) {
			names.push('Bank Name');
			values.push(bank);
		}
		if (transactionId) {
			names.push('Transaction ID');
			values.push(transactionId);
		}
	} else if (installmentInfo.modeOfPayment === 'cheque') {
		const { date, bank, chequeNumber } = installmentInfo;
		if (date) {
			names.push('Date of Cheque');
			values.push(date.format('MMM Do YY'));
		}
		if (bank) {
			names.push('Bank Name');
			values.push(bank);
		}
		if (chequeNumber) {
			names.push('Cheque Number');
			values.push(chequeNumber);
		}
	} else {
		const { transactionId } = installmentInfo;
		if (transactionId) {
			names.push('Transaction ID');
			values.push(transactionId);
		}
	}

	return [
		{
			width: '*',
			stack: names,
			style: 'm1'
		},
		{
			alignment: 'right',
			width: '*',
			stack: values,
			style: 'm1'
		}];
}

function getTotalFee(installmentInfo) {
	const gstAmount = (installmentInfo.courseFee * installmentInfo.courseGstPercentage) / 100
	const totalFee = installmentInfo.courseFee + gstAmount
	return Math.round(totalFee * 100) / 100
}

function getTuitionDetails(receiptConfig) {
	const toReturn = [];
	const { receiptConfigBusinessName, receiptConfigAddressLine1, receiptConfigAddressLine2, receiptConfigCity, receiptConfigState, receiptConfigPinCode, receiptConfigGstNumber } = receiptConfig;
	if (receiptConfigBusinessName) toReturn.push({ text: receiptConfigBusinessName, style: 'bigger' });
	if (receiptConfigAddressLine1) toReturn.push(receiptConfigAddressLine1);
	if (receiptConfigAddressLine2) toReturn.push(receiptConfigAddressLine2);
	if (receiptConfigCity) toReturn.push(receiptConfigCity);
	if (receiptConfigState) toReturn.push(receiptConfigState);
	if (receiptConfigPinCode) toReturn.push(receiptConfigPinCode);
	if (receiptConfigGstNumber) toReturn.push({ text: 'Tax/GST No. : ' + receiptConfigGstNumber, style: 'mb1' });

	return toReturn;
	/* {text: 'Tuition Name', style: 'bigger'},
	'Address',
	'Contact Number',
	'Website',
	{text: 'GST No.', style: 'mb1'} */
}

function getStudentDetails(studentInfo) {
	const toReturn = [{ text: 'Student details', style: 'bigger' }]
	toReturn.push(
		titleCase(studentInfo.name),
		'Roll No: ' + studentInfo.rollNumber,
		'Email: ' + studentInfo.email
	);
	return toReturn;
}

function getTermsNConditions(receiptInfo) {
	return [
		'Any changes in Govt. levies/taxes on fees will be borne by the student.',
		'The validity of this receipt is subject to the realization of cheque/pay order/DD.',
		'Fee once paid will NOT BE REFUNDED in any case, except, when the company decides to cancel the product which may happen at the sole discretion of the company.'
	];
}

export function getDocDef(receiptConfig, studentInfo, installmentInfo) {
	const docDefinition = {
		pageSize: 'A4',
		pageMargins: [40, 60, 40, 60],
		footer: {
			fontSize: 10,
			margin: [40, 0, 0, 0],
			stack: [
				{ text: 'This is an electronic receipt and does not require a physical stamp or signature.', alignment: 'center' },
				{ text: 'STUDY MONITOR APP powered by EDUATLAS.COM', alignment: 'center', fontSize: '12', style: 'mt1' }
			]
		},
		content: [
			{
				style: 'mb1',
				table: {
					headerRows: 1,
					widths: ['*'],
					body: [
						[{
							alignment: 'center',
							stack: getTuitionDetails(receiptConfig)
						}],
					]
				}
			},
			{
				margin: [0, 0, 0, 30],
				alignment: 'center',
				style: 'header',
				text: 'Fee Receipt'
			},
			{
				alignment: 'justify',
				columns: [
					{
						width: '*',
						stack: getStudentDetails(studentInfo)

					},
					{
						alignment: 'right',
						width: '*',
						stack: getDate()
					}]
			},
			{
				margin: [0, 20, 0, 0],
				table: {
					headerRows: 1,
					widths: ['*', 'auto'],
					body: [
						[
							{ alignment: 'center', text: 'Details/Description', bold: true, style: 'my1' },
							{ alignment: 'center', text: 'Amount', bold: true, style: 'm1' }
						],
						[
							{ columns: getDescription(installmentInfo) },
							{ alignment: 'center', text: getAmountCollected(installmentInfo), style: 'm1' }
						],
						[
							{
								columns: [{
									width: '*',
									stack: [{ text: 'Total', bold: true, style: 'my1' }],
									style: 'm1'
								},
								{
									alignment: 'right',
									width: '*',
									stack: [{ text: getTotalFee(installmentInfo), bold: true, style: 'my1' }],
									style: 'm1'
								}]
							},
							{ alignment: 'center', text: getAmountCollected(installmentInfo), bold: true, style: 'm1' }
						]
					]
				}
			},
			{
				style: 'mt1',
				table: {
					headerRows: 1,
					widths: ['*'],
					body: [
						[{
							columns: getPaymentMethodDetails(installmentInfo)
						}],
					],
				}
			},
			{
				stack: [
					{ text: 'INVOICE NOTES/ TERMS & CONDITIONS:', style: 'bigger', margin: [0, 50, 0, 0] },
					{
						ol: getTermsNConditions(receiptConfig)
					}
				]
			}

		],
		styles: {
			header: {
				fontSize: 20,
				bold: true
			},
			bigger: {
				fontSize: 13,
				bold: true,
				margin: [0, 10, 0, 0]
			},
			mt2: {
				margin: [0, 20, 0, 0]
			},
			mt1: {
				margin: [0, 10, 0, 0]
			},
			my1: {
				margin: [0, 10, 0, 10]
			},
			m1: {
				margin: [10, 10, 10, 10]
			},
			alignMid: {
				align: 'center'
			}
		},
		defaultStyle: {
			columnGap: 30
		}

	};

	return docDefinition;
}

// function downloadPDF() {
// 	pdfMake.createPdf(docDefinition).download('receipt.pdf');
// }
