"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SubMenu from "./submenu";

interface SideBarItem {
  name: string;
  icon: LucideIcon;
  path: string;
  items?: SubItem[];
}

interface SubItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const SidebarItem = ({ item }: { item: SideBarItem }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(path);

    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }
  };

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [path, pathname, items]);

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 hover:bg-sidenav-background rounded-lg cursor-pointer hover:text-sidenav-active ${
          isActive && "bg-sidenav-background text-sidenav-active"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <p className="font-semibold">{name}</p>
        </div>

        {items && items.length > 0 && (
          <ChevronDown
            size={16}
            className={expanded ? "rotate-180 duration-300" : ""}
          />
        )}
      </div>
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-3 ml-10">
          {items.map((item) => (
            <SubMenu key="path" item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItem;
