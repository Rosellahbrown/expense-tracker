import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import UpdateBudget from "./components/UpdateBudget";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategorySummary from "./components/CategorySummary";

function App() {
  // Budget
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? Number(savedBudget) : 2000;
  });

  const [budgetInput, setBudgetInput] = useState("");

  // Search & Filter
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Expenses
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [
          {
            id: 1,
            name: "Netflix",
            amount: 15,
            category: "Entertainment",
            date: "01 Jul 2026",
          },
          {
            id: 2,
            name: "Fuel",
            amount: 40,
            category: "Transport",
            date: "03 Jul 2026",
          },
          {
            id: 3,
            name: "Groceries",
            amount: 90,
            category: "Food",
            date: "05 Jul 2026",
          },
        ];
  });

  // Save expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save budget
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  // Add Expense
  const addExpense = (newExpense) => {
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        ...newExpense,
      },
    ]);
  };

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Clear Expenses
  const clearExpenses = () => {
    setExpenses([]);
  };

  // Totals
  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remaining = budget - totalSpent;

  // Search & Filter
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <SummaryCard
            title="Total Budget"
            amount={`$${budget}`}
          />

          <SummaryCard
            title="Total Spent"
            amount={`$${totalSpent}`}
          />

          <SummaryCard
            title="Remaining"
            amount={`$${remaining}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UpdateBudget
            budgetInput={budgetInput}
            setBudgetInput={setBudgetInput}
            setBudget={setBudget}
          />

          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ExpenseList
            expenses={filteredExpenses}
            clearExpenses={clearExpenses}
            deleteExpense={deleteExpense}
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <CategorySummary expenses={expenses} />
        </div>

      </div>
    </div>
  );
}

export default App;