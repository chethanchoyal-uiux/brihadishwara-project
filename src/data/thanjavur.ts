/** Thanjavur and its Environs — writeup §7. Client wording preserved; structure is presentation only. */

export type ThanjavurImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  credit?: string
  objectPosition?: string
  lightboxSrc?: string
}

export type AttractionItem = {
  id: string
  title: string
  body: string
  image: ThanjavurImage
  /** Optional short line under the title (from source, e.g. distance) */
  meta?: string
  /** Google Maps search query for Get directions */
  directionsQuery?: string
}

export type AttractionGroup = {
  id: string
  title: string
  /** portrait rail | duo discovery | landscape features */
  layout: 'portrait-rail' | 'craft-duo' | 'landscape-rail'
  items: AttractionItem[]
}

export const thanjavurPage = {
  hero: {
    eyebrow: 'city and surroundings',
    title: 'Thanjavur and its Environs',
    lead:
      '**Thanjavur** is an important center of religion, art, and architecture. Most of the Great Living Chola Temples, which are UNESCO World Heritage Monuments, are in and around **Thanjavur**.',
    image: '/assets/thanjavur/1-aerial-thanjavur.jpg?v=2',
  },

  intro: {
    id: 'intro',
    eyebrow: 'Introduction',
    title: 'Thanjavur',
    paragraphs: [
      'The foremost among these, the Brihadishwara Temple, is in the center of the city. **Thanjavur** is also home to Tanjore Painting, a painting style unique to the region. The city is an important agricultural center for the Kaveri Delta and is known as the \u2018rice bowl of Tamil Nadu.\u2019',
    ],
  },

  attractions: {
    id: 'major-attractions',
    chapterLabel: '01',
    eyebrow: 'Major Attractions',
    title: 'Major Attractions',
    groups: [
      {
        id: 'palaces-museums',
        title: 'Explore Palaces\n& Museums',
        layout: 'portrait-rail',
        items: [
          {
            id: 'royal-palace',
            title: 'Thanjavur Royal Palace\n& Art Gallery',
            body: 'Explore courtyards, towers, and a collection of Chola bronzes.',
            directionsQuery: 'Thanjavur Royal Palace Art Gallery, Thanjavur',
            image: {
              src: '/assets/thanjavur/3-royal-palace.jpg',
              alt: 'Thanjavur Royal Palace tower and arched galleries',
              objectPosition: '50% 35%',
            },
          },
          {
            id: 'saraswathi-mahal',
            title: 'Saraswathi Mahal Library',
            body: 'A historic library with rare manuscripts located within the **Thanjavur** Palace complex.',
            directionsQuery: 'Saraswathi Mahal Library, Thanjavur',
            image: {
              src: '/assets/thanjavur/4-saraswathi-mahal.jpg',
              alt: 'Entrance to the Saraswathi Mahal Library in Thanjavur',
              objectPosition: '50% 40%',
            },
          },
          {
            id: 'rajarajan-manimandapam',
            title: 'Rajarajan Manimandapam',
            body: 'A museum showcasing Chola history.',
            directionsQuery: 'Rajarajan Manimandapam, Thanjavur',
            image: {
              src: '/assets/thanjavur/5-rajarajan-manimandapam.jpg',
              alt: 'Equestrian statue of Rajaraja Chola at Rajarajan Manimandapam',
              objectPosition: '50% 30%',
            },
          },
        ],
      },
      {
        id: 'culture-crafts',
        title: 'Discover Culture & Crafts',
        layout: 'craft-duo',
        items: [
          {
            id: 'paintings-handicrafts',
            title: 'Tanjore paintings and handicrafts',
            body: 'Find authentic **Thanjavur** paintings and handicrafts in the shops located around the palace area.',
            image: {
              src: '/assets/thanjavur/6-paintings-handicrafts.jpg',
              alt: 'Tanjore paintings, dancing dolls, and handicrafts on display',
              objectPosition: '50% 45%',
            },
          },
          {
            id: 'swamimalai',
            title: 'Swamimalai',
            meta: '20 km from Thanjavur',
            body: 'Visit workshops to see artisans create famous bronze idols.',
            image: {
              src: '/assets/thanjavur/7-swamimalai-bronze.jpg',
              alt: 'Artisan detailing a bronze idol in a workshop',
              objectPosition: '50% 40%',
            },
          },
        ],
      },
      {
        id: 'other-attractions',
        title: 'More to Explore',
        layout: 'landscape-rail',
        items: [
          {
            id: 'shiva-ganga-garden',
            title: 'Shiva Ganga Garden (Shivagangai Park)',
            body: 'A relaxing spot near the Big Temple.',
            directionsQuery: 'Sivaganga Park, Thanjavur, Tamil Nadu',
            image: {
              src: '/assets/thanjavur/15-shiva-ganga-garden.jpg?v=2',
              alt: 'Small shrine on an island in the Sivaganga Park tank, Thanjavur',
              objectPosition: '50% 45%',
            },
          },
          {
            id: 'thanjavur-cuisine',
            title: 'Thanjavur Cuisine',
            body: "Don't miss traditional Elai Saapadu (banana leaf meals) served at many eateries surrounding the Brihadishwara temple area.",
            directionsQuery: 'meals near Brihadishwara Temple, Thanjavur',
            image: {
              src: '/assets/thanjavur/16-thanjavur-cuisine.jpg?v=2',
              alt: 'Traditional South Indian banana leaf meal with rice, ghee, and brass bowls of accompaniments',
              objectPosition: '50% 45%',
            },
          },
        ],
      },
    ] satisfies AttractionGroup[],
  },

  access: {
    id: 'how-to-get-here',
    chapterLabel: '02',
    eyebrow: 'Travel',
    title: 'How To Get Here',
    lead:
      '**Thanjavur** is easily accessible by road, train and air from Chennai, Bengaluru, and other major Indian cities and international hubs.',
    map: {
      src: '/assets/thanjavur/2-access-map.jpg',
      alt: 'Map showing access routes to Thanjavur by air, train, and road',
      title: 'Getting to Thanjavur',
      objectPosition: '50% 50%',
    } satisfies ThanjavurImage,
    modes: [
      {
        id: 'by-air',
        title: 'By Air',
        image: {
          src: '/assets/thanjavur/8-by-air.jpg',
          alt: 'Passenger jet on final approach over a lit runway at sunset',
        } satisfies ThanjavurImage,
        body: 'The closest airport, **Tiruchirapalli (Trichy) International Airport (TRZ)**, is roughly 59 km from **Thanjavur**, with daily flights from Chennai, Bengaluru, and other cities. From there, taxi or local bus/train cover the 1.5-hour journey.',
        hub: 'Tiruchirapalli (Trichy) International Airport (TRZ)',
        detail:
          'The closest airport is roughly 59 km from **Thanjavur**, with daily flights from Chennai, Bengaluru, and other cities. From there, taxi or local bus/train cover the 1.5-hour journey.',
        map: {
          label: 'Tiruchirappalli International Airport and Thanjavur',
          directionsQuery: 'Tiruchirappalli International Airport, Tiruchirappalli',
          /** Place pins only (no directions route). Airport uses Google’s flight place icon. */
          embedSrc:
            'https://www.google.com/maps?q=Tiruchirappalli+International+Airport&ll=10.776000,78.924000&z=10&hl=en&output=embed',
          /** Wikimedia Commons: File:TRZ_NITB.jpg — CC BY-SA 4.0 (Deepu051993) */
          card: {
            src: '/assets/thanjavur/11-trz-airport.jpg',
            title: 'TRZ Airport',
            region: 'Tiruchirappalli · Tamil Nadu',
            objectPosition: '50% 32%',
          },
          markers: [
            {
              id: 'trz',
              lat: 10.765417,
              lng: 78.709722,
              title: 'Tiruchirappalli International Airport',
              kind: 'flight' as const,
            },
            {
              id: 'thanjavur',
              lat: 10.787,
              lng: 79.1378,
              title: 'Thanjavur',
              kind: 'place' as const,
            },
          ],
        },
      },
      {
        id: 'by-train',
        title: 'By Train',
        image: {
          src: '/assets/thanjavur/9-by-train.jpg',
          alt: 'Red and cream locomotive at a station platform in warm evening light',
        } satisfies ThanjavurImage,
        body: '**Thanjavur Junction (TJ)** connects directly to major cities including Chennai, Bengaluru, Coimbatore, and Rameswaram.',
        hub: 'Thanjavur Junction (TJ)',
        detail:
          'Connects directly to major cities including Chennai, Bengaluru, Coimbatore, and Rameswaram.',
        map: {
          label: 'Thanjavur Junction railway station',
          directionsQuery: 'Thanjavur Junction, Thanjavur, Tamil Nadu',
          embedSrc:
            'https://www.google.com/maps?q=Thanjavur+Junction+(TJ),+Thanjavur,+Tamil+Nadu&z=15&hl=en&output=embed',
          /** Wikimedia Commons: File:Thanjavur_Junction.jpg */
          card: {
            src: '/assets/thanjavur/12-thanjavur-junction.jpg',
            title: 'Thanjavur Junction',
            region: 'Tamil Nadu',
          },
          markers: [
            {
              id: 'junction',
              lat: 10.7742,
              lng: 79.138,
              title: 'Thanjavur Junction',
              kind: 'train' as const,
            },
          ],
        },
      },
      {
        id: 'by-road',
        title: 'By Road',
        image: {
          src: '/assets/thanjavur/10-by-road.jpg',
          alt: 'Palm-lined highway at sunset with cars heading into the distance',
        } satisfies ThanjavurImage,
        body: 'National and state highways link **Thanjavur** to hubs like Chennai (about 6–7 hours via NH36), Madurai, and Coimbatore. TNSTC and private express buses run day and night into the Thanjavur New Bus Stand.',
        hub: 'Thanjavur New Bus Stand',
        detail:
          'National and state highways link **Thanjavur** to hubs like Chennai (about 6–7 hours via NH36), Madurai, and Coimbatore. TNSTC and private express buses run day and night into the stand.',
        map: {
          label: 'Thanjavur New Bus Stand',
          directionsQuery: 'Thanjavur New Bus Stand, Thanjavur, Tamil Nadu',
          /** Centered on New Bus Stand so the pin stays clear of the bottom-left card */
          embedSrc:
            'https://www.google.com/maps?q=Thanjavur+New+Bus+Stand,+Thanjavur&ll=10.7501,79.1124&z=14&hl=en&output=embed',
          card: {
            src: '/assets/thanjavur/10-by-road.jpg',
            title: 'Thanjavur New Bus Stand',
            region: 'Tamil Nadu',
          },
          markers: [
            {
              id: 'bus-stand',
              lat: 10.7501,
              lng: 79.1124,
              title: 'Thanjavur New Bus Stand',
              kind: 'bus' as const,
            },
          ],
        },
      },
    ],
  },

  stay: {
    id: 'accommodations',
    chapterLabel: '03',
    eyebrow: 'Stay',
    title: 'Accommodations',
    body: 'Visitors to **Thanjavur** can find accommodations at hotels and private residences through services like [AirBnB](https://www.airbnb.com/).',
    options: [
      {
        id: 'hotels',
        title: 'Hotels',
        body: 'Find accommodations at hotels in **Thanjavur**.',
      },
      {
        id: 'residences',
        title: 'Private Residences',
        body: 'Explore private residences through services like AirBnB.',
      },
    ],
    cta: {
      label: 'Explore nearby stays',
      href: 'https://www.google.com/search?q=hotels+near+Brihadishwara+Temple+Thanjavur',
    },
    image: {
      src: '/assets/thanjavur/14-stay-temple.jpg?v=2',
      alt: 'Hotel room in Thanjavur with a window view of Brihadishwara Temple',
      note: 'Image is for visual reference only.',
      objectPosition: '58% 42%',
    },
  },

  resources: {
    id: 'additional-resources',
    chapterLabel: '04',
    eyebrow: 'Plan ahead',
    title: 'Additional Resources',
    lead:
      'Learn more about visiting Thanjavur\u2019s cultural and environmental tourism sites through:',
    links: [
      {
        id: 'tn-tourism',
        label: 'Tamil Nadu Tourism Board',
        href: 'https://www.tamilnadutourism.tn.gov.in/destinations/thanjavur',
      },
      {
        id: 'thanjavur-tourism',
        label: 'Thanjavur Tourism Council',
        href: 'https://thanjavurtourism.org',
      },
    ],
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'History, architecture, art, and living worship: more ways to know the **Brihadishwara Temple** before or after your visit to the city.',
  },

  contentsStages: [
    {
      id: 'stage-thanjavur',
      label: 'Thanjavur and its Environs',
      items: [
        { id: 'intro', label: 'Introduction' },
        { id: 'major-attractions', label: 'Major Attractions' },
        { id: 'palaces-museums', label: 'Explore Palaces & Museums' },
        { id: 'culture-crafts', label: 'Discover Culture & Crafts' },
        { id: 'other-attractions', label: 'More to Explore' },
        { id: 'how-to-get-here', label: 'How To Get Here' },
        { id: 'accommodations', label: 'Accommodations' },
        { id: 'additional-resources', label: 'Additional Resources' },
        { id: 'continue', label: 'Continue Exploring' },
      ],
    },
  ],
}
