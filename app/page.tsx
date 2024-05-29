import Image from "next/image";
import med from '../assets/images/med.png';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#00A859] text-white min-h-screen p-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="space-y-3 ml-5">
            <h1 className="text-5xl">Seamless Healthcare</h1>
            <p className="text-lg">Experience why more than 1 million providers trust us already.</p>
            <Button>Get Started</Button>
          </div>
          <div className="mt-5">
            <Image className="rounded-md" src={med} alt="" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
