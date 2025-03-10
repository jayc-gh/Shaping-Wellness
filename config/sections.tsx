import HomeSection from '@/sections/home';
import AboutUsSection from '@/sections/aboutUs';
import ContactSection from '@/sections/contact';
import GetInvolvedSection from '@/sections/getInvolved';
import ProgramsSection from '@/sections/programs';

// Define section metadata
export const sections = [
  { id: 'home', component: HomeSection },
  { id: 'aboutus', component: AboutUsSection },
  { id: 'getinvolved', component: GetInvolvedSection },
  { id: 'contact', component: ContactSection },
  { id: 'programs', component: ProgramsSection },
];
