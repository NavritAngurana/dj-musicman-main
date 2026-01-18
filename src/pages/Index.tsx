import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MusicPlatforms from "@/components/MusicPlatforms";
import CameraAccess from "@/components/CameraAccess";
import Instructions from "@/components/Instructions";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MusicPlatforms />
        <CameraAccess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
