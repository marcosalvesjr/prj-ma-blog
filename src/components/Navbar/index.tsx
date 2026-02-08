import { MoonStar } from "lucide-react";
import { SearchNavbar } from "./components/SearchNavbar";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center gap-5 px-5">
      <div>
        <span>MA</span>
        <span>Blog</span>
      </div>
      <div className="flex gap-5 items-center">
        <span>About</span>
        <span>Linkedin</span>
        <SearchNavbar />
        <MoonStar />
      </div>
    </nav>
  );
}
