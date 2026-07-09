import { useState, useEffect } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import UpdateBudget from "../components/UpdateBudget";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CategorySummary from "../components/CategorySummary";

import { db, auth } from "../firebase";


import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Dashboard() {
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
  const [expenses, setExpenses] = useState([]);

  // Firestore Collection
  const expensesCollection = collection(
    db,
    "users",
    auth.currentUser.uid,
    "expenses"
  );

  // Load Expenses

  const loadExpenses = async () => {
    try {
      const snapshot = await getDocs(expensesCollection);

      const loadedExpenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenses(loadedExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Save Budget
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  // Add Expense
const addExpense = async (newExpense) => {
  
  console.log("Adding expense:", newExpense);
  console.log("Current User:", auth.currentUser);
  console.log("Current UID:", auth.currentUser?.uid);
  try {
    await addDoc(expensesCollection, newExpense);
    console.log("Expense saved!");

    await loadExpenses();
  } catch (error) {
    console.log("Error:", error);
  }
};

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(
        doc(db, "users", auth.currentUser.uid, "expenses", id)
      );

      await loadExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // Clear Expenses
  const clearExpenses = async () => {
    try {
      const snapshot = await getDocs(expensesCollection);

      for (const expense of snapshot.docs) {
        await deleteDoc(expense.ref);
      }

      setExpenses([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Totals
  const totalSpent = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
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

export default Dashboard;