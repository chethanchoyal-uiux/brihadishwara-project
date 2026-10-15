export const templePage = {
  hero: {
    eyebrow: "chola's masterpiece",
    title: 'The Temple',
    lead:
      'A **216-foot vimana** of interlocking granite: design, construction, and the spirit of **Dakshina Kailasam**.',
    image: '/assets/temple/hero-temple-desktop.jpg?v=1',
    imageMobile: '/assets/temple/hero-temple-side.jpg?v=3',
    cta: 'Continue reading',
    ctaHref: '#intro',
  },

  intro: {
    id: 'intro',
    eyebrow: 'about',
    title: 'A temple built for faith, not empire',
    lead:
      'The **Cholas** poured skill and stone into sacred architecture. **Brihadishwara** remains their most enduring work: towering, interlocking granite, still alive with worship.',
    image: {
      src: '/assets/temple/01-temple-side.jpg',
      alt: 'Side view of the Brihadishwara Temple vimana and complex',
      caption: 'The Brihadishwara Temple',
    },
    blocks: [
      {
        title: 'Marvel of engineering',
        body: 'The **Brihadishwara Temple** is a prime example of Chola architecture, characterized by its towering **vimana** (temple tower) and intricate sculptural embellishments. The temple\'s vimana, soaring to a height of **216’**, remains one of the tallest structures of its kind in the world. It is a marvel of engineering, constructed without the use of any binding materials, relying solely on the precise interlocking of its granite stones.',
      },
      {
        title: 'The original Chola core',
        body: 'The original Chola built structures of this **11th-century temple** included two **gopura** (gateways), the main temple with its massive Vimana, and colonnaded outer cloister, all embellished with inscriptions, frescoes, and sculptures.',
      },
      {
        title: 'Centuries of addition',
        body: 'In the centuries that followed, the temple was expanded and added to by subsequent rulers and dynasties, including the **Pandyas**, the **Nayakas** and the **Marathas**, and now stands amidst fortified walls that were added **after the 16th century**. French and British administrators later made use of the temple as an arsenal and barracks for their soldiers.',
      },
      {
        title: 'A living shrine',
        body: 'Despite all these secular and military uses, the temple with its colossal main deity, the **Lingam** (representing Lord Shiva), still serves today as a fully functional religious institution, a living tribute to **Rajaraja Chola**’s reverence and spirituality.',
      },
      {
        title: 'Faith over palaces',
        body: 'An interesting fact about the **Cholas** is that they did not place emphasis on buildings for secular purposes. They did not expend material wealth or manpower in building lasting palaces or private residences but instead put these resources into building magnificent temples inspired by their strong sense of faith and desire to glorify their religious beliefs. While many of their **granite temples** survive intact to present time, only the ruins of limestone royal dwellings have ever been discovered.',
      },
    ],
  },

  designInfluence: {
    id: 'design-influence',
    eyebrow: 'inspiration',
    title: 'Design Influence',
    lead:
      'Inspired by **Pallava temples** and **Mount Kailash**, **Rajaraja Chola** set out to build a temple for Shiva that would stand among the great sacred works of South India.',
    highlights: [
      { label: 'Patron', value: 'Rajaraja Chola' },
      { label: 'Century', value: '11th century CE' },
      { label: 'City', value: 'Thanjavur' },
      { label: 'Model', value: 'Mount Kailash' },
    ],
    sections: [
      {
        title: 'Pallava Inspiration',
        paragraphs: [
          'When **Rajaraja Chola** visited some of the great South Indian temples built by the Pallava king **Rajasimha**, he was struck by their majestic beauty and decided to build a similarly large and magnificent temple dedicated to **Lord Shiva** in his capital city of **Thanjavur**.',
          'Accordingly, he commissioned the Brihadishwara Temple under his royal patronage **in the 11th century CE**.',
        ],
      },
      {
        title: 'Spiritual Guidance from Kasi',
        paragraphs: [
          'An ardent devotee of Lord Shiva, Rajaraja was said to have brought **Eshana Sarvasiva** pandits (learned men and priests who were eminent in the **Pasupada Shaiva way of worship**) from **Kasi** (present day Benares) to Thanjavur.',
        ],
      },
      {
        title: 'Modeled on Mount Kailash',
        paragraphs: [
          'It is believed that Rajaraja used the outline of **Mount Kailash** (the holy abode of Lord Shiva) as the basis for the design of the Brihadishwara temple’s profile.',
        ],
        image: {
          src: '/assets/temple/02-mt-kailash.jpg?v=4',
          alt: 'Mount Kailash, the holy abode of Lord Shiva',
          caption: 'Mount Kailash',
        },
      },
    ],
    kailashFacts: {
      title: 'Dakshina Kailasam',
      paragraphs: [
        'The **hemispherical projected relief work** on the eastern face of the Vimana is a replica of Mount Kailash and is referred to as **Dakshina Kailasam** (Southern Kailash) and the **shikara** (top) of the Vimana as **Dakshina Meru** (Southern Meru). Both were originally covered with **gold plate**.',
      ],
      image: {
        src: '/assets/temple/03-temple-relief.jpg',
        alt: 'Dakshina Kailasam relief on the eastern face of the vimana',
        caption: 'hemispherical projected relief work',
      },
    },
    influencesLead: 'Other key sources of architectural influence',
    influences: [
      {
        label: 'Shore Temple',
        detail:
          'Pallava style at **Mahabalipuram**; Rajaraja incorporated many elements, such as pillar styles, into Brihadishwara.',
      },
      {
        label: 'Kailasanathar',
        detail:
          'The Pallava temple in **Kanchipuram**, another source of architectural elements for Brihadishwara.',
      },
      {
        label: 'Mahabodhi',
        detail:
          'Its **180-foot-tall** pyramidal tower at **Bodh Gaya**; this Buddhist style is reflected in the Brihadishwara **Vimana**.',
      },
    ],
  },

  planning: {
    id: 'planning',
    eyebrow: 'construction',
    title: 'Planning and Construction\nof the Temple',
    lead:
      'From site selection to consecration, Brihadishwara was planned with extraordinary care, then raised in granite over just **seven years**.',
    highlights: [
      { label: 'Site', value: 'Siriya Kottai' },
      { label: 'Architect', value: 'Kunjaramallan' },
      { label: 'Built', value: '1003 to 1010 CE' },
      { label: 'Stone', value: '130,000 tons' },
    ],
    site: {
      title: 'Choosing the Site',
      paragraphs: [
        'Rajaraja selected a site in Thanjavur called **Siriya Kottai** (Small Fort) for the construction of the temple. This raised area of land was ideal as it afforded adequate open space for the envisioned large temple, provided a strong **laterite** base and had water sources nearby.',
      ],
      bullets: [
        'Open space for the envisioned large temple',
        'A strong **laterite** base',
        'Water sources nearby',
      ],
      image: {
        src: '/assets/temple/04-siriya-kottai.jpg',
        alt: 'Siriya Kottai, the site chosen for the temple',
        caption: 'Siriya Kottai (Small Fort)',
      },
    },
    architects: {
      title: 'The Master Architects',
      paragraphs: [
        'Rajaraja commissioned **Kunjaramallan** to be the master architect (**sthapati**) to design and build the Brihadishwara temple. Kunjaramallan was a legendary figure, whose engineering expertise is credited with creating this lasting architectural marvel in the **Kaveri delta\'s** soft soil.',
        'Rajaraja was so pleased with his work that he gave him the title of **Rajaraja Perunthachan** and had his name inscribed as such on the temple walls. Other architects who contributed to the temple design include **Kandaraditta Perunthachan** and **Nithavinoda Perunthachan**.',
      ],
      bullets: [
        '**Rajaraja Perunthachan** (title given to Kunjaramallan)',
        '**Kandaraditta Perunthachan**',
        '**Nithavinoda Perunthachan**',
      ],
      pullQuote:
        'Kunjaramallan\'s name was inscribed on the temple walls as Rajaraja Perunthachan.',
    },
    timeline: {
      title: 'Seven Years of Planning',
      paragraphs: [
        'The temple\'s construction is believed to have taken a mere **seven years**, **from 1003 CE to 1010 CE**, a feat accomplished by meticulous advance planning.',
        'Rajaraja had the temple plan, material sourcing, labor and every small detail sorted out ahead of time such that he was able to finish this spectacular architectural marvel in such a short time span.',
      ],
      pullQuote: 'Finished in seven years through meticulous advance planning.',
      image: {
        src: '/assets/temple/05-aerial-view.jpg?v=3',
        alt: 'Aerial view of the Brihadishwara Temple complex',
        caption: 'spectacular architectural marvel',
      },
    },
    workforce: {
      title: 'Workforce and Leadership',
      paragraphs: [
        'Rajaraja employed a vast workforce of skilled artisans, sculptors, and craftsmen who worked simultaneously to finish this huge and ornate temple in just seven years.',
      ],
      bullets: [
        'Outer corridor work: army chief **Krishna Raman Mummudichola Brahmadirajan**',
        'Inner temple structures: **Kunjaramallan**, the Sthapati',
        'Planning and supervision: **Karuvur Siddhar**, Rajaraja\'s mentor and spiritual guru',
        'Kingdom affairs: Crown Prince **Rajendra**, so his father could focus on the temple',
      ],
    },
    materials: {
      title: 'Granite from Pudukkottai',
      paragraphs: [
        '**130,000 tons** of granite that were used to build the temple were carefully selected and sourced from the famed granite quarries of **Pudukkottai**, approximately **62 km** from Thanjavur.',
        'It is speculated that the Cholas used low, wheeled carts drawn by elephants to bring large stones to Thanjavur, where they were dressed and then carved to create the temple\'s intricate structure.',
      ],
      highlights: [
        { label: 'Stone', value: '130,000 tons' },
        { label: 'Distance', value: '62 km' },
        { label: 'Source', value: 'Pudukkottai' },
        { label: 'Haul', value: 'Elephant carts' },
      ],
      pullQuote:
        'Dressed and carved on site from granite hauled across the Kaveri delta.',
      image: {
        src: '/assets/temple/06-ornate-temple.jpg',
        alt: 'Ornate architectural detail of the Brihadishwara Temple',
        caption: 'huge and ornate temple',
      },
    },
    funding: {
      title: 'Funding and Community',
      paragraphs: [
        'Rajaraja undertook the major part of the expense for building the temple, with funds coming from his various conquests. Other members of the royal family such as his sister **Kundavai**, courtiers, merchants and even the common people donated funds and labor for the temple’s construction.',
        'All these donations were recorded in the **inscriptions** that cover the walls of the temple. Skilled craftsmen, sculptors and carpenters contributed their time, often living at the temple site for several months or even years at a time. The townspeople fed and housed them and even laundered their clothes!',
      ],
      bullets: [
        'Sister **Kundavai** and other royals among the donors',
        'One hairdresser stayed for **6 years** and took care of workers’ needs; Rajaraja in appreciation called him **Rajaraja Perum Navidan**',
      ],
      pullQuote:
        'Consecrated on Saturday, April 22nd, 1010, in the month of Chitra, under the auspices of the Punarvasu star.',
    },
    featuresLead: 'Ingenious construction features include:',
    features: [
      {
        title: 'Height, Stability and Foundation',
        body: 'The temple is renowned for its remarkable architecture, characterized by its towering **vimana** (temple tower) that is still one of the tallest of its kind in the world. The foundation supporting the **216-foot Vimana** is only **5.5-foot deep**, but the construction is such that the tower, built without mortar or concrete, has withstood at least **6 known major earthquakes** (1807, 1816, 1864, 1866, and 1900) and has not shifted or inclined a single degree in over **1000 years**.',
        stat: '216 ft',
        statLabel: 'Vimana height',
        image: {
          src: '/assets/temple/07-towering-vimana.jpg',
          alt: 'The towering 216-foot vimana of the Brihadishwara Temple',
          caption: 'towering vimana',
        },
      },
      {
        title: '80-ton Capstone',
        body: 'The Vimana is topped with a flat single-piece granite **capstone** and sectional dome that together are said to weigh approximately **80 tons**. They were raised to the top of the 216-foot tower without modern cranes. Historians conjecture that a **4-mile-long mud ramp** was constructed to drag the stone up to the top of the tower.',
        stat: '4 mi',
        statLabel: 'Mud ramp',
        image: {
          src: '/assets/temple/capstone-shikara.png?v=2',
          alt: 'Capstone and shikhara crowning the vimana',
        },
      },
      {
        title: 'Precise Alignment',
        body: 'The temple is constructed in a precise square that is aligned to the position of the sun showcasing the Chola’s superior understanding of **solar positioning**. While many sources say that the shadow of the vimana never falls on the ground at noon at any time of the year, this has been proven to be a myth.',
        stat: 'Solar',
        statLabel: 'Square alignment',
        image: {
          src: '/assets/temple/08-precise-square.png?v=4',
          alt: 'Diagram of the temple’s precise square solar alignment',
          caption: 'precise square',
        },
      },
      {
        title: 'Huge Shiva Lingam',
        body: 'The primary deity, a **Shiva Lingam** (abstract representation of Shiva) made of black granite from **Jabalpur**, **1,100 miles** from Thanjavur. It consists of a base, **54-foot** in circumference and **13-foot tall** monolithic cylindrical Lingam on top.',
        stat: '13 ft',
        statLabel: 'Lingam height',
        image: {
          src: '/assets/temple/09-shivalingam.jpg?v=2',
          alt: 'The monolithic Shiva Lingam in the sanctum',
          caption: 'Shiva Lingam',
        },
      },
      {
        title: 'Water Management System',
        body: 'The temple incorporates an integrated water management system that is designed to harvest rainwater from multiple locations such as the temple roofs and courtyard, and channel it through carved stone gutters and rainspouts and stored for use in temple rituals. Rainwater was also diverted to the nearby **Shivaganga Kulam** (tank/pond) for use by the entire town. The temple’s **1000-year-old** water management system is still functional today, providing fresh water for temple activities and thousands of visitors.',
        stat: '1000 years',
        statLabel: 'Still in use',
        image: {
          src: '/assets/temple/10-wet-temple.jpg?v=3',
          alt: 'Temple architecture showing water channels and wet stone surfaces',
          caption: 'water management system',
        },
      },
    ],
  },

  living: {
    id: 'living',
    eyebrow: 'living temple',
    title: 'A Living Evolving Temple',
    paragraphs: [
      'While the Brihadishwara Temple has withstood the test of time amazingly well for over **1000 years**, it has gone through a number of enhancements, as well as repair and restoration work. Even today, there is ongoing preservation work in small areas of the temple, undertaken so that devotees and admirers may continue to worship and view this architectural marvel for many millennia to come.',
      'The Brihadishwara Temple was declared a **UNESCO World Heritage Site in 1987**, in recognition of its outstanding universal value and cultural significance.',
    ],
  },

  evolution: {
    id: 'evolution',
    eyebrow: 'evolution',
    title: 'Evolution of the Temple Structures',
    lead:
      'The Brihadishwara temple complex evolved over **900 years** with several dynasties adding shrines and other structures to the original **Chola buildings** and renovating others.',
    dynasties: [
      {
        name: 'Cholas',
        materials: 'granite construction',
        items: [
          'Chandikeskwara shrine',
          'Main **Vimana** and **Garbagriha** (sanctum sanctorum), **Antrala** and platform under the **Maha Mandapam** and **Mukha Mandapam**',
          '**Keralathanka Tiruvasal** and **Rajarajan Tiruvasal** (two inner gateways)',
          '**Thiruchutra Maligai** (Outer colonnaded cloister)',
        ],
      },
      {
        name: 'Pandyas',
        materials: 'granite construction',
        items: ['Amman Shrine'],
      },
      {
        name: 'Nayakas',
        materials: 'granite and limestone construction',
        items: [
          '**Maha Mandapam** and **Mukha Mandapam** (halls leading to the main sanctum) — built on Chola platform',
          'Amman Shrine',
          'Subrahmanya Shrine',
          '**Nandi Mandapam** with monolithic Nandi statue',
        ],
      },
      {
        name: 'Marathas',
        materials: 'brick, plaster and mortar, and granite construction',
        items: [
          '**Maratha Tiruvasal** (outermost gateway)',
          '**Karuvur Siddhar Mandapam**',
          'Ganapathi Shrine (original structure was damaged by the British **in 1771–1798**, renovated by Marathas)',
          'Vaulted roofed building on the southern side of the temple complex (presently Interpretation Center/museum)',
          '**Nataraja Mandapam**',
        ],
      },
      {
        name: 'French Military',
        materials: '',
        items: ['Defensive outer wall with gun emplacements'],
      },
    ],
  },

  repair: {
    id: 'repair',
    eyebrow: 'stewardship',
    title: 'Repair and Restoration',
    lead:
      'The Brihadishwara Temple has suffered damage over centuries from wars, natural elements like lightning, and general wear.',
    items: [
      {
        title: 'Historical Conflicts',
        body: 'Raids and wars between Muslim Sultans and Hindu kings caused damage to parts of the temple that were rebuilt or repaired by subsequent Hindu dynasties that gained control over **Thanjavur**.',
      },
      {
        title: 'Colonial Period Damage',
        body: 'The **French troops** misused the temple by turning it into an arsenal and military fort, stationing troops inside **around 1756** and adding high defensive walls with gun-holes, damaging its outer structures. The **British East India Company** further damaged the temple **in 1800** by using it as a fortress and encampment with target practice, leaving bullet holes visible today. **In 1836**, they dismantled parts of the outer walls and **mandapams** (pavilions) to build the **Lower Anaicut** dam, destroying many inscriptions.',
      },
      {
        title: 'Natural Elements: Lightning Strikes',
        body: '**A lightning strike in 2010** damaged the **kalasam** (finial) on the **Rajarajan Tiruvasal** entrance gopuram, breaking brick and lime mortar.',
      },
      {
        title: 'Erosion & Wear',
        body: 'Over centuries, natural wear caused unevenness in the brick flooring, leading to recent repair works by the **Archaeological Survey of India (ASI) in 2024**.',
        note: 'It should be noted that none of the repair or restoration efforts have compromised or changed the basic construction of the main temple. The temple including the **vimana** are still exactly as built by the **Cholas** and no structural enhancements have been made to these **1000-year-old** structures or its foundation.',
      },
    ],
  },

  conservation: {
    id: 'conservation',
    eyebrow: 'conservation',
    title: 'Conservation',
    lead:
      'The temple, as it stands today, has been preserved due to restoration work undertaken by the **Nayakas** and the **Marathas** and the current stewards of the temple, the **Archaeological Survey of India (ASI)**.',
    highlights: [
      { label: 'Steward', value: 'ASI' },
      { label: 'Approach', value: 'Traditional methods' },
      { label: 'Recent work', value: '2024 flooring' },
      { label: 'Principle', value: 'Protect originals' },
    ],
    sections: [
      {
        title: 'Stewards Across Centuries',
        paragraphs: [
          'The temple, as it stands today, has been preserved due to restoration work undertaken by the **Nayakas** and the **Marathas** and the current stewards of the temple, the **Archaeological Survey of India (ASI)**.',
        ],
        bullets: [
          '**Nayaka**-period repairs and additions',
          '**Maratha restoration** and stewardship',
          '**ASI** as the current conserving authority',
        ],
      },
      {
        title: 'Ongoing ASI Work',
        paragraphs: [
          'Ongoing conservation by **ASI** involves careful restoration using traditional methods and materials, minimizing impediments to public access to the temple and daily worship.',
          'In addition, ASI continuously works on repairs, like the **2024 project** to replace eroded bricks in the flooring with new bricks and **lime mortar**.',
        ],
        bullets: [
          'Traditional methods and materials',
          'Minimizing impediments to public access and daily worship',
          '**2024 project**: eroded flooring bricks replaced with new bricks and **lime mortar**',
        ],
        pullQuote:
          'Conservation continues without closing the living temple to worship.',
      },
      {
        title: 'Ethics of Restraint',
        paragraphs: [
          'Conservation ethics emphasize that it may be necessary to leave certain damaged areas untouched if repair or restoration work risks damaging original material.',
          'This principle has been followed in conserving or restoring the Brihadishwara temple, as seen with work done to preserve delicate paintings.',
        ],
        pullQuote:
          'If repair risks the original, the damaged area may be left untouched.',
      },
    ],
  },

  looting: {
    id: 'looting',
    eyebrow: 'heritage at risk',
    title: 'Looting and Theft',
    lead:
      'The Brihadishwara Temple has a long history of being subjected to looting and theft of idols across various historical periods.',
    items: [
      {
        title: 'Medieval Invasions',
        body: 'The upper-most sections of the temple\'s **vimana** (tower) were once gold-plated, but this gold was reportedly looted during the invasion by **Malik Kafur in the 14th century**.',
      },
      {
        title: 'Idol Smuggling (20th Century)',
        body: 'In more recent history, numerous valuable **bronze idols** have been stolen from the temple complex and other nearby temples in the **Thanjavur district**, often ending up in international art markets.',
      },
    ],
  },

  kamakshi: {
    id: 'kamakshi-bai',
    eyebrow: 'preservation',
    title: 'Maharani Kamakshi Bai’s Efforts to Preserve Thanjavur History',
    lead:
      'Note must be made here of the incredible efforts made by Maharani **Kamakshi Bai**, wife of the last Thanjavur Maratha king.',
    image: {
      src: '/assets/temple/11-kamakshi-bai.jpg',
      alt: 'Portrait of Maharani Kamakshi Bai',
      caption: 'Maharani Kamakshi Bai',
    },
    sections: [
      {
        title: 'A Case Against the Company',
        paragraphs: [
          '**Kamakshi Bai** filed a case in the British courts against the British **East India Company** to prevent the looting of the **Thanjavur Saraswathi Mahal library** and other private properties belonging to the late Maharajah.',
          'She won the case and secured possession of immovable properties. Unfortunately, some movable property (jewels and artifacts) were not returned by the British East India Company who claimed that these treasures were gifted to **Queen Victoria** and therefore not returnable.',
        ],
        bullets: [
          '**Immovable properties** secured in her possession',
          'Jewels and artifacts claimed as gifts to **Queen Victoria** and not returned',
          'A significant victory for Maharani **Kamakshi Bai** and for all of **Thanjavur**',
        ],
        pullQuote:
          'She won the case and secured possession of immovable properties, even when jewels and artifacts were denied return.',
      },
      {
        title: 'Saraswathi Mahal Library',
        paragraphs: [
          'Even so, this was a significant victory for not only Maharani Kamakshi Bai, but for all of Thanjavur, as the **Saraswathi Mahal Library** is one of the oldest libraries in India with a collection of over **49,000 volumes** of palm leaf and paper manuscripts written in **Tamil and Sanskrit**.',
          'These rare and precious documents provide a unique and important view of the history of the Brihadishwara temple among other significant events of the time.',
        ],
        bullets: [
          'Over **49,000 volumes** in the collection',
          'Palm leaf and paper manuscripts',
          'Written in **Tamil** and **Sanskrit**',
          'A unique and important view of Brihadishwara temple history',
        ],
      },
    ],
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'History, a walking plan, art, and living worship: more ways to know **Brihadishwara** beyond the temple’s fabric.',
  },

  /** Floating Contents nav — major sections in page order */
  contents: [
    { id: 'intro', label: 'About the Temple' },
    { id: 'design-influence', label: 'Design Influence' },
    { id: 'planning', label: 'Planning & Construction' },
    { id: 'living', label: 'A Living Temple' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'repair', label: 'Repair & Restoration' },
    { id: 'conservation', label: 'Conservation' },
    { id: 'looting', label: 'Looting & Theft' },
    { id: 'kamakshi-bai', label: 'Kamakshi Bai' },
    { id: 'continue', label: 'Continue Exploring' },
  ],
}
