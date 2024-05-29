import Footer from "@/components/Footer/page"
import { Navbar } from "@/components/Navbar/navbar"

const AuthLayout = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <>
        <Navbar />
        <div className="my-12 h-full flex items-center justify-center">
            {children}
        </div>
        <Footer />
    </>
  )
}

export default AuthLayout