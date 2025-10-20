import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import DashboardPage from "../features/dashboard/DashboardPage";
import TopNav from "../components/TopNav";

// Layout component shared across pages
function RootLayout() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet /> {/* This renders the nested route */}
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
