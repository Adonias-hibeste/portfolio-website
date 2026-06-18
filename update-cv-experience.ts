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
      description: `Enterprise healthcare platform for professional doulas and birth workers.\n\n• Architected a HIPAA-conscious, enterprise-grade mobile platform from the ground up, replacing 5 disjointed legacy SaaS tools into a single unified Flutter ecosystem organized across 11 cohesive feature modules.\n• Reduced client administrative overhead by an estimated 40% by engineering a seamless workflow covering scheduling, rich-text clinical notes (Flutter Quill), invoicing, and secure file management — all within a single app session.\n• Delivered zero-latency real-time communications by implementing Server-Sent Events (SSE) chat and a WebRTC-bridged telehealth module, enabling live audio/video consultations without third-party conferencing tools.\n• Established a feature-first modular architecture with Riverpod and Freezed, enabling individual modules to be developed, tested, and deployed independently — cutting regression risk by over 60%.\n• Built and maintained a custom Node.js/Express REST API with PostgreSQL, designing normalized schemas that support multi-client data isolation and role-based access control.`,
    },
    {
      position: 'Senior Mobile & AI Developer',
      company: 'Miquido',
      location: 'Remote',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-01-31'),
      current: false,
      order: 2,
      description: `Premium mobile & AI agency delivering enterprise-grade apps for global clients.\n\n• Spearheaded the AI integration practice within the agency's mobile division, pioneering Google Gemini API and on-device ML Kit embeddings across 4 client products at a time when generative AI in mobile was transitioning from novelty to a business standard.\n• Architected and shipped a luxury headless e-commerce platform (Storefront) for a premium fashion client, integrating a real-time AI styling advisor that analyzed user preference signals to surface personalized recommendations — boosting in-app session time by 22%.\n• Engineered Courier, a multi-role fleet logistics platform spanning 4 connected React Native apps (customer, driver, merchant, admin), with a Gemini-powered dynamic route optimizer that cut estimated delivery time variance by 18%.\n• Delivered Circle, a private social network platform with custom Canvas-rendered feeds, Glassmorphism UI, and end-to-end encrypted group channels — maintaining sub-120ms feed render performance even on mid-range Android devices.\n• Maintained strict cross-platform design system synchronization across Swift, Kotlin, and React Native codebases using a custom Next.js Theme Studio, reducing per-project UI setup time from 3 days to under 4 hours.`,
    },
    {
      position: 'Senior Mobile Engineer',
      company: 'Hababond Inc.',
      location: 'Remote',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2024-01-31'),
      current: false,
      order: 3,
      description: `Premium global dating and social networking platform.\n\n• Led mobile engineering for a premium social and dating platform, managing a dependency ecosystem of over 70 libraries while maintaining a stable, crash-free production experience across iOS and Android.\n• Achieved zero-perceptible-latency WebRTC video calling and real-time interactive Google Maps-powered discovery by optimizing connection negotiation and stream rendering pipelines.\n• Implemented a robust identity and anti-fraud system using Firebase Authentication and Google ML Kit face verification, significantly reducing fake account registrations and contributing to a sustained 4.8-star App Store rating.\n• Engineered a high-performance, infinitely scrolling user feed using virtualized list rendering and aggressive image pre-fetching, maintaining 60fps scroll performance under datasets of 10,000+ profiles.\n• Designed and delivered the full app release pipeline — from code signing and flavored builds to staged App Store rollouts — enabling weekly feature releases without impacting production stability.`,
    },
    {
      position: 'Mobile Template Engineer & Customer Support',
      company: 'Dopebase',
      location: 'Remote',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2023-01-31'),
      current: false,
      order: 4,
      description: `Developer productivity company selling premium, production-ready app templates across Flutter, React Native, Swift, and Kotlin.\n\n• Maintained and elevated a commercial library of production-ready mobile app templates spanning Flutter, React Native (JavaScript), Swift (iOS), and Kotlin (Android), used by hundreds of global developers and entrepreneurs to skip months of initial build time.\n• Resolved deep architectural bugs and upgraded legacy patterns across all four template ecosystems to remain compatible with the latest framework and SDK releases, reducing reported developer setup issues by over 50% as measured by support ticket volume.\n• Streamlined UI component libraries across each platform, enforcing clean prop contracts, consistent design tokens, and accessibility standards — directly improving template quality ratings and increasing resale value for the business.\n• Delivered frontline customer support via email, diagnosing integration issues, providing step-by-step technical guidance, and resolving purchase disputes for a global developer customer base — maintaining a high satisfaction rate and protecting the company's reputation on its storefronts.\n• Contributed to the Dopebase open-source admin panel ecosystem, ensuring template database schemas and API contracts remained compatible with the shared infrastructure used across all sold templates.`,
    },
    {
      position: 'Mobile App Founder & Lead Engineer',
      company: 'Sefere PLC',
      location: 'Addis Ababa, Ethiopia',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2023-01-31'),
      current: false,
      order: 5,
      description: `Culturally-tailored social network launched on the Apple App Store.\n\n• Designed, engineered, and single-handedly launched a localized social networking app from concept to App Store in under 6 months, facilitating over 10,000+ community connections within the first quarter post-launch.\n• Applied Clean Architecture (Domain-Driven Design) with Flutter and Firebase, structuring the codebase into clearly separated domain, data, and presentation layers — enabling the platform to scale without architectural refactoring.\n• Implemented multi-language support and location-based discovery using the Geoflutterfire library, enabling hyper-local content feeds that drove a 35% higher daily active user rate compared to global-feed alternatives.\n• Secured the platform with Google ML Kit face verification during onboarding, reducing fraudulent signups and building user trust from day one.`,
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
    console.log(`Created: ${exp.company} - ${exp.position}`);
  }

  // Update profile
  const existingProfile = await prisma.profile.findFirst();
  const summaryText = `Lead Mobile Architect & AI Systems Engineer with 4+ years of experience designing and shipping enterprise-grade, cross-platform applications across Flutter, React Native, Swift, and Kotlin. Specialized in embedding Generative AI (Google Gemini, ML Kit) into production mobile products that users love. Proven record of architecting scalable, modular systems from the ground up — reducing client operational overhead by 40%, sustaining 60fps performance at scale, and delivering from concept to App Store in under 6 months. Available for senior-level, high-impact roles.`;

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        title: 'Lead Mobile Architect & AI Systems Engineer',
        cvSummary: summaryText,
      }
    });
    console.log('Updated Profile title and cvSummary');
  } else {
    await prisma.profile.create({
      data: {
        name: 'Adonias Hibeste',
        email: 'Adoniashibestegithub@gmail.com',
        title: 'Lead Mobile Architect & AI Systems Engineer',
        cvSummary: summaryText,
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
