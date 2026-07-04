import {
  ClipboardList,
  Trash2,
  Search,
} from "lucide-react";
import ExpenseItem from "./ExpenseItem";
import { categories } from "../constants/categories";

function ExpenseList({
  expenses,
  clearExpenses,
  deleteExpense,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <ClipboardList
            className="text-blue-600"
            size={24}
          />
          Recent Expenses
        </h2>

        {expenses.length > 0 && (
          <button
            onClick={clearExpenses}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
            Clear All
          </button>
        )}

      </div>

      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg pl-10 p-3"
        />
      </div>

      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-6xl mb-4">
            📝
          </p>

          <h3 className="text-xl font-semibold">
            No expenses found
          </h3>

          <p className="text-gray-500">
            Add an expense to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;