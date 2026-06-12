'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import GallerySection from '@/components/sections/GallerySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import ReservationModal from '@/components/ReservationModal';
import ReservationSection from '@/components/sections/ReservationSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <>
      <Header onReservation={() => setShowReservation(true)} />

      <main>
        <HeroSection onReservation={() => setShowReservation(true)} />
        <AboutSection />
        <MenuSection />
        <FeaturesSection />
        <StatsSection />
        <GallerySection />
        <TestimonialsSection />
        <ReservationSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <CustomCursor />

      {showReservation && (
        <ReservationModal onClose={() => setShowReservation(false)} />
      )}
    </>
  );
}
