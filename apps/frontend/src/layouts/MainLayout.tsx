import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          ArticleHub
        </h1>


        <div className="flex gap-5 items-center">

          <Link to="/">
            Home
          </Link>

          <Link to="/create-article">
            Create Article
          </Link>

          <Link to="/my-articles">
            My Articles
          </Link>


          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin">
                Admin Dashboard
              </Link>

              <Link to="/admin/pending">
                Pending Articles
              </Link>
            </>
          )}


          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>

        </div>

      </nav>


      <main className="p-6">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;