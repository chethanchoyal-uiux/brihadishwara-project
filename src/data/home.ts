export const homeCopy = {
  brand: 'Brihadishwara',
  brandSub: 'Temple',
  tamilName: 'Periya Kovil',
  headline: 'A Living Marvel of the Chola Dynasty',
  heroLead:
    'In Thanjavur, the towering vimana of the Brihadishwara Temple still rises as a monument of faith, art and empire.',
  cta: 'Begin Your Visit',
  ctaSecondary: 'Explore the Temple',
  ctaSecondaryHref: '/explore',
  introEyebrow: 'Welcome',
  introTitle: 'The Brihadishwara Temple',
  introBody: [
    'Welcome to the Brihadishwara Temple, one of the true marvels of the magnificent Chola dynasty! The temple is situated in the South Indian town of Thanjavur, the renowned capital of the Cholas until the 11th century CE and an important center of religion, art, and architecture to this date.',
    'Built by the Chola emperor Rajaraja Chola I, the temple stands as a glorious living monument to all aspects of Chola rule including architecture, art and religion. The temple was originally called the Rajarajeeswaram Temple and later the Peruvudaiyar Temple. In the 17th century, during the Maratha rule it acquired its present-day name of Brihadishwara temple. Local Thanjavur residents affectionately call it the Big Temple or Periya Kovil in Tamil.',
  ],
  introCta: 'Learn More',
  introCtaHref: '#discover',
  tributeEyebrow: 'About this website',
  tributeTitle: 'About This Website',
  tributeBody:
    'A family passion project created as a tribute to Sri. T. Subramanian (Thanjavur Spun Pipe Subramanian) and Smt. S. Neelambal, by their daughter Bhama Ramachandran and her family.',
  thatha: 'Sri. T. Subramanian',
  patti: 'Smt. S. Neelambal',
  sectionsEyebrow: 'A closer look',
  sectionsTitle: 'Discover the Temple',
  sectionsLead:
    'Step through history, architecture, art, and living worship: a guide for visitors and those who wish to understand this sacred place more deeply.',
}

export const navLinks = [
  { label: 'History', href: '/history' },
  { label: 'The Temple', href: '/the-temple' },
  { label: 'Explore', href: '/explore' },
  { label: 'Art & Sculpture', href: '/art' },
  { label: 'Worship', href: '/worship' },
  { label: 'Thanjavur & Environs', href: '/thanjavur' },
  { label: 'About This Website', href: '/tribute' },
]

export const sectionRoutes: Record<string, string> = {
  history: '/history',
  temple: '/the-temple',
  explore: '/explore',
  art: '/art',
  worship: '/worship',
  thanjavur: '/thanjavur',
  tribute: '/tribute',
}

export const footerContent = {
  blurb:
    'The Brihadishwara Temple is one of the true marvels of the magnificent Chola dynasty. Built by the Chola emperor Rajaraja Chola I, the temple stands as a glorious living monument to all aspects of Chola rule including architecture, art and religion.',
  brandBlurb:
    'One of the true marvels of the Chola dynasty, built by Emperor Rajaraja Chola I in Thanjavur, the ancient capital of the Cholas and a lasting center of religion, art, and architecture.',
  alsoKnownAs: [
    'Periya Kovil',
    'Big Temple',
    'Rajarajeeswaram',
    'Peruvudaiyar Temple',
  ],
  visitUs: {
    eyebrow: 'Visit us',
    title: 'Experience the Great Living Chola Temple in Thanjavur',
    cta: 'Begin Your Visit',
    ctaHref: '#visit-details',
  },
  location: {
    heading: 'Location',
    place: 'Thanjavur, Tamil Nadu',
    detail:
      'At the heart of the city, among the Great Living Chola Temples, a UNESCO World Heritage ensemble.',
  },
  visit: {
    heading: 'Temple Hours',
    hours: ['6:00 AM to 12:30 PM', '4:00 PM to 8:30 PM'],
    note: 'Open daily',
  },
  poojas: {
    heading: 'Daily Poojas',
    items: [
      { name: 'Kaala Sandhi', time: '6:30 AM' },
      { name: 'Uchikalam', time: '12:00 PM' },
      { name: 'Sayarakshai', time: '5:30 PM' },
      { name: 'Arthajamam', time: '8:00 PM' },
    ],
  },
  festivals: {
    heading: 'Major Festivals',
    items: [
      'Natyanjali Dance Festival (Feb/Mar)',
      'Chithirai Car Festival (Apr/May)',
      'Sadhaya Vizha (Oct/Nov)',
    ],
  },
  links: {
    heading: 'Plan Your Visit',
    items: [
      {
        label: 'Tamil Nadu Tourism',
        href: 'https://www.tamilnadutourism.tn.gov.in/destinations/thanjavur',
      },
      {
        label: 'Thanjavur Tourism Council',
        href: 'https://thanjavurtourism.org',
      },
    ],
  },
  exploreHeading: 'Explore',
  tribute:
    'In loving memory of Shri T. Subramaniam (Spun Pipe Company) and Smt. S. Neelambal, long-time residents of Thanjavur.',
  unesco: 'UNESCO World Heritage · Great Living Chola Temples',
}

export const sections = [
  {
    id: 'history',
    title: 'History',
    blurb:
      'From early Tamil dynasties to Rajaraja Chola I, the rulers and stories that shaped this temple.',
    image: '/assets/sections/history.jpg?v=2',
  },
  {
    id: 'temple',
    title: 'The Temple',
    blurb:
      'A 216-foot vimana of interlocking granite: design, construction, and the spirit of Dakshina Kailasam.',
    image: '/assets/sections/temple.jpg?v=2',
  },
  {
    id: 'explore',
    title: 'Explore',
    blurb:
      'Walk the complex with a numbered temple plan: gateways, Nandi, shrines, and the main sanctum.',
    image: '/assets/sections/explore.jpg?v=2',
  },
  {
    id: 'art',
    title: 'Art & Sculpture',
    blurb:
      'Chola bronzes, stone carvings, and frescoes that still speak across a thousand years.',
    image: '/assets/sections/art-stone-sculptures.jpg',
  },
  {
    id: 'worship',
    title: 'Worship & Festivals',
    blurb:
      'A living temple of daily worship, Natyanjali, and festivals that keep devotion alive.',
    image: '/assets/sections/worship-natyanjali.jpg',
  },
  {
    id: 'thanjavur',
    title: 'Thanjavur & Environs',
    blurb:
      'Palaces, crafts, cuisine, and how to reach the city around the Brihadishwara Temple.',
    image: '/assets/sections/thanjavur.jpg?v=4',
  },
  {
    id: 'tribute',
    title: 'About This Website',
    blurb:
      'A family passion project in tribute to Sri. T. Subramanian and Smt. S. Neelambal.',
    image: '/assets/home/dedication.jpg?v=1',
  },
]
