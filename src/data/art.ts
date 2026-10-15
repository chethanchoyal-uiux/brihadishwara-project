/** Art & Sculpture page — writeup §5. Client wording preserved; structure is presentation only. */

export type ArtImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  credit?: string
  /** Optional fullscreen source when page shows a cropped `src` */
  lightboxSrc?: string
}

export const artPage = {
  hero: {
    eyebrow: 'stone sculptures and bronzes',
    title: 'Art & Sculpture',
    lead:
      'The **Chola period** is renowned for stone sculptures and bronzes, with fine examples in the temples of **South India** and in museums worldwide.',
    image: '/assets/art/1-stone-sculptures.jpg',
  },

  intro: {
    id: 'intro',
    eyebrow: 'Introduction',
    title: 'Art at the heart of Brihadishwara',
    lead:
      'The **Brihadishwara temple** is a living testament to the value the **Cholas** placed on art and sculpture and how they incorporated it into their most important monuments and temples.',
    paragraphs: [
      '**Rajaraja Chola** and **Rajendra Chola** were patrons of the artists, endowing them with the means and support to create the finest sculptures and bronzes. Intricate stone carvings, idols and frescos depict scenes from **Hindu mythology**, dance poses, portraits of **Rajaraja and his court**, and everyday life.',
    ],
  },

  stone: {
    id: 'stone-sculptures',
    chapterLabel: '01',
    eyebrow: 'Stone Sculptures',
    title: 'Granite, high relief, and Lakshanas',
    granite: {
      intro: [
        'The **Cholas** created stone sculptures, primarily using granite, depicting divine images as well as scenes from religious texts and mythology, in high relief.',
        'Descriptions of celestial beings from the works of ancient poets and sages formed the conceptual basis for sculptures created by **Chola artists** who followed strict rules of proportions known as **Lakshanas** that set out positions and proportions of face, body and limbs.',
      ],
      topics: [
        {
          label: 'Granite & high relief',
          text: 'The **Cholas** created stone sculptures, primarily using granite, depicting divine images as well as scenes from religious texts and mythology, in high relief.',
        },
        {
          label: 'Lakshanas',
          text: 'Descriptions of celestial beings from the works of ancient poets and sages formed the conceptual basis for sculptures created by **Chola artists** who followed strict rules of proportions known as **Lakshanas** that set out positions and proportions of face, body and limbs.',
        },
      ],
      closing: [
        'As these interpretations and rules were uniformly followed by the thousands of sculptors who worked on the **Brihadishwara temple**, these is a pleasing cohesion in the sculptures that adorn the entire temple.',
        'While sculptors were bound by the rules of their art form, these sculptures still show fluid grace and beauty.',
      ],
      image: {
        src: '/assets/art/1-stone-sculptures.jpg',
        alt: 'Stone sculptures at the Brihadishwara temple',
        title: 'Stone sculptures',
      } satisfies ArtImage,
    },
    karanas: {
      id: 'karanas',
      eyebrow: 'Nataraja Karanas',
      title: 'Dance poses from the Natyashastra',
      intro:
        'Inside the upper **Vimana** passage, granite panels show **Shiva** as **Nataraja** in **karanas**—dance poses from the classical **Natyashastra**.',
      leadParagraphs: [
        'In **1956** **ASI** staff were cleaning the interior passages within the walls of the **Vimana** and came across a hardened section of dirt and bat excreta.',
        'When they removed this obstruction, they discovered a passage that opened up to reveal a number of granite sculptures of **Shiva Thandava** or **Nataraja** (**Shiva in his dancing form**) in **Karanas** (dance poses) from the classical Indian dance treatise, the **Natyashastra**.',
      ],
      flowParagraphs: [
        'Only **81** of the **108 karanas** had been sculpted, but blank panels remain for the other **27**.',
        'These sculptures are prime examples of **Chola sculptures** as they epitomize grace and expressive movement in the face, hands and body positions of each dance pose.',
      ],
      highlights: [
        { label: 'Karanas completed', value: '81 of 108' },
        { label: 'Discovery', value: '1956' },
        { label: 'Source text', value: 'Natyashastra' },
      ],
      image: {
        src: '/assets/explore/4-5-main-complex/21-karana.jpg?v=2',
        alt: 'Granite sculptures of Shiva in karana dance poses from the Natyashastra',
        title: 'Karanas',
      } satisfies ArtImage,
    },
  },

  bronzes: {
    id: 'bronzes',
    chapterLabel: '02',
    eyebrow: 'Bronzes',
    title: 'Processions, lost-wax casting, and Chola mastery',
    processions: {
      intro:
        'Daily rituals and festivals at the **Brihadishwara temple** involve images of gods and goddesses that are carried around and outside the temple and the **Cholas** created bronze images for this purpose.',
      sections: [
        {
          title: 'Procession bronzes',
          paragraphs: [
            'Finely wrought bronze idols, clothed in silk vestments and adorned with flowers and gold jewelry studded with precious stones, were mounted on large poles and carried in processions by temple priests.',
          ],
        },
        {
          title: 'Musicians and dancers',
          paragraphs: [
            'Musicians and dancers performed in front of these images while royalty, nobles and the townspeople participated in the rituals.',
          ],
        },
      ],
    },
    nataraja: {
      id: 'nataraja-bronze',
      eyebrow: 'Dancing Shiva',
      title: 'Nataraja',
      paragraphs: [
        '**Shiva** and his consort, **Parvati**, in their many forms were a favorite subject of **Chola metal casters**, along with other gods and goddesses in the **Hindu pantheon**.',
        'The **Nataraja**, or dancing form of **Shiva** with his four arms and surrounding ring of fire has become synonymous with **Chola bronzes**.',
      ],
      image: {
        src: '/assets/art/2-nataraja.jpg',
        alt: 'Chola Nataraja bronze sculpture',
        title: 'Nataraja',
      } satisfies ArtImage,
    },
    lostWax: {
      id: 'lost-wax',
      heading: 'Lost-wax process',
      intro:
        'Metal casters of the **Chola period** used the lost wax method to create bronzes.',
      steps: [
        'A model of the sculpture was first created using a mix of beeswax and camphor.',
        'The model then was thickly coated with clay and fired to hardness.',
        'During the firing, the beeswax model melted away leaving a hard hollow clay mold.',
        'A molten bronze alloy was then poured into the clay mold and allowed to cool and harden.',
        'Finally, the clay mold was broken and the bronze sculpture inside was cleaned, finished and polished. As the molds were broken, each bronze was a unique piece!',
      ],
      image: {
        src: '/assets/art/3-detail-bronze.jpg',
        alt: 'Detail of a Chola bronze sculpture showing fine craftsmanship',
        title: 'Bronze detail',
      } satisfies ArtImage,
    },
    followUp: {
      eyebrow: 'Chola bronzes',
      intro:
        '**Chola bronzes** are renowned for fine details, intricate hairstyles and jewelry, realistic expressions, proportionate limbs, and hands held up in graceful dance mudras.',
      sections: [
        {
          title: 'Lost-wax artistry',
          paragraphs: [
            'Given the complexity of the lost wax method, these thousand-year-old bronzes represent artistry and skill that are hard to replicate even with modern tools.',
          ],
        },
        {
          title: 'Temple inscriptions',
          paragraphs: [
            'According to the temple inscriptions, **Rajaraja Chola**, his sister **Kundavai** and others had donated more than **60** exquisite bronzes to the **Brihadishwara temple**.',
          ],
        },
        {
          title: 'Bronzes in the temple',
          paragraphs: [
            'Out of these, only two sets remain in the temple: **Nataraja** and his consort **Sivagami**, and **Rajaraja and his queen Lokama Devi**. They were repatriated in **2018** by the **Sarabhai Foundation** and the **Calico Museum**.',
          ],
        },
        {
          title: 'Thanjavur Maratha Palace',
          paragraphs: [
            'While only a few original bronzes remain in the **Brihadishwara temple**, the **Thanjavur Maratha Palace** museum houses an impressive collection of **Chola and later bronzes**, including several **Nataraja** statues.',
          ],
        },
        {
          title: 'Indian museums',
          paragraphs: [
            'Other notable collections may be found at the **Government Museum**, **Chennai**, the **Pondicherry Museum**, and the **Indian Museum**, **Kolkata**.',
          ],
        },
        {
          title: 'International museums',
          paragraphs: [
            '**Chola bronzes** are also displayed at **New York\'s Metropolitan Museum of Art**, the **Chicago Art Institute**, the **British Museum**, and **Rijksmuseum** in **Amsterdam**.',
          ],
        },
      ],
    },
  },

  frescos: {
    id: 'frescos',
    chapterLabel: '03',
    eyebrow: 'Frescos',
    title: 'Maratha, Nayaka, and Chola paintings',
    intro:
      'Visitors may observe several beautiful murals (paintings on a plaster base) on walls and ceilings throughout the **Brihadishwara temple**.',
    layers: [
      {
        id: 'fresco-maratha',
        period: '18th century',
        title: 'Maratha period',
        paragraphs: [
          'The most recent ones are **Maratha period** works from the **18th century** with the best example being the richly hued ceiling of the **Nandi Mandapam** and the **Subrahmanya Shrine**.',
        ],
        image: {
          src: '/assets/art/4-maratha-fresco.jpg',
          alt: 'Maratha period fresco on a temple ceiling',
          title: 'Maratha frescos',
        } satisfies ArtImage,
      },
      {
        id: 'fresco-nayaka',
        period: '17th century',
        title: 'Nayaka period',
        paragraphs: [
          'Vivid frescos from the **17th century Nayaka** period line the walls of the colonnaded **Thiruchutra Maligai** as well as the walls and ceiling of the **Maha Mandapam**.',
          'Preserved frescos from the inside of the **Vimana** may be seen in the temple\u2019s **Interpretation Center**.',
        ],
        image: {
          src: '/assets/art/5-nayaka-fresco.jpg',
          alt: '17th-century Nayaka period wall fresco',
          title: 'Nayaka frescos',
        } satisfies ArtImage,
      },
    ],
    chola: {
      id: 'fresco-chola',
      period: 'Chola era',
      title: 'Chola frescos',
      intro: [
        'However, it is the **Chola frescos** that have the most complex and fascinating history of all the artwork in the temple complex.',
        'In **1931**, a young professor from **Annamalai University**, **S.K. Govindasamy**, was examining the dark, seven-foot-wide passage around the sanctum of the temple by the light of his \u201cBaby Petromax\u201d lantern looking for evidence of **Chola murals**.',
      ],
      panels: [
        {
          label: 'Nayaka paintings first',
          paragraphs: [
            'At first, all he saw were the **17th century Nayaka** paintings and was about to give up on his quest.',
          ],
        },
        {
          label: 'Cracked western wall',
          paragraphs: [
            'As he was completing his examination, he noticed an area on the western side of the passage where the plaster was cracked.',
          ],
        },
        {
          label: 'Chola paintings revealed',
          paragraphs: [
            'When he scraped off a few of the peeling flakes, he found an amazing trove of **1000 year old Chola** paintings.',
          ],
        },
        {
          label: 'Newspaper account',
          intro: 'In a subsequent newspaper article, he wrote:',
          paragraphs: [
            '\u201c\u2026It has been my great good fortune to bring to light the hitherto unknown frescos of the Imperial Chola period, in the Brihadeswaraswami Temple, popularly known as \u2018the Big Temple of Tanjore.\u2019',
            '\u201cIt was almost a year since I visited that noble temple one evening, \u2026when in the dim religious light of a small oil lamp I felt, as it were, the existence of some kind of paintings on the walls on either side of a dark narrow circumambulatory passage around the sanctum sanctorum.',
            '\u201cBut it was only yesterday I found it convenient to examine the place more thoroughly with the help of a \u2018Baby Petromax\u2019 whose bright light revealed paintings indeed but paintings of an undoubtedly very late and degenerate age, whose linear contortions and chromatic extravagances shattered in a moment all my wonderful dreams of discovering there the best and the only example of the art of Chola mural paintings.',
            '\u201cStill I chose a part of the western wall for close inspection and found the painted plastering there cracked all over and threatening to fall down. A gentle touch and the whole mass crumbled down, exposing underneath a fine series of frescos palpitating with the life of other days.\u201d',
          ],
          variant: 'quote' as const,
        },
        {
          label: 'ASI preservation',
          paragraphs: [
            'In the **1980s**, after much scientific and scholarly work on preservation of these two sets of frescos, the **Archaeological Survey of India\u2019s** chemical branch developed a revolutionary technique for preserving murals.',
          ],
        },
        {
          label: 'Destucco technique',
          paragraphs: [
            'Using an Italian conservation technique called \u2018destucco\u2019, they embarked on a journey of removing the **Nayaka paintings** in an intact layer revealing the **Chola paintings** underneath.',
            'Around **16** paintings have been painstakingly restored to date.',
          ],
        },
        {
          label: 'Interpretation Center',
          paragraphs: [
            'The upper layer of **Nayak paintings** have been removed and displayed on fiberglass boards in the **Temple Interpretation Center** (Map Reference **8**).',
          ],
        },
        {
          label: 'Fresco method',
          paragraphs: [
            '**Chola artists** used the fresco method for creating their murals.',
          ],
        },
        {
          label: 'Plaster and pigments',
          paragraphs: [
            'A smooth batter of limestone and other materials was applied over the stones of the walls and allowed to dry slowly over a period of two to three days.',
            'While the plaster was setting up, the artists drew outlines in light red and brown and then filled in the paintings with natural organic pigments including red and yellow ochre, and terre-verde green.',
          ],
        },
        {
          label: 'Mythology subjects',
          paragraphs: [
            'The frescos in the **Brihadishwara temple** depict scenes from **Hindu mythology**. **Lord Shiva** is primarily featured, though there are paintings of **Lord Vishnu**, **Goddess Durga**, **Goddess Kali** and images of the **Chola kings** as well. Some of the most well-known frescos include:',
          ],
        },
        {
          label: 'Tripurantaka',
          paragraphs: ['1,000-year-old Chola mural depicting Shiva as Tripurantaka'],
          image: {
            src: '/assets/art/6-tripurantaka.jpg',
            alt: '1,000-year-old Chola mural depicting Shiva as Tripurantaka',
            title: 'Tripurantaka',
          } satisfies ArtImage,
          variant: 'subject' as const,
        },
        {
          label: 'Celestial Visitors',
          paragraphs: [
            'Originally thought to be a painting of Rajaraja and his guru Karuvur Devar, experts now believe this painting may represent celestial visitors to Shiva and Parvati\u2019s wedding.',
          ],
          image: {
            src: '/assets/art/7-rajaraja-and-guru.jpg',
            lightboxSrc: '/assets/art/7-rajaraja-and-guru-full.jpg',
            alt: 'Chola mural once thought to show Rajaraja and his guru, now read as celestial visitors',
            title: 'Celestial Visitors',
          } satisfies ArtImage,
          variant: 'subject' as const,
        },
        {
          label: 'Celestial dancers',
          paragraphs: [
            'Celestial dancers \u2013 well-coiffured and wearing pearl jewelry.',
          ],
          image: {
            src: '/assets/art/8-celestial-dancers.png',
            alt: 'Chola fresco of celestial dancers wearing pearl jewelry',
            title: 'Celestial dancers',
          } satisfies ArtImage,
          variant: 'subject' as const,
        },
      ],
    },
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'History, the temple, a walking plan, and living worship: more ways to know **Brihadishwara** beyond art and sculpture.',
  },

  parts: {
    part1: {
      id: 'part1' as const,
      label: 'Chapter 01',
      stageIds: ['stage-stone', 'stage-bronzes'] as const,
    },
    part2: {
      id: 'part2' as const,
      label: 'Chapter 02',
      stageIds: ['stage-frescos', 'stage-next'] as const,
    },
  },

  bridge: {
    id: 'chapter-bridge',
    eyebrow: 'the collection continues',
    title: 'Painted walls across the centuries',
    lead:
      'From granite, dance poses, and **Chola bronzes** to layered **murals** — the temple’s artistry continues on plaster and pigment.',
    cta: 'Continue to Chapter 02',
  },

  contentsStages: [
    {
      id: 'stage-stone',
      label: 'Chapter 01',
      items: [
        { id: 'intro', label: 'Introduction' },
        { id: 'stone-sculptures', label: 'Stone Sculptures' },
        { id: 'karanas', label: '81 of 108 Karanas' },
      ],
    },
    {
      id: 'stage-bronzes',
      label: 'Bronzes',
      items: [
        { id: 'bronzes', label: 'Bronzes' },
        { id: 'nataraja-bronze', label: 'Nataraja' },
        { id: 'lost-wax', label: 'Lost-wax process' },
      ],
    },
    {
      id: 'stage-frescos',
      label: 'Chapter 02',
      items: [
        { id: 'frescos', label: 'Frescos' },
        { id: 'fresco-chola', label: 'Chola frescos' },
      ],
    },
    {
      id: 'stage-next',
      label: 'Continue Exploring',
      items: [{ id: 'continue', label: 'Continue Exploring' }],
    },
  ],
}

export type ArtPartId = 'part1' | 'part2'

export function artContentsForPart(part: ArtPartId) {
  const stageIds = new Set<string>(artPage.parts[part].stageIds)
  return artPage.contentsStages.filter((stage) => stageIds.has(stage.id))
}

export const artPartDockOptions = [
  { id: 'part1' as const, label: artPage.parts.part1.label },
  { id: 'part2' as const, label: artPage.parts.part2.label },
]
