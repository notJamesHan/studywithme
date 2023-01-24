import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <h2>StudyWithMe.io</h2>
      <div>
        <Link href="/" className={router.pathname === "/" ? "text-orange-500" : ""}>
          Home
        </Link>
        <Link href="/about" className={router.pathname === "/about" ? "text-orange-500" : ""}>
          About
        </Link>
      </div>
    </nav>
  );
}
