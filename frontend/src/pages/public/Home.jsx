import { Helmet } from 'react-helmet-async'
import HeroSection from '@components/sections/HeroSection'
import MissionSection from '@components/sections/MissionSection'
import ImpactSection from '@components/sections/ImpactSection'
import ProgramsSection from '@components/sections/ProgramsSection'
import StoriesSection from '@components/sections/StoriesSection'
import EventsSection from '@components/sections/EventsSection'
import NewsSection from '@components/sections/NewsSection'
import DonationCTA from '@components/sections/DonationCTA'
import VolunteerSection from '@components/sections/VolunteerSection'
import PartnersSection from '@components/sections/PartnersSection'
import TestimonialsSection from '@components/sections/TestimonialsSection'
import GallerySection from '@components/sections/GallerySection'
import NewsletterSection from '@components/sections/NewsletterSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>[Your Organization Name] - [Your Tagline]</title>
        <meta name="description" content="[Your Organization Name] is a modern organization dedicated to creating meaningful change through education, healthcare, and community development." />
      </Helmet>
      <HeroSection />
      <MissionSection />
      <ImpactSection />
      <ProgramsSection />
      <StoriesSection />
      <EventsSection />
      <NewsSection />
      <DonationCTA />
      <VolunteerSection />
      <PartnersSection />
      <TestimonialsSection />
      <GallerySection />
      <NewsletterSection />
    </>
  )
}
