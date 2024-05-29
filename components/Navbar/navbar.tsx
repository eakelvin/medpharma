import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import logo from '../../assets/images/eameds.png'
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

export const Navbar = () => {
    const { userId } = auth();    

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={logo} className="h-8 w-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EA MEDS</span>
                    </Link>
                    {userId ? 
                        <UserButton /> 
                        : 
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <Link href="/sign-up" className="text-sm">
                                <Button>Get Started</Button>
                            </Link>
                            <Link href="/sign-in" className="text-sm font-extrabold  text-green-600 dark:text-green-500 hover:underline">
                                Login
                            </Link>
                        </div>
                    }
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link href="/dashboard" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                            </li>
                            {/* <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">Company</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}