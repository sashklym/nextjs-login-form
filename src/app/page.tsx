import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Link href="/login" passHref className="mt-10">
          <Button>
            Are you ready to try sign up?
          </Button>
        </Link>
      </div>
    </main>
  );
}