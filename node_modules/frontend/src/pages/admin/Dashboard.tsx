import MainLayout from "../../layouts/MainLayout";
function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-4">
        Welcome to the admin panel.
      </p>
    </MainLayout>
  );
}

export default Dashboard;