export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your manufacturing plants and quality metrics.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Plants</h3>
          <p className="mt-2 text-3xl font-bold text-[#4285F4]">0</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Active Forms</h3>
          <p className="mt-2 text-3xl font-bold text-[#4285F4]">0</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
          <p className="mt-2 text-3xl font-bold text-[#4285F4]">0</p>
        </div>
      </div>
    </div>
  );
}
