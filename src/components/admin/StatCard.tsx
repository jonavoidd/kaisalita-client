export const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ComponentType;
  color: string;
}> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          {value}
        </p>
      </div>
      <div className={`${color} p-3 rounded-full`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    </div>
  </div>
);
