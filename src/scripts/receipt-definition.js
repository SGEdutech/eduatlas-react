import moment from 'moment';
import { titleCase } from './string-manipulation';

function getAmountCollected(installmentInfo) {
	return installmentInfo.feeCollected.toString();
}

function getDate() {
	return [
		{ text: 'Date', style: 'bigger' },
		moment().format('MMM Do YY')
	];
}

function getDescription(installmentInfo) {
	const names = ['Course Code/Name:', 'Mode Of Payment:'];
	const values = [installmentInfo.courseCode, installmentInfo.modeOfPayment];
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
			stack: names

		},
		{
			alignment: 'right',
			width: '*',
			stack: values
		}];
}

function getFromAndToDetails(receiptConfig, studentInfo) {
	const toReturn = [{ text: 'From', style: 'bigger' }];
	const { businessName, addressLine1, addressLine2, city, state, pinCode, gstNumber } = receiptConfig;
	if (businessName) toReturn.push(businessName);
	if (addressLine1) toReturn.push(addressLine1);
	if (addressLine2) toReturn.push(addressLine1);
	if (city) toReturn.push(city);
	if (state) toReturn.push(state);
	if (pinCode) toReturn.push(pinCode);
	if (gstNumber) toReturn.push('Tax/GST ID: ' + gstNumber);

	toReturn.push({ text: 'To', style: 'bigger' });
	toReturn.push(titleCase(studentInfo.name), 'India');
	return toReturn;
	/* return [
		{ text: 'From', style: 'bigger' },
		'SG Edutech',
		'Palam Vihar, Gurgaon',
		'Haryana, 122017',
		'India',
		'Tax ID: 23534654765876',
		{ text: 'To', style: 'bigger' },
		'Navjot Singh',
		'India'
	]; */
}

function getTermsNConditions(receiptInfo) {
	return [
		'Fee is non refundable.'
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
				'Eduatlas.com',
				{ text: 'this invoice cum receipt is electronically generated and does not require any sign' }
			]
		},
		content: [
			{
				margin: [0, 0, 0, 30],
				style: 'header',
				text: 'Receipt'
			},
			{
				alignment: 'justify',
				columns: [
					{
						width: '*',
						stack: getFromAndToDetails(receiptConfig, studentInfo)

					},
					{
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
						[{ text: 'Description', bold: true }, { text: 'Amount Collected', bold: true }],
						[{
							columns: getDescription(installmentInfo)
						}, { alignment: 'right', text: getAmountCollected(installmentInfo) }]
					]
				}
			},
			{
				margin: [0, 20, 0, 0],
				alignment: 'justify',
				columns: [
					{
						width: '50%',
						text: ''

					},
					{
						columns: [
							{
								width: '60%',
								stack: [
									{ text: 'Total', style: 'bigger' }
								],
							},
							{
								alignment: 'right',
								width: '*',
								stack: [
									{ text: getAmountCollected(installmentInfo), style: 'bigger' }
								]
							}]
					}]
			},
			{
				stack: [
					{ text: 'Invoice Note', style: 'bigger', margin: [0, 50, 0, 0] },
					{ text: 'terms and conditions', margin: [0, 10, 0, 10] },
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
