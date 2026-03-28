import { Footer } from "@/components/sections/Footer";
import { TerminalCatalogPage } from "@/components/sections/TerminalCatalogPage";
import { getSiteConfig } from "@/lib/data";

export default async function EventsPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  return (
    <main>
      <TerminalCatalogPage />
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
