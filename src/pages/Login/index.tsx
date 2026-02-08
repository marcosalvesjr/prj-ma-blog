import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      Login
      <Link to={"/"}>
        <Button variant={"secondary"}>Entrar</Button>
      </Link>
    </div>
  );
}
