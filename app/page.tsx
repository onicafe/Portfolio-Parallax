import Navbar from '@/components/Navbar';
import HomeSection from '@/components/sections/HomeSection';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main>
        {/* Single Scroll Experience */}
        <HomeSection />
      </main>
    </div>
  );
}
