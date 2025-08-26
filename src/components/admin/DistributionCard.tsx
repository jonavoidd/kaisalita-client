export const DistributionCard: React.FC<{
  title: string;
  data: Record<string, number>;
  getColor: (key: string) => string;
}> = ({ title, data, getColor }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-3 h-3 rounded-full ${getColor(key)}`}></div>
            <span className="text-sm text-gray-700 truncate">{key}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{value}</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getColor(key)}`}
                style={{
                  width: `${(value / Math.max(...Object.values(data))) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
