import React from 'react'
import Navbar from '../../components/Website/Navbar/Navbar';
import AffiliateWarningSection from '../../components/Website/Affiliate Section/AffiliateWarningSection';
import HeroSection from '../../components/Website/Hero/HeroSection';
import OurServicesSection from '../../components/Website/Services Section/OurServicesSection';
import TrustSection from '../../components/Website/Trust Section/TrustSection';
import Footer from '../../components/Website/Footer/Footer';
import AffiliateMarketingComponent from '../../components/Website/AffiliateMarketing/AffiliateMarketingComponent';
import HowItWorks from '../../components/Website/How It Works/HowItWorks';
import TestimonialCarousel from '../../components/Website/Testimonial/TestimonialCarousel';

function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <AffiliateWarningSection/>
    <OurServicesSection id="our-services"/>
    <HowItWorks id="how-it-works"/>
    <TrustSection/>
    <TestimonialCarousel/>
    <AffiliateMarketingComponent/>
    <Footer/>
    </>
  )
}

export default Home