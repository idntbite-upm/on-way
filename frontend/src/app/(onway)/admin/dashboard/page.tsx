"use client";

import { withAdminAuth } from "@/components/admin/withAdminAuth";

function Dashboard() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			{/* Your dashboard content */}
		</div>
	);
}

export default withAdminAuth(Dashboard);
