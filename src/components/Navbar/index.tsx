import { MoonStar, LogOut, Code2 } from "lucide-react";
import { SearchNavbar } from "./components/SearchNavbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Função para simular o SignOut
  const handleSignOut = () => {
    signOut();
    console.log("Sessão encerrada");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 justify-between items-center gap-5 px-5">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <div className="font-bold text-xl tracking-tight text-gray-900">
            MA<span className="text-blue-600">Blog</span>
          </div>
        </div>

        {/* Links e Ações */}
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              About
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Linkedin
            </span>
          </div>

          <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />

          <div className="flex items-center gap-3">
            <SearchNavbar />

            <Button variant="ghost" size="icon" className="text-gray-600">
              <MoonStar className="h-5 w-5" />
            </Button>

            <div className="h-6 w-[1px] bg-gray-200" />

            {/* Botão de Sign Out */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-9 px-4 font-medium"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
