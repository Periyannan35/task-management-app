export default function TaskCard({ task, onUpdate, onDelete }) {
  const handleStatusChange = (newStatus) => {
    onUpdate(task._id, { ...task, status: newStatus });
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 font-semibold ml-4"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {['pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${
              task.status === status
                ? statusColors[status]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
