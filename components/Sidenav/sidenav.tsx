"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdCreate, IoIosSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import SidebarItem from "./item";
import { LucideIcon, LayoutDashboard, Newspaper } from "lucide-react";
import admin from '../../assets/images/admin.jpg'

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

// interface SideBarItem {
//     name: string;
//     icon: any;
//     path: string;
// };

const items: SideBarItem[] = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Book Consultation",
      path: "/create",
      icon: Newspaper
    },
];

export const Sidenav = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        const sidebarElement = document.getElementById("sidebar");
        if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
            setSidebarVisible(false);
        }
        };

        if (sidebarVisible) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <>
            {sidebarVisible && (
                <div
                    className="fixed inset-0 bg-black opacity-25 z-10"
                    onClick={closeSidebar}
                ></div>
            )}

            <div className="fixed top-0 right-0 w-full bg-white p-4 flex items-center justify-between z-[30]">
                <div className="flex items-center">
                    <GiHamburgerMenu
                        size={24}
                        className="mr-5 font-extrabold lg:hidden"
                        onClick={toggleSidebar}
                    />
                    <div className="lg:ml-72">
                        <p className="font-bold">Dashboard</p>
                    </div>
                </div>

                <p>User Profile</p>
            </div>

            <div
                id="sidebar"
                className={`lg:left-0 ${sidebarVisible ? "left-0" : "-left-72"} fixed top-0 h-screen w-72 bg-white shadow-lg duration-500 z-[30] p-4 px-6 `}
            >
                <div className="lg:hidden flex justify-end" onClick={toggleSidebar}>
                    <IoMdClose size={30} />
                </div>
                <div className="flex flex-col space-y-8 w-full">
                    <div className="flex flex-col items-center justify-center border-b pb-5">
                        <div className="w-[60px]">
                            <Image
                                src={admin}
                                alt="ADMIN"
                                className="rounded-md object-cover"
                                width={100}
                                height={100}
                            />
                        </div>
                        <h2 className="font-semibold mt-2">ADMIN</h2>
                    </div>
                <div className="flex flex-col space-y-2" onClick={closeSidebar}>
                    {items.map((item) => (
                        <SidebarItem key={item.path} item={item} />
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}