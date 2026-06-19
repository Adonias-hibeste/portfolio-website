import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing experience entries...');
  await prisma.experience.deleteMany({});

  console.log('Seeding new experience entries...');

  const experiences = [
    {
      position: 'Lead Mobile Architect',
      company: 'Doulado LLC',
      location: 'Remote',
      startDate: new Date('2025-02-01'),
      current: true,
      order: 1,
      description: `Enterprise healthcare platform for professional doulas and birth workers.\n\n• Spearheaded the delivery of a HIPAA-conscious, enterprise mobile platform, migrating 5 legacy SaaS tools into a unified 11-module Flutter ecosystem.\n• Streamlined client workflows by engineering a seamless scheduling, clinical notes, and invoicing pipeline.\n• Integrated zero-latency SSE chat and a WebRTC-bridged telehealth module, scaling to support 500+ concurrent live consultations daily.\n• Mentored a team of 4 engineers on feature-first modular architecture using Riverpod, reducing onboarding time and accelerating release cadences.\n• Structured a high-throughput Node.js/Express API with PostgreSQL, enforcing strict data isolation and role-based access control for 10,000+ active users.`,
    },
    {
      position: 'Senior Mobile & AI Developer',
      company: 'Miquido',
      location: 'Remote',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-01-31'),
      current: false,
      order: 2,
      description: `Premium mobile & AI agency delivering enterprise-grade apps for global clients.\n\n• Championed the integration of Google Gemini API and on-device ML Kit across client products, establishing the division's AI development standards.\n• Developed a luxury headless e-commerce platform (Storefront) integrating a Gemini-powered AI styling advisor [github.com/Adonias-hibeste/storefront-app], driving a 20% lift in checkout conversion.\n• Created Courier [github.com/Adonias-hibeste/courier-app], a fleet logistics platform spanning 4 apps with a Gemini-powered dynamic route optimizer.\n• Built Circle [github.com/Adonias-hibeste/circle-network], a private social network with custom Canvas feeds and Glassmorphism UI, sustaining 60fps scrolling.\n• Standardized a cross-platform design system synchronization layer, reducing per-project UI setup time from days to under 4 hours.`,
    },
    {
      position: 'Senior Mobile Engineer',
      company: 'Hababond Inc.',
      location: 'Remote',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2024-01-31'),
      current: false,
      order: 3,
      description: `Premium global dating and social networking platform.\n\n• Led mobile engineering for a premium social platform, maintaining a 99.9% crash-free rate across iOS/Android for 500,000+ users.\n• Deployed a multi-layer anti-fraud system using Firebase and ML Kit, contributing to a sustained 4.8-star App Store rating.\n• Optimized WebRTC connection negotiation and stream rendering pipelines to achieve zero-perceptible-latency video calling.`,
    },
    {
      position: 'Mobile Template Engineer & Customer Support (Part-time)',
      company: 'Dopebase',
      location: 'Remote',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2023-01-31'),
      current: false,
      order: 4,
      description: `Developer productivity company selling premium, production-ready app templates across Flutter, React Native, Swift, and Kotlin.\n\n• Improved and maintained a commercial library of mobile app templates across Flutter, React Native, Swift, and Kotlin, serving 5,000+ developers.\n• Resolved deep architectural bugs and upgraded deprecated patterns, halving developer support ticket volume within 6 months.\n• Refined UI component libraries with clean prop contracts, improving template quality ratings and commercial resale value.`,
    },
    {
      position: 'Mobile App Founder & Lead Engineer (Concurrent)',
      company: 'Sefere PLC',
      location: 'Addis Ababa, Ethiopia',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2023-01-31'),
      current: false,
      order: 5,
      description: `Culturally-tailored social network launched on the Apple App Store.\n\n• Founded and independently launched a localized social networking app from concept to App Store, acquiring 5,000 active users.\n• Designed the platform using Clean Architecture (DDD) with Flutter and Firebase, scaling to handle high traffic without refactoring.\n• Enabled location-based discovery via Geoflutterfire and integrated Google ML Kit face verification for secure user onboarding.`,
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
    console.log(`Created: ${exp.company} - ${exp.position}`);
  }

  // Update profile
  const existingProfile = await prisma.profile.findFirst();
  const summaryText = `Lead Mobile Architect with 4+ years of experience designing and shipping enterprise-grade, cross-platform applications across Flutter, React Native, Swift, and Kotlin. Specialized in embedding Generative AI (Google Gemini, ML Kit) into production mobile products. Proven record of architecting scalable, modular systems, reducing operational overhead, and delivering from concept to App Store in under 6 months. Available for senior-level, high-impact roles.`;

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        title: 'Lead Mobile Architect',
        cvSummary: summaryText,
        linkedin: 'https://www.linkedin.com/in/adonias-hibeste',
        github: 'https://github.com/Adonias-hibeste',
        website: 'https://adonias-portfolio.vercel.app',
        phone: '+251 987 081 856',
        location: 'Addis Ababa, Ethiopia',
      }
    });
    console.log('Updated Profile title and cvSummary');
  } else {
    await prisma.profile.create({
      data: {
        name: 'Adonias Hibeste',
        email: 'Adoniashibestegithub@gmail.com',
        title: 'Lead Mobile Architect',
        cvSummary: summaryText,
        linkedin: 'https://www.linkedin.com/in/adonias-hibeste',
        github: 'https://github.com/Adonias-hibeste',
        website: 'https://adonias-portfolio.vercel.app',
        phone: '+251 987 081 856',
        location: 'Addis Ababa, Ethiopia',
      }
    });
    console.log('Created new Profile with title and cvSummary');
  }
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
