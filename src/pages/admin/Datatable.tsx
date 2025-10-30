import { Loader2 } from "lucide-react";

const DataTable = ({ title, headers, data, renderRow, icon: Icon, isLoading }: { title: string, headers: string[], data: any[], renderRow: (item: any, index: number) => JSX.Element, icon?: React.ElementType, isLoading?: boolean }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            {Icon && <Icon className="w-6 h-6 mr-3 text-blue-500" />}
            {title}
        </h3>
        <div className="overflow-x-auto -mx-6 flex-grow">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            {headers.map((header) => (
                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            <tr><td colSpan={headers.length} className="text-center p-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" /></td></tr>
                        ) : data?.length > 0 ? (
                            data.map(renderRow)
                        ) : (
                            <tr><td colSpan={headers.length} className="text-center p-8 text-gray-500 dark:text-gray-400">No data available.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
export default DataTable