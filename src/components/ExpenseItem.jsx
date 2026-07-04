import { Trash2 } from "lucide-react";

function ExpenseItem({ expense, deleteExpense }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Food":
        return "bg-green-100 text-green-700";
      case "Transport":
        return "bg-blue-100 text-blue-700";
      case "Entertainment":
        return "bg-purple-100 text-purple-700";
      case "Shopping":
        return "bg-pink-100 text-pink-700";
      case "Bills":
        return "bg-yellow-100 text-yellow-700";
      case "Health":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">

      <div>
        <h3 className="font-semibold text-lg">
          {expense.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {expense.date}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
            expense.category
          )}`}
        >
          {expense.category}
        </span>
      </div>

      <div className="flex items-center gap-4">

        <span className="font-bold text-xl">
          ${expense.amount}
        </span>

        <button
          onClick={() =>
            deleteExpense(expense.id)
          }
          className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}

export default ExpenseItem;