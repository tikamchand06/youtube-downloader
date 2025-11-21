import Header from "@/app/subcomponents/Header";
import Footer from "@/app/subcomponents/Footer";
import HomeSection from "@/app/subcomponents/HomeSection";

export default function Home() {
  return (
    <main className='ytdl-app min-h-screen bg-white dark:bg-black w-full w-screen'>
      <Header />
      <HomeSection />
      <Footer />
    </main>
  );
}
