import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" aria-label="RéactifPub home">
        <Image
          src="/assets/logo.png"
          alt="RéactifPub"
          width={512}
          height={108}
          priority
          className="h-auto w-[136px] md:w-[172px]"
        />
      </Link>
    </div>
  );
}
