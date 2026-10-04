import Navbar from "@/components/Navbar";
import DashboardClient from "@/components/DashboardClient";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <Navbar />

      <DashboardClient />

      <Footer />
    </main>
  );
}