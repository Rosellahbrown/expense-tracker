import {
  Wallet,
  CreditCard,
  PiggyBank,
} from "lucide-react";

function SummaryCard({ title, amount }) {
  const cardStyles = {
    "Total Budget": {
      border: "border-l-4 border-green-500",
      bg: "bg-green-100",
      icon: <Wallet className="text-green-600" size={28} />,
    },
    "Total Spent": {
      border: "border-l-4 border-red-500",
      bg: "bg-red-100",
      icon: <CreditCard className="text-red-600" size={28} />,
    },
    Remaining: {
      border: "border-l-4 border-blue-500",
      bg: "bg-blue-100",
      icon: <PiggyBank className="text-blue-600" size={28} />,
    },
  };

  const style = cardStyles[title];

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 flex justify-between items-center ${style.border}`}
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold">
          {amount}
        </h2>
      </div>

      <div className={`${style.bg} p-4 rounded-full`}>
        {style.icon}
      </div>
    </div>
  );
}

export default SummaryCard;