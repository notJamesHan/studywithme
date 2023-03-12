import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between px-7 py-4">
      <h1>Study With Me.</h1>
      <div>
        <Link
          href="/"
          className={router.pathname === "/" ? "text-orange-500 mr-4" : "mr-4"}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={router.pathname === "/about" ? "text-orange-500" : ""}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
