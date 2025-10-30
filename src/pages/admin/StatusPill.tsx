const StatusPill = ({ status }: { status: string }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    let colorClasses = "";
    switch (status?.toLowerCase()) {
        case 'active':
        case 'paid':
        case 'approved':
            colorClasses = "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
            break;
        case 'pending':
            colorClasses = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
            break;
        case 'expired':
        case 'rejected':
            colorClasses = "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
            break;
        default:
            colorClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};
export default StatusPill