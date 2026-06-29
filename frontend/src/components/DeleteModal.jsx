import { Trash2, X } from "lucide-react";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-[420px] shadow-2xl animate-in fade-in zoom-in">

        <div className="flex justify-center mb-5">

          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full">

            <Trash2
              className="text-red-600"
              size={34}
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center dark:text-white">

          Delete Task?

        </h2>

        <p className="text-center text-gray-500 dark:text-gray-300 mt-4">

          Are you sure you want to delete

          <span className="font-semibold">

            {" "}{taskTitle}

          </span>

          ?

        </p>

        <p className="text-center text-red-500 mt-2">

          This action cannot be undone.

        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-slate-700 dark:text-white py-3 rounded-xl hover:bg-gray-300"
          >
            <X
              size={18}
              className="inline mr-2"
            />
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
          >
            <Trash2
              size={18}
              className="inline mr-2"
            />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;