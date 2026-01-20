import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Categories from '@/components/Categories';
import RegistrationInfo from '@/components/RegistrationInfo';
import Gallery from '@/components/Gallery';
import Sponsors from '@/components/Sponsors';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Categories />
      <RegistrationInfo />
      <Gallery />
      <Sponsors />
      <Contact />
      <Footer />
    </main>
  );
}
