import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="Reactif"
          width={120}
          height={30}
          className="w-[100px] md:w-[120px]"
        />
      </Link>
    </div>
  );
}
