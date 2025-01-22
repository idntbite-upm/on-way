const generateTempOrderId = () => {
	const date = new Date();
	const year = date.getFullYear();

	const randomSequence = Math.floor(Math.random() * 999)
		.toString()
		.padStart(3, "0");

	return `ORD-${year}-${randomSequence}`;
};

export default generateTempOrderId;
