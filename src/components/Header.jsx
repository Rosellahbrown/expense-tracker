import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-5xl font-extrabold text-blue-600">
          💰 Expense Tracker
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Manage your budget and track your spending with ease.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;