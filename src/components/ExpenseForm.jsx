import { useState } from "react";
import { PlusSquare } from "lucide-react";
import { categories } from "../constants/categories";

function ExpenseForm({ addExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      setMessage("❌ Please fill in all fields.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    addExpense({
      name: description,
      amount: Number(amount),
      category,
      date: today,
    });

    setMessage("✅ Expense added successfully!");

    setDescription("");
    setAmount("");
    setCategory("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
        <PlusSquare className="text-green-600" />
        Add New Expense
      </h2>

      {message && (
        <div
          className={`mb-4 rounded-lg p-3 ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2">
          Description
        </label>

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label className="block font-medium mb-2">
          Amount
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <label className="block font-medium mb-2">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-6"
        >
          <option value="">
            Select Category
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;