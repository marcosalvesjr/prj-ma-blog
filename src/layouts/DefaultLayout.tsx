import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="max-w-7xlmin-h-screen bg-background">
      <Navbar /> 
      <main className="container mx-auto py-6">
        <Outlet /> {/* Aqui é onde as páginas (Home, Details) vão aparecer! */}
      </main>
    </div>
  );
}