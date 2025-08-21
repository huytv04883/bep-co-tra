"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabType } from "@/types";
import { Category } from "@/types/categories";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  data: Category[];
}

export function NavigationTabs({
  activeTab,
  onTabChange,
  data,
}: NavigationTabsProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 p-2 transition-all duration-300">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as TabType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-gray-50 transition-all duration-200">
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
      </Tabs>
    </div>
  );
}
