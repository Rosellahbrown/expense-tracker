import { Wallet } from "lucide-react";

function UpdateBudget({
  budgetInput,
  setBudgetInput,
  setBudget,
}) {
  const handleUpdateBudget = () => {
    if (!budgetInput || Number(budgetInput) <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    setBudget(Number(budgetInput));
    setBudgetInput("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
        <Wallet className="text-blue-600" />
        Update Budget
      </h2>

      <input
        type="number"
        placeholder="Enter new budget"
        value={budgetInput}
        onChange={(e) => setBudgetInput(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
  onClick={() => {
    if (budgetInput === "") return;

    setBudget(Number(budgetInput));
    setBudgetInput("");
  }}
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
>
  Update Budget
</button>
    </div>
  );
}

export default UpdateBudget;