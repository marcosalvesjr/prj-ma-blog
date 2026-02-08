import { MoonStar } from "lucide-react";
import { SearchNavbar } from "./components/SearchNavbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center gap-5 px-5">
      <div>
        <span>MA</span>
        <span>Blog</span>
      </div>
      <div className="flex gap-5 items-center">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Home
        </Button>
        <span>About</span>
        <span>Linkedin</span>
        <SearchNavbar />
        <MoonStar />
      </div>
    </nav>
  );
}
