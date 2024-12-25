export const getShopIdByName = async (name: string, shops: any[]) => {
	const shop = shops.find(
		(shop) => shop.name.toLowerCase().replace(/\s+/g, "") === name,
	);
	return shop?._id;
};
