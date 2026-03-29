import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { TerminalCatalogPage } from "@/components/sections/TerminalCatalogPage";

export default function EventsPage() {
  return (
    <main>
      <TerminalCatalogPage />
      <HomeTerminalFooter lightLinks />
    </main>
  );
}
