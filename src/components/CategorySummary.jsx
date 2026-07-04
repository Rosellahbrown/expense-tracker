import {
  PieChart,
  Utensils,
  Car,
  ShoppingBag,
  Film,
  Receipt,
  HeartPulse,
} from "lucide-react";

function CategorySummary({ expenses }) {
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category;

    if (!category) return totals;

    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += expense.amount;

    return totals;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <Utensils className="text-green-600" size={20} />;

      case "Transport":
        return <Car className="text-blue-600" size={20} />;

      case "Shopping":
        return <ShoppingBag className="text-pink-600" size={20} />;

      case "Entertainment":
        return <Film className="text-purple-600" size={20} />;

      case "Bills":
        return <Receipt className="text-yellow-600" size={20} />;

      case "Health":
        return <HeartPulse className="text-red-600" size={20} />;

      default:
        return <PieChart className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
        <PieChart className="text-indigo-600" />
        Spending by Category
      </h2>

      {Object.keys(categoryTotals).length === 0 ? (
        <div className="text-center py-10">
          <PieChart
            className="mx-auto text-gray-300 mb-4"
            size={50}
          />

          <p className="text-gray-500">
            No spending data yet.
          </p>
        </div>
      ) : (
        Object.entries(categoryTotals).map(
          ([category, total]) => (
            <div
              key={category}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-3">
                {getCategoryIcon(category)}

                <span className="font-medium">
                  {category}
                </span>
              </div>

              <span className="font-bold text-lg">
                ${total}
              </span>
            </div>
          )
        )
      )}
    </div>
  );
}

export default CategorySummary;