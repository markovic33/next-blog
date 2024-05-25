import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full py-5 relative flex items-center justify-between max-w-2xl mx-auto px-4">
      <Link href="/" className="text-5xl font-bold">
        Js<span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}
