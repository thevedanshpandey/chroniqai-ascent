import { useEffect, useState, useMemo } from "react";
import { List, ChevronDown } from "lucide-react";
import { ContentSection, TableOfContentsItem } from "@/data/resources/types";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  sections?: ContentSection[];
  items?: TableOfContentsItem[];
}

export function TableOfContents({ sections, items }: TableOfContentsProps) {
  // Normalize items from either items prop or sections prop with useMemo
  const normalizedItems = useMemo<TableOfContentsItem[]>(() => {
    if (items && items.length > 0) return items;
    return (
      sections?.map((s) => ({
        id: s.id,
        heading: s.heading,
        level: 2,
      })) || []
    );
  }, [items, sections]);

  const [activeId, setActiveId] = useState<string>(normalizedItems[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (normalizedItems.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = normalizedItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(normalizedItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(normalizedItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [normalizedItems]);

  if (normalizedItems.length === 0) {
    return null;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpenMobile(false);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="p-5 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between lg:block mb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-platinum uppercase tracking-wider">
          <List size={14} className="text-platinum-glow" />
          <span>Table of Contents</span>
        </div>
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="lg:hidden text-xs text-muted-foreground flex items-center gap-1 font-mono hover:text-white"
        >
          <span>{isOpenMobile ? "Collapse" : "Expand"}</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform", isOpenMobile && "rotate-180")}
          />
        </button>
      </div>

      <div
        className={cn(
          "space-y-1.5 transition-all duration-300",
          !isOpenMobile && "hidden lg:block"
        )}
      >
        {normalizedItems.map((item, idx) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-modern transition-all duration-200 block truncate",
                isH3 ? "pl-5 text-muted-foreground/80 text-[11px]" : "pl-2.5",
                isActive
                  ? "bg-secondary/80 text-white font-medium border-l-2 border-platinum pl-2"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
              title={item.heading}
            >
              <span className="font-mono text-muted-foreground/60 mr-2">
                {idx < 9 ? `0${idx + 1}.` : `${idx + 1}.`}
              </span>
              {item.heading}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
