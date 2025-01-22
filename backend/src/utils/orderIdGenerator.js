const generateOrderId = async (Order) => {
	const date = new Date();
	const year = date.getFullYear();

	// Get the latest order for the current year
	const latestOrder = await Order.findOne({
		orderId: new RegExp(`ORD-${year}-`),
	}).sort({ orderId: -1 });

	let sequence = 1;
	if (latestOrder) {
		const currentSequence = parseInt(latestOrder.orderId.split("-")[2]);
		sequence = currentSequence + 1;
	}

	return `ORD-${year}-${sequence.toString().padStart(3, "0")}`;
};

module.exports = generateOrderId;
