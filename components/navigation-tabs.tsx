"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/categories";
import { useEffect, useRef } from "react";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  data: Category[];
}

const NavigationTabs = ({
  activeTab,
  onTabChange,
  data,
}: NavigationTabsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let startTime = 0;
    let velocity = 0;

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      startTime = Date.now();
      container.style.scrollBehavior = "auto";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;

      const currentTime = Date.now();
      const timeDiff = currentTime - startTime;
      if (timeDiff > 0) {
        velocity = walk / timeDiff;
      }
    };

    const handleTouchEnd = () => {
      isDown = false;
      container.style.scrollBehavior = "smooth";

      if (Math.abs(velocity) > 0.5) {
        const momentum = velocity * 100;
        container.scrollLeft -= momentum;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      startTime = Date.now();
      container.style.scrollBehavior = "auto";
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;

      const currentTime = Date.now();
      const timeDiff = currentTime - startTime;
      if (timeDiff > 0) {
        velocity = walk / timeDiff;
      }
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.scrollBehavior = "smooth";
      container.style.cursor = "grab";

      if (Math.abs(velocity) > 0.5) {
        const momentum = velocity * 100;
        container.scrollLeft -= momentum;
      }
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.scrollBehavior = "smooth";
      container.style.cursor = "grab";
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10 p-2 transition-all duration-300">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value)}
        className="w-full"
      >
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <TabsList className="inline-flex min-w-full w-max bg-gray-50 transition-all duration-200 gap-4 snap-x snap-mandatory">
            {data.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.slug}
                className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all duration-300 hover:bg-gray-100 data-[state=active]:hover:bg-white"
              >
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}

export default NavigationTabs;
