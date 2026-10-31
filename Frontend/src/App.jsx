import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
import EmailFeed from "./components/EmailFeed";
import Footer from "./components/Footer";
import MobileFAB from "./components/MobileFAB";

function App() {
  return (      
    <div className="bg-background text-on-surface min-h-screen">      
      <main className="md:ml-64 min-h-screen flex flex-col">
        <Header />

        <div className="relative crosshair-corner corner-tl corner-tr">
          <HeroSection />
        </div>

        <div className="relative crosshair-corner corner-tl corner-tr">
          <StatsBar />
        </div>

        <div className="relative grow crosshair-corner corner-tl corner-tr">
          <EmailFeed />
        </div>

        <div className="relative crosshair-corner corner-tl corner-tr">
          <Footer />
        </div>
      </main>

      <MobileFAB />
    </div>
  );
}

export default App;