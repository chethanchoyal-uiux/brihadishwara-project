/** History page — writeup §2. Client wording preserved; structure is presentation only. */

export type HistoryBlock = {
  heading?: string
  body?: string
  paragraphs?: string[]
}

export type HistoryTimelineEra = {
  id: string
  reign: string
  name: string
  side: 'text-left' | 'text-right'
  blocks: HistoryBlock[]
  media?: HistoryMedia
  /** Superscript note mark on the dynasty name (e.g. "1"). */
  noteMark?: string
}

export type HistoryPlaceholder = {
  kind: 'placeholder'
  label: string
  aspect?: 'portrait' | 'landscape' | 'square'
}

export type HistoryImage = {
  kind: 'image'
  src: string
  alt: string
  caption?: string
  title?: string
  credit?: string
}

export type HistoryMedia = HistoryPlaceholder | HistoryImage

export type HistoryHighlight = {
  label: string
  value: string
}

export const historyPage = {
  hero: {
    eyebrow: 'from dynasty to devotion',
    title: 'History',
    lead:
      'From early **Tamil dynasties** to **Rajaraja Chola I**: the rulers, conquests, and care that shaped **Brihadishwara**.',
    image: '/assets/history/hero-history.jpg?v=3',
    cta: 'Begin the journey',
    ctaHref: '#dynasties',
  },

  prologue: {
    id: 'prologue',
    eyebrow: 'from paleolithic times to medieval dynasties',
    title: 'A land shaped by dynasties',
    /** Introductory blocks — opens toward Dynasties of Influence. */
    body: [
      '**In Medieval times (8th–13th century CE)** the history of **Southern India** was dominated by powerful dynasties like the **Cheras**, **Cholas**, and **Pandyas** who vied for control over the region.',
    ],
    highlights: [] as HistoryHighlight[],
    note:
      'Each of these dynasties contributed significantly to South Indian culture, trade, and architecture, especially temple building, and shaped South India\'s distinctive cultural, linguistic, and architectural landscape for centuries to come.',
  },

  dynasties: {
    id: 'dynasties',
    eyebrow: 'who shaped the temple',
    title: 'Dynasties of influence',
    lead:
      'While the Imperial Cholas, particularly **Rajaraja Chola I** and his son **Rajendra Chola I** were primarily responsible for the building of the Brihadishwara temple in **Thanjavur**, there were many other dynasties that had a great influence on the temple and its history as presented below.',
    eras: [
      {
        id: 'pallavas',
        name: 'Pallavas',
        reign: '275 – 897 CE',
        side: 'text-left' as const,
        media: {
          kind: 'image' as const,
          src: '/assets/history/pallava-flag.jpg',
          alt: 'Pallava dynasty flag with a golden lion on a maroon swallowtail banner',
          title: 'Pallava flag',
          caption: 'Lion emblem of the Pallavas',
        },
        blocks: [
          {
            heading: 'Territory',
            body: 'Ruled a significant portion of the central **South Indian** peninsula (present day Southern **Andhra Pradesh** and northern **Tamil Nadu**).',
          },
          {
            heading: 'Architecture',
            body: 'Noted for introduction of excavation rock-cut temples, carving of monolithic temples and bas-relief sculptures and construction of structural temples in stone.',
          },
          {
            heading: 'Script & inscriptions',
            body: 'Developed the **Pallava script**, leading to **Chola-Pallava**, **Tamil** and **Grantha**, used in the temple inscriptions.',
          },
        ],
      },
      {
        id: 'pandyas',
        name: 'Pandyas',
        reign: '4th–3rd c. BCE – 13th–14th c. CE',
        noteMark: '1',
        side: 'text-right' as const,
        media: {
          kind: 'image' as const,
          src: '/assets/history/pandya-flag.jpg',
          alt: 'Pandya dynasty flag with twin fish on a yellow swallowtail banner',
          title: 'Pandya flag',
          caption: 'Twin fish emblem of the Pandyas',
        },
        blocks: [
          {
            heading: 'Imperial periods',
            body: 'Two periods of imperial dominance before and after the **Chola period**.',
          },
          {
            body: 'Celebrated in the earliest available Tamil poetry.',
          },
        ],
      },
      {
        id: 'cheras',
        name: 'Cheras',
        reign: '3rd c. BCE – 5th c. CE',
        noteMark: '1',
        side: 'text-left' as const,
        media: {
          kind: 'image' as const,
          src: '/assets/history/chera-flag.jpg',
          alt: 'Chera dynasty flag with a bow and arrow on a yellow swallowtail banner',
          title: 'Chera flag',
          caption: 'Bow and arrow emblem of the Cheras',
        },
        blocks: [
          {
            heading: 'Territory',
            body: 'Ruled western portions of South India (present day **Keralam**).',
          },
          {
            heading: 'Trade',
            body: 'Renowned for trade in spices and iron and early steel works.',
          },
        ],
      },
      {
        id: 'cholas-era',
        name: 'Cholas',
        reign: 'Early · Imperial · Later',
        noteMark: '1',
        side: 'text-right' as const,
        isCholaPeriods: true,
        media: {
          kind: 'image' as const,
          src: '/assets/history/chola-flag.jpg',
          alt: 'Chola dynasty flag with a tiger on a red swallowtail banner',
          title: 'Chola flag',
          caption: 'Tiger emblem of the Cholas',
        },
        periods: [
          {
            id: 'early-cholas',
            title: 'Early',
            reign: '600 BCE – 300 CE',
            body: '**Early Cholas (600 BCE – 300 CE)**.',
          },
          {
            id: 'imperial-cholas',
            title: 'Imperial',
            reign: '848 CE – 1070 CE',
            body: '**Imperial Cholas (848 CE – 1070 CE)**.',
          },
          {
            id: 'later-cholas',
            title: 'Later',
            reign: '1070 – 1279 CE',
            body: '**Later Cholas (1070-1279 CE)**.',
          },
        ],
        blocks: [],
      },
      {
        id: 'vijayanagara',
        name: 'Vijayanagara Empire',
        reign: '1365 – 1532 CE',
        side: 'text-left' as const,
        media: {
          kind: 'placeholder' as const,
          label: 'Vijayanagara rule in Thanjavur',
          aspect: 'landscape' as const,
        },
        blocks: [
          {
            heading: 'Control of Thanjavur',
            body: 'Following the decline of Pandya rule, Vijayanagara forces gained control of **Thanjavur** between **1365 and 1371 CE**.',
          },
          {
            heading: 'Feudatory state',
            body: 'In **1532 CE**, Emperor **Achyuta Deva Raya** authorized his governor, **Sevappa Nayak**, to establish a semi-autonomous feudatory state, which later became known as the **Thanjavur Nayak** dynasty.',
          },
        ],
      },
      {
        id: 'nayakas',
        name: 'Thanjavur Nayakas',
        reign: '1572 – 1673',
        side: 'text-right' as const,
        media: {
          kind: 'placeholder' as const,
          label: 'Nayaka shrines and art at Brihadishwara',
          aspect: 'landscape' as const,
        },
        blocks: [
          {
            heading: 'After Vijayanagara',
            body: 'Group of South Indian dynasties emerging after the fall of **Vijayanagara**.',
          },
          {
            heading: 'Literature & music',
            body: 'Promoted Tamil and Telugu literature, and music.',
          },
          {
            heading: 'Temple contribution',
            body: 'Contributed significantly to post Chola shrines and art in the Brihadishwara temple.',
          },
          {
            heading: 'Other temples',
            body: 'Built several other significant temples.',
          },
        ],
      },
      {
        id: 'marathas',
        name: 'Thanjavur Marathas',
        reign: '1674 – 1855',
        side: 'text-left' as const,
        media: {
          kind: 'placeholder' as const,
          label: 'Maratha gateway and temple additions',
          aspect: 'landscape' as const,
        },
        blocks: [
          {
            heading: 'Expansion',
            body: 'Expanded from the west, challenging **Mughal** and other regional powers.',
          },
          {
            heading: 'Bhonsle rule',
            body: 'The Thanjavur Maratha kingdom (a principality of Tamil Nadu) was ruled by the **Bhonsle dynasty**.',
          },
          {
            heading: 'Temple additions',
            body: 'Added outer gateway and several shrines to the Brihadishwara temple complex.',
          },
        ],
      },
    ],
    /** Shared note for Pandyas¹ / Cheras¹ / Cholas¹ — opened from Cholas underline CTA. */
    footnoteTitle: 'Tamilakam',
    footnoteCta: 'About the three great dynasties',
    footnote:
      'The three great dynasties, **Cheras**, **Cholas** and **Pandyas**, played a dominant role in shaping **Tamilakam** (the ancient Tamil country), in Southern India. While they frequently waged war against each other and shifted political and military dominance, these dynasties created an early integrated identity for South Indian people through language, culture and architecture.',
  },

  chola: {
    id: 'chola-dynasty',
    eyebrow: 'chapter one',
    title: 'The Chola Dynasty',
    chapterLabel: '01',
    accomplishments: {
      id: 'accomplishments',
      title: 'Accomplishments',
    },
    topics: [
      {
        id: 'chola-origins',
        year: '3rd c. BCE – 871 CE',
        title: 'Early Cholas',
        blocks: [
          {
            paragraphs: [
              'The mighty and powerful Chola dynasty was one of the longest-ruling dynasties in Southern Indian history and ruled from the **3rd c. BCE to the end of the 13th c. CE**.',
            ],
          },
          {
            paragraphs: [
              'The **Sangam Cholas** were an ancient Tamil dynasty that flourished in the fertile **Kaveri delta** between approximately **600 BCE and 300 CE**. With **Uraiyur** as their early capital, they developed agriculture, irrigation and maritime trade.',
              '**Karikala Chola**, their most celebrated ruler, defeated the **Cheras** and **Pandyas** at the **Battle of Venni** and is traditionally credited with constructing the **Grand Anicut** dam. Another notable ruler, **Kocengannan**, is remembered in Sangam poetry and later Shaivite literature.',
              'Founded by **Vijayalaya Chola (r. 848 – 871 CE)**, the Chola dynasty reached its zenith under **Rajaraja I (r. 985–1014)** and his son **Rajendra I (r. 1014–44 CE)**.',
              'They expanded the empire through both land and sea conquests, creating a vast sphere of influence in the region surrounding the Bay of Bengal.',
            ],
          },
        ],
        note: '**r.** = Reigned — the years indicate the period of the ruler’s reign.',
      },
      {
        id: 'chola-empire',
        year: '985 – 1014 CE',
        title: 'From a small kingdom to an empire',
        mediaSide: 'end' as const,
        blocks: [
          {
            paragraphs: [
              'When **Rajaraja I** came to power, he took control of a kingdom in northern **Tamil Nadu** centered around the **Thanjavur region**, comprising of coastal **Chola mandalam** and **Tondaimandalam**.',
              'He transformed this kingdom into a well-organized empire with a powerful army and navy that enabled him to expand his kingdom to include the entire southern portion of the south Indian peninsula, parts of central India, as well as northern **Sri Lanka**.',
            ],
          },
        ],
        media: {
          kind: 'image' as const,
          src: '/assets/history/chola-empire-map.svg',
          alt: 'Map of the Chola Empire at its greatest extent',
          title: 'Chola Empire map',
        },
      },
      {
        id: 'chola-seas',
        year: '1014 – 1044 CE',
        title: 'Rajendra I and the seas',
        blocks: [
          {
            paragraphs: [
              'His son, **Rajendra I** extended the reach of the kingdom up to the River **Ganges** in the north',
              'and through sea voyages later Cholas invaded parts of present-day **Sri Lanka**, **Maldives**, **Malaysia**, **Indonesia** and **Southern Thailand**.',
            ],
          },
        ],
      },
      {
        id: 'later-cholas',
        year: '1070 – 1279 CE',
        title: 'Later Cholas',
        blocks: [
          {
            paragraphs: [
              'During the Later Chola rule, the kingdom initially flourished under **Kulothunga Chola I**, his son **Vikrama Chola**, other successors like **Rajaraja Chola II**, **Rajadhiraja Chola II**, and **Kulothunga Chola III**.',
              'With the lack of direct heirs and wars with **Chalukyas of Kalyana**, the Cholas rule fell into decline in the **late 13th century**.',
            ],
          },
        ],
      },
      {
        id: 'temples-frescoes',
        title: 'Temples and frescoes (1)',
        blocks: [
          {
            paragraphs: [
              'During times of peace, the Chola emperors were famed as patrons of arts and architecture and encouraged trade to thrive in their kingdom.',
            ],
          },
          {
            heading: 'Dravidian temples',
            paragraphs: [
              'Chola rulers built many famous **Dravidian style temples** including those at **Thanjavur**, **Gangaikondacholapuram** and **Darasuram** which are all **UNESCO Heritage sites**.',
              'Vibrant murals and frescos dating from the Chola period still grace the walls and ceilings, and granite and sandstone sculptures adorn the interiors and exteriors of these temples giving viewers today an incredible window into the skill and talent of artists from a millennium and more ago.',
            ],
          },
        ],
      },
      {
        id: 'learning',
        title: 'Learning and Vedic colleges (2)',
        blocks: [
          {
            paragraphs: [
              'The Chola kings were great patrons of learning, establishing **Vedic colleges** to support education where teachings included not only the Vedas and Epics, but also mathematics and medicine, and literacy skills were widespread in the region as a result.',
              'Land endowments were established to provide for the operational expenses of the Vedic colleges and teachers were rewarded with land grants.',
            ],
          },
        ],
      },
      {
        id: 'bronze-sculpture',
        title: 'Bronze sculpture (3)',
        blocks: [
          {
            paragraphs: [
              'The Cholas are also renowned for bronze sculptures, examples of which can be seen even today in South Indian temples and museums throughout the world.',
            ],
          },
        ],
      },
      {
        id: 'tamil-literature',
        title: 'Tamil literature (4)',
        blocks: [
          {
            paragraphs: [
              'The Cholas were benefactors of Tamil scholars and poets and encouraged the creation of major literary works including the **Kamba Ramayanam**, **Periya Puranam**, and treatises on Tamil Grammar.',
              'While traditional religious and secular forms of literature flourished during the Chola period, so did new genres like epics and many new forms of poetry.',
            ],
          },
        ],
      },
    ],
  },

  rajaraja: {
    id: 'rajaraja',
    eyebrow: 'chapter two',
    title: 'Rajaraja Chola I',
    chapterLabel: '02',
    accomplishments: {
      id: 'rajaraja-accomplishments',
      title: 'Accomplishments',
    },
    lead:
      '**Arulmozhi Devan**, later known as **Rajaraja Chola I** — conqueror, administrator, and the emperor who raised **Rajarajeshwaram**.',
    topics: [
      {
        id: 'birth',
        year: '944 CE',
        title: 'Birth and lineage',
        blocks: [
          {
            heading: 'Birth',
            body: '**Arulmozhi Devan**, later known as **Rajaraja Chola I**, the third child of **Paranthaka Chola II** and **Vanavan Madevi**, was born in **Thirukovalur in the year 944 CE** in the month of **Ayipasi**, under the birth star **Sadhayam**.',
          },
          {
            heading: 'Thiruvalankadu inscriptions',
            body: 'According to the **Thiruvalankadu inscriptions (11th c. copper inscriptions containing Chola genealogy)**, he had the signs of the **shangu** (conch) and **chakram** (wheel) on his palms, symbols of a great king.',
          },
          {
            heading: 'Likeness in art',
            body: 'Frescos and bronzes of Rajaraja from the **early 11th century** show him to be a very handsome man, a trait he likely inherited from his father, **Paranthaka II**, who was known as “**Sundara Chola**” and considered to be the epitome of male beauty.',
          },
        ],
        media: {
          kind: 'image' as const,
          src: '/assets/history/rajaraja-bust.png',
          alt: 'Bust portrait associated with Rajaraja Chola I',
          title: 'Rajaraja detail',
        },
      },
      {
        id: 'throne',
        year: '985 CE',
        title: 'Path to the throne',
        blocks: [
          {
            body: 'After the death of **Paranthaka Chola**, Rajaraja wished to avoid infighting within the family and ceded the throne to his uncle, **Uthama Chola** in an unprecedented act of statesmanship that was extremely rare in ancient Indian history. Upon the death of Uthama Chola, Rajaraja ascended the throne at the age of **41** on **July 7, 985** (the **22nd day of Adi** per the Tamil calendar, a Saturday under the auspices of the **Punarvasu** star).',
          },
        ],
      },
      {
        id: 'empire',
        year: '985 – 1014 CE',
        title: 'Empire and administration',
        blocks: [
          {
            heading: 'Conquest',
            body: 'Under Rajaraja’s regime the Chola kingdom grew to encompass the entire South Indian peninsula, as well as parts of **Sri Lanka** and **Lakshadweep** Islands.',
          },
          {
            heading: 'Agriculture, trade, and learning',
            body: 'Beyond being a successful conqueror, Rajaraja had the foresight and astuteness to organize his kingdom to ensure continuing prosperity built upon agriculture, trade, and learning.',
          },
          {
            heading: 'Land survey of 1000 CE',
            body: 'To this end, he initiated a **land survey and assessment in 1000 CE** which led to the reorganization of Tamil country into **mandalams** (provinces), further subdivided into **valanadus**, **nadus**, and villages. Each level of administration had autonomous local assemblies responsible for tax collection, justice, and maintenance of public works such as irrigation.',
          },
        ],
        media: {
          kind: 'image' as const,
          src: '/assets/history/rajaraja-queen-bronze.jpeg',
          alt: 'Bronze figures of Rajaraja Chola and a queen',
          title: 'Rajaraja and queen bronze',
        },
      },
      {
        id: 'final',
        year: '1014 CE',
        title: 'Shivapada Shekhara',
        blocks: [
          {
            body: 'After a successful reign of **over 25 years**, Rajaraja’s health declined. During the last three years of his life, he gradually turned over the reins of the kingdom to his son and dedicated himself to religious matters, taking on the name of “**Shivapada Shekhara**” (the one who places his crown at the feet of Shiva). Rajaraja’s end came in **January 1014**. He was succeeded to the throne by his son **Rajendra Chola I**.',
          },
        ],
      },
      {
        id: 'temple',
        title: 'Rajarajeshwaram (1)',
        blocks: [
          {
            body: 'Rajaraja also left a significant mark through his architectural and cultural achievements. He commissioned the construction of the **Rajarajeshwaram Temple** (presently known as Brihadishwara temple) in the Chola capital of **Thanjavur**, which is still revered as one of the most prominent examples of medieval South Indian architecture.',
          },
          {
            heading: 'A hub of activity',
            body: 'The temple was not only a religious center but also the hub of economic, cultural, and educational activity. He set up endowments for daily worship, festivals, music, and dance performances in temples.',
          },
        ],
      },
      {
        id: 'arts-faith',
        title: 'Art, music, and faith (2)',
        blocks: [
          {
            body: 'Art, music and dance flourished under his active patronage. Important Tamil literary works by poets such as **Appar**, **Sambandar**, and **Sundarar** were gathered and compiled into a single collection known as the **Thirumurai**.',
          },
          {
            heading: 'Religious tolerance',
            body: 'While Rajaraja was a devout Shaivite (Hindu follower of **Lord Shiva**), his rule was marked by religious tolerance and patronage of diverse faiths. He supported Vaishnavite institutions and made donations to Buddhist monasteries. Buddhism and Jainism existed in harmony with Shaivism in Rajaraja’s time and this is seen in sculptural examples such as the statues of **Buddha** and **Mahavira** that stand alongside **Shiva** and **Parvathi** in the Rajaraja gateway in the Brihadishwara temple.',
          },
        ],
        media: {
          kind: 'image' as const,
          src: '/assets/history/rajaraja-three-queens.jpeg',
          alt: 'Mural of Rajaraja Chola and his three queens worshipping Lord Shiva in the form of Nataraja',
          title: 'Rajaraja and 3 queens mural',
        },
      },
      {
        id: 'welfare',
        title: 'A noble and caring ruler (3)',
        blocks: [
          {
            heading: 'Health in the cloister',
            body: 'It is said that the upper part of the **Thiruchtru Maligai**, the outer corridor in the Tanjore temple, served as a place where people could consult physicians and engage in exercise and other health building activities.',
          },
          {
            heading: 'Temple as bank',
            body: 'He promoted the role of the temple as a Bank to the public and to traders, so they could borrow money and repay it back with minimal interest.',
          },
        ],
      },
      {
        id: 'family',
        title: 'Queens, children, and Kundavai (4)',
        blocks: [
          {
            heading: 'Family',
            body: 'In his personal life, as was the custom of the time, Rajaraja had several wives, including **Lokamadevi** (Principal Queen), **Panchavan Madeviyar Tribhuvana Mādēviyār**, and others. He had two sons, **Rajendra** (crown prince) and **Araiyan Rajarajan**, and three daughters.',
          },
          {
            heading: 'Kundavai',
            body: 'Rajaraja’s older sister, **Kundavai**, who was renowned for her intelligence, and her role in Chola politics as a key mentor to Rajaraja. She made lavish donations to the Brihadishwara Temple at Thanjavur.',
          },
        ],
      },
    ],
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'From dynasty to stone: see how the vision became the temple, walk the complex, and discover art and living worship.',
  },

  parts: {
    part1: {
      id: 'part1' as const,
      label: 'Chapter 01',
      stageIds: ['stage-prologue', 'stage-chola'] as const,
    },
    part2: {
      id: 'part2' as const,
      label: 'Chapter 02',
      stageIds: ['stage-rajaraja', 'stage-next'] as const,
    },
  },

  bridge: {
    id: 'chapter-bridge',
    eyebrow: 'the story continues',
    title: 'The Greatest Chola Emperor',
    lead:
      'Meet **Rajaraja Chola I** — the conqueror, administrator, and devotee who raised **Rajarajeshwaram** and shaped the temple’s living legacy.',
    cta: 'Continue to Chapter 02',
  },

  contentsStages: [
    {
      id: 'stage-prologue',
      label: 'Begin',
      items: [
        { id: 'prologue', label: 'A Land of Dynasties' },
        { id: 'dynasties', label: 'Dynasties of Influence' },
      ],
    },
    {
      id: 'stage-chola',
      label: 'Chapter 01',
      items: [
        { id: 'chola-dynasty', label: 'The Chola Dynasty' },
        { id: 'chola-origins', label: 'Early Cholas' },
        { id: 'chola-empire', label: 'Empire' },
        { id: 'chola-seas', label: 'Rajendra I & the seas' },
        { id: 'later-cholas', label: 'Later Cholas' },
        {
          id: 'accomplishments',
          label: 'Accomplishments',
          children: [
            { id: 'temples-frescoes', label: 'Temples & frescoes' },
            { id: 'learning', label: 'Learning' },
            { id: 'bronze-sculpture', label: 'Bronze sculpture' },
            { id: 'tamil-literature', label: 'Tamil literature' },
          ],
        },
      ],
    },
    {
      id: 'stage-rajaraja',
      label: 'Chapter 02',
      items: [
        { id: 'rajaraja', label: 'Rajaraja overview' },
        { id: 'birth', label: 'Birth & lineage' },
        { id: 'throne', label: 'Path to the throne' },
        { id: 'empire', label: 'Empire & administration' },
        { id: 'final', label: 'Shivapada Shekhara' },
        {
          id: 'rajaraja-accomplishments',
          label: 'Accomplishments',
          children: [
            { id: 'temple', label: 'Rajarajeshwaram' },
            { id: 'arts-faith', label: 'Art, music & faith' },
            { id: 'welfare', label: 'A caring ruler' },
            { id: 'family', label: 'Family & Kundavai' },
          ],
        },
      ],
    },
    {
      id: 'stage-next',
      label: 'Continue Exploring',
      items: [{ id: 'continue', label: 'Continue Exploring' }],
    },
  ],
}

export type HistoryPartId = 'part1' | 'part2'

export function historyContentsForPart(part: HistoryPartId) {
  const stageIds = new Set<string>(historyPage.parts[part].stageIds)
  return historyPage.contentsStages.filter((stage) => stageIds.has(stage.id))
}

export const historyPartDockOptions = [
  { id: 'part1' as const, label: historyPage.parts.part1.label },
  { id: 'part2' as const, label: historyPage.parts.part2.label },
]
