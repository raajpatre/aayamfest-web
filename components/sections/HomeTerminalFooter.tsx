import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.instagram.com/aayamfest?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "> connect --instagram",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  },
  {
    href: "https://www.linkedin.com/company/aayam-tech-fest/",
    label: "> connect --linkedin",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  },
  {
    href: "https://x.com/aayamfest",
    label: "> connect --X",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  }
];

export function HomeTerminalFooter({ lightLinks = false }: { lightLinks?: boolean }) {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/80 sm:mt-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:justify-between md:gap-8 lg:px-8">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-8 w-[190px] sm:h-12 sm:w-[300px]">
            <Image
              src="/navbar-logo.png"
              alt="AAYAM x Newton School of Technology"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 190px, 300px"
            />
          </div>
        </div>

        <p
          className={`whitespace-nowrap text-center font-mono text-[10px] leading-6 sm:text-xs md:text-left lg:text-sm ${lightLinks
            ? "text-cyan-100/95 drop-shadow-[0_0_12px_rgba(34,211,238,0.22)]"
            : "text-white/75"
            }`}
        >
          AAYAM 2026 // Step into the unknown.
        </p>

        <div className="flex flex-nowrap justify-center gap-x-5 font-mono text-[10px] whitespace-nowrap sm:text-xs md:justify-end lg:text-sm">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 ${lightLinks
                ? "text-cyan-200/95 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                : "text-white/65"
                } ${link.accent}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
