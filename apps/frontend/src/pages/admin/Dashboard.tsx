import AdminLayout from "../../layouts/AdminLayout";
function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-4">
        Welcome to the admin panel.
      </p>
    </AdminLayout>
  );
}

export default Dashboard;