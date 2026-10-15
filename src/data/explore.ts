export const explorePage = {
  hero: {
    eyebrow: 'walking the complex',
    title: 'Explore the Temple',
    lead:
      'An **east-facing** sanctuary within moat and fortified walls: gateways, cloisters, **Nandi**, subsidiary shrines, and the towering **vimana**, walked clockwise for a thousand years.',
    image: '/assets/explore/root/1-drone-aerial-view.jpg',
    imageMobile: '/assets/explore/root/1-drone-aerial-view.jpg',
  },

  orientation: {
    id: 'orientation',
    eyebrow: 'first look',
    title: 'A complex shaped by centuries',
    /** Opening statement — same meaning as the first paragraph. */
    opening:
      'The **Brihadishwara temple** faces **east** and has a moat with fortified walls around it. Many rulers and dynasties have placed their mark on the temple from **1000 CE all the way to the late 18th century**.',
    timeline: {
      eyebrow: 'Historical Timeline',
      title: 'From 1000 CE to the late 18th century',
      eras: [
        { label: '1000 CE', detail: 'Rulers begin to leave their mark' },
        { label: '11th century', detail: 'Original temple — Rajaraja Chola' },
        { label: 'After the 11th century', detail: 'Pandya · Nayaka · Vijayanagara · Maratha' },
        { label: 'Late 18th century', detail: 'Colonial period' },
      ],
    },
    cholaCore: {
      eyebrow: 'Original Chola Core',
      title: 'Built by Rajaraja Chola',
      elements: [
        { label: 'Keralantakan Tiruvasal', detail: 'Gateway' },
        { label: 'Rajarajan Tiruvasal', detail: 'Gateway' },
        { label: 'Thiruchutru Maligai', detail: 'Colonnaded cloister' },
        { label: 'Vimana & gathering halls', detail: 'Sanctum tower' },
        { label: 'Chandikeshwara shrine', detail: 'Inner court' },
      ],
      body:
        'The original temple as built by **Rajaraja Chola** consisted of the second and third gateways (**Keralantakan** and **Rajarajan Tiruvasal**), the colonnaded corridor (**Thiruchutru Maligai**), the Sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara temple**.',
    },
    laterAdditions: {
      eyebrow: 'Later Additions',
      title: 'After the 11th century',
      dynasties: ['Pandya', 'Nayaka', 'Vijayanagara', 'Maratha'],
      body:
        'All the other structures were added to the original temple **after the 11th century**, during the **Pandya, Nayaka, Vijayanagara and Maratha eras**, before the colonial era started. As seen by the layout of the temple complex, these later builders appear to have understood and respected the original plans and symmetry rules.',
    },
    colonial: {
      kind: 'historical-note' as const,
      eyebrow: 'Historical Context',
      title: 'Arsenal within sacred walls',
      body:
        'In the colonial era, **French and British colonists** used the temple as an arsenal and military fort, stationing troops inside and adding high defensive walls with gun-holes. Some inner and outer structures were damaged during this time.',
      image: {
        src: '/assets/explore/4-1-temple-entrances/2-fortification-wall.jpg',
        alt: 'Fortification wall and eastern approach to the temple',
          title: 'Fortification walls'
      },
    },
    closing: {
      eyebrow: 'Reading the plan',
      title: 'Respect for the original order',
      body:
        'The temple complex consists of several independent structures within the outer walls, each with its own unique structural and artistic character and associated history and lore. Take your time to absorb the beauty and history of this unique place!',
      image: {
        src: '/assets/explore/root/2-temple-plan-map.jpg',
        alt: 'Temple plan map with fifteen numbered sections',
        title: 'Temple plan',
        caption: 'Fifteen numbered stops on the walking map',
      },
    },
    /** Kept for reference / any legacy consumers — same client wording. */
    paragraphs: [
      'The **Brihadishwara temple** faces **east** and has a moat with fortified walls around it. Many rulers and dynasties have placed their mark on the temple from **1000 CE all the way to the late 18th century**.',
      'The original temple as built by **Rajaraja Chola** consisted of the second and third gateways (**Keralantakan** and **Rajarajan Tiruvasal**), the colonnaded corridor (**Thiruchutru Maligai**), the Sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara temple**. All the other structures were added to the original temple **after the 11th century**, during the **Pandya, Nayaka, Vijayanagara and Maratha eras**, before the colonial era started. As seen by the layout of the temple complex, these later builders appear to have understood and respected the original plans and symmetry rules.',
      'The temple complex consists of several independent structures within the outer walls, each with its own unique structural and artistic character and associated history and lore. Take your time to absorb the beauty and history of this unique place!',
    ],
    notes: [
      {
        kind: 'historical-note' as const,
        title: 'Arsenal within sacred walls',
        body: 'In the colonial era, **French and British colonists** used the temple as an arsenal and military fort, stationing troops inside and adding high defensive walls with gun-holes. Some inner and outer structures were damaged during this time.',
      },
    ],
    images: [
      {
        src: '/assets/explore/root/2-temple-plan-map.jpg',
        alt: 'Temple plan map with fifteen numbered sections',
        title: 'Temple plan',
        caption: 'Fifteen numbered stops on the walking map',
      },
    ],
  },

  etiquette: {
    id: 'etiquette',
    eyebrow: 'before you visit',
    title: 'Etiquette for Visiting the Brihadishwara Temple',
    modalTitle: 'Visitor etiquette',
    lead:
      'The temple welcomes visitors and devotees from all over the world. While visitors of all races and religions are welcome, a few simple rules should be followed.',
    cta: 'View etiquette',
    rules: [
      {
        id: 'dress-footwear',
        title: 'Dress & Footwear',
        kind: 'dress' as const,
        men: {
          title: 'Men',
          items: ['**Dhotis** or trousers', 'Shirts', 'Traditional Indian attire preferred'],
        },
        women: {
          title: 'Women',
          items: ['**Saree**', '**Salwar Kameez**', 'Modest western wear', 'Traditional Indian attire preferred'],
        },
        note: '**Modest clothing** is required while visiting the temple.',
        footwear: {
          title: 'Footwear',
          paragraphs: [
            'Remove footwear and place them in designated areas outside the temple.',
            '**Socks** are recommended to protect feet on hot paving stones.',
          ],
        },
      },
      {
        id: 'photography-conduct',
        title: 'Photography & Conduct',
        kind: 'grouped' as const,
        groups: [
          {
            title: 'Photography',
            paragraphs: [
              'Follow all posted rules regarding photography.',
              '**Tripods** are not allowed without special permission.',
              'Photography is not permitted inside the **sanctum** and in a few other places.',
              'There is a fee for cameras.',
            ],
          },
          {
            title: 'Conduct',
            paragraphs: [
              'Keep voices low, turn phones to silent, and avoid public displays of affection.',
              'Walk in a **clockwise** direction around temple structures.',
            ],
          },
        ],
      },
      {
        id: 'sanctum',
        title: 'Sanctum & Touch',
        kind: 'text' as const,
        paragraphs: [
          'Do not enter the sanctum of the main temple or surrounding shrines, or touch statues of deities for whom **pooja** has been performed.',
          'While it is permissible to touch exterior sculptures, minimize doing so to avoid damage to these ancient artifacts.',
        ],
      },
      {
        id: 'offerings',
        title: 'Offerings & Donations',
        kind: 'text' as const,
        paragraphs: [
          'While there is no entry fee, a small **donation** placed in one of the donation boxes is a respectful gesture.',
          'Offerings of flowers or fruit can be given to the priest but are not mandatory.',
        ],
      },
    ],
    note:
      'After **pooja**, the priest will walk around with a lamp and holy water. To accept blessings, place cupped hands above the flame, then fold your hands. Holy water should be received with the right hand above the left and sprinkled on the head with the right hand. **Prasad**, red **kumkum** powder, or holy ashes from priests should be accepted with the right hand. A small offering (**Rs. 50–100**) may also be placed on plates held by priests when they offer kumkum or holy ashes during worship.',
  },

  mapWalk: {
    id: 'map-walk',
    eyebrow: 'the walk',
    title: 'Fifteen interactive stops on the plan',
    lead:
      'There are **15 main sections** of the temple as shown on the plan. Follow the guided walk below — the map stays with you as orientation while each stop comes into view.',
    image: {
      src: '/assets/explore/root/2-temple-plan-map.jpg',
      alt: 'Numbered temple plan map with key to fifteen sections',
      title: 'Walking map',
      caption: 'The plan remains in view as you walk each stop',
    },
    /** Sticky journey backdrop — aerial 3D map (static slide + marker highlights). */
    stickyImage: {
      src: '/assets/explore/root/TOP-VIEW-3D-MAP-MARKED-wide.jpg',
      alt: 'Aerial view of Brihadishwara temple complex with fifteen numbered walk stops',
      width: 5300,
      height: 2304,
    },
    /** Mobile sticky map — upright plan on white (static, centered). */
    stickyImageMobile: {
      src: '/assets/explore/root/TOP-VIEW-3D-MAP-MARKED-mobile.png',
      alt: 'Numbered temple plan with fifteen walk stops',
      width: 824,
      height: 1024,
    },
    /** Map stop metadata — x/y desktop aerial %; mobileX/Y upright plan %. */
    stops: [
      { num: 1, label: 'Maratha Entrance', href: '#entrances-maratha', x: 63.2, y: 94.16, mobileX: 57.4, mobileY: 96.66 },
      { num: 2, label: 'Keralantakan Tiruvasal', href: '#entrances-keralantakan', x: 61.97, y: 82.97, mobileX: 53.46, mobileY: 84.75 },
      { num: 3, label: 'Rajarajan Tiruvasal', href: '#entrances-rajarajan', x: 62.36, y: 69.39, mobileX: 54.42, mobileY: 70.24 },
      { num: 4, label: 'Nandi Mandapam', href: '#nandi', x: 63.1, y: 54.15, mobileX: 56.42, mobileY: 53.96 },
      { num: 5, label: 'Varahi Shrine', href: '#varahi', x: 53.62, y: 36.93, mobileX: 27.26, mobileY: 35.87 },
      { num: 6, label: 'South Cloister', href: '#cloisters-south', x: 49.6, y: 40.52, mobileX: 15.05, mobileY: 39.81 },
      { num: 7, label: 'Main Temple', href: '#main-temple', x: 62.79, y: 30.57, mobileX: 55.1, mobileY: 28.79 },
      { num: 8, label: 'Interpretation Centre', href: '#cloisters-museum', x: 52.13, y: 23.47, mobileX: 22.5, mobileY: 21.55 },
      { num: 9, label: 'Ganapathi Kovil', href: '#shrines-ganapathi', x: 58.65, y: 19.7, mobileX: 42.29, mobileY: 17.32 },
      { num: 10, label: 'Karuvur Siddhar', href: '#shrines-karuvur', x: 65.4, y: 16.78, mobileX: 62.8, mobileY: 13.96 },
      { num: 11, label: 'Subrahmanya Shrine', href: '#shrines-subrahmanya', x: 70.75, y: 20.64, mobileX: 79.19, mobileY: 17.95 },
      { num: 12, label: 'Chandikeshwara Shrine', href: '#shrines-chandikeshwara', x: 66.45, y: 25.35, mobileX: 66.17, mobileY: 23.08 },
      { num: 13, label: 'North Cloister', href: '#cloisters-north', x: 73.97, y: 40.51, mobileX: 89.31, mobileY: 39.06 },
      { num: 14, label: 'Amman Shrine', href: '#shrines-amman', x: 69.47, y: 51.37, mobileX: 75.81, mobileY: 50.77 },
      { num: 15, label: 'Nataraja Mandapam', href: '#shrines-nataraja', x: 71.69, y: 59.6, mobileX: 82.72, mobileY: 59.5 },
    ],
  },

  /**
   * Visitor walking sequence (not map-number order).
   * North Cloister (13) is walked with the Outer Corridor after South Cloister.
   */
  journey: {
    id: 'journey',
    stops: [
      { num: 1, id: 'entrances-maratha', label: 'Maratha Entrance' },
      { num: 2, id: 'entrances-keralantakan', label: 'Keralantakan Tiruvasal' },
      { num: 3, id: 'entrances-rajarajan', label: 'Rajarajan Tiruvasal' },
      { num: 4, id: 'nandi', label: 'Nandi Mandapam' },
      { num: 5, id: 'varahi', label: 'Varahi Shrine' },
      { num: 6, id: 'cloisters-south', label: 'South Cloister' },
      { num: 13, id: 'cloisters-north', label: 'North Cloister' },
      { num: 7, id: 'main-temple', label: 'Main Temple' },
      { num: 8, id: 'cloisters-museum', label: 'Interpretation Centre' },
      { num: 9, id: 'shrines-ganapathi', label: 'Ganapathi Kovil' },
      { num: 10, id: 'shrines-karuvur', label: 'Karuvur Siddhar' },
      { num: 11, id: 'shrines-subrahmanya', label: 'Subrahmanya Shrine' },
      { num: 12, id: 'shrines-chandikeshwara', label: 'Chandikeshwara Shrine' },
      { num: 14, id: 'shrines-amman', label: 'Amman Shrine' },
      { num: 15, id: 'shrines-nataraja', label: 'Nataraja Mandapam' },
    ],
    /**
     * Sticky nav chips — related map stops share one item when they form a stage.
     * Only Cloister (6 & 13) is grouped; other stops stay individual.
     * `stopIds` stay individual for scroll-spy; click jumps to the first stop.
     */
    navItems: [
      { id: 'nav-maratha', nums: [1], label: 'Maratha Entrance', stopIds: ['entrances-maratha'] },
      {
        id: 'nav-keralantakan',
        nums: [2],
        label: 'Keralantakan Tiruvasal',
        stopIds: ['entrances-keralantakan'],
      },
      {
        id: 'nav-rajarajan',
        nums: [3],
        label: 'Rajarajan Tiruvasal',
        stopIds: ['entrances-rajarajan'],
      },
      { id: 'nav-nandi', nums: [4], label: 'Nandi Mandapam', stopIds: ['nandi'] },
      { id: 'nav-varahi', nums: [5], label: 'Varahi Shrine', stopIds: ['varahi'] },
      {
        id: 'nav-cloister',
        nums: [6, 13],
        label: 'Cloister',
        stopIds: ['cloisters-south', 'cloisters-north'],
      },
      { id: 'nav-main-temple', nums: [7], label: 'Main Temple', stopIds: ['main-temple'] },
      {
        id: 'nav-museum',
        nums: [8],
        label: 'Interpretation Centre',
        stopIds: ['cloisters-museum'],
      },
      { id: 'nav-ganapathi', nums: [9], label: 'Ganapathi Kovil', stopIds: ['shrines-ganapathi'] },
      { id: 'nav-karuvur', nums: [10], label: 'Karuvur Siddhar', stopIds: ['shrines-karuvur'] },
      {
        id: 'nav-subrahmanya',
        nums: [11],
        label: 'Subrahmanya Shrine',
        stopIds: ['shrines-subrahmanya'],
      },
      {
        id: 'nav-chandikeshwara',
        nums: [12],
        label: 'Chandikeshwara Shrine',
        stopIds: ['shrines-chandikeshwara'],
      },
      { id: 'nav-amman', nums: [14], label: 'Amman Shrine', stopIds: ['shrines-amman'] },
      {
        id: 'nav-nataraja',
        nums: [15],
        label: 'Nataraja Mandapam',
        stopIds: ['shrines-nataraja'],
      },
    ],
    groups: [
      {
        id: 'temple-entrance',
        eyebrow: 'thresholds',
        title: 'Temple Entrance',
        stopIds: ['entrances-maratha', 'entrances-keralantakan', 'entrances-rajarajan'],
      },
      {
        id: 'towards-sanctum',
        eyebrow: 'on the axis',
        title: 'Towards the Sanctum',
        stopIds: ['nandi', 'varahi'],
      },
      {
        id: 'outer-corridor',
        eyebrow: 'Outer corridor',
        title: 'Thiruchutru Maligai · 06 & 13',
        stopIds: ['cloisters-south', 'cloisters-north'],
      },
      {
        id: 'main-temple-group',
        eyebrow: 'the vimana',
        title: 'Main Temple',
        stopIds: ['main-temple'],
      },
      {
        id: 'interpretation',
        eyebrow: 'museum',
        title: 'Interpretation Centre',
        stopIds: ['cloisters-museum'],
      },
      {
        id: 'inner-court',
        eyebrow: 'side shrines',
        title: 'Inner Court Shrines',
        stopIds: [
          'shrines-ganapathi',
          'shrines-karuvur',
          'shrines-subrahmanya',
          'shrines-chandikeshwara',
        ],
      },
      {
        id: 'return-path',
        eyebrow: 'departure',
        title: 'Return Path',
        stopIds: ['shrines-amman', 'shrines-nataraja'],
      },
    ],
  },

  entrances: {
    id: 'entrances',
    eyebrow: 'thresholds',
    title: 'Temple entrances',
    overview: {
      intro: [
        'Standing outside the Eastern side of the temple walls observe the three main gateways (**Tiruvasal**) with their towers (**Gopuram**) that are used to enter the temple complex.',
      ],
      paragraphs: [
        'Standing outside the Eastern side of the temple walls observe the three main gateways (**Tiruvasal**) with their towers (**Gopuram**) that are used to enter the temple complex.',
      ],
      cards: [
        {
          title: 'Gopura and vimana',
          collapsible: true,
          body: 'In South Indian temples, the gateway **Gopuras** are typically taller than the main temple tower (**Vimana**), but in the Brihadishwara temple, it is the other way around. **Rajaraja wanted the main Vimana** to stand tall as a tribute to **Lord Shiva**.',
        },
        {
          title: 'Four additional entrances',
          collapsible: true,
          body: 'While these three gateways form the main entrance to the temple, there are **4 additional entrances** through the inner and outer walls that were used by the townspeople, artists and dancers who approached the temple from different parts of the town.',
        },
      ],
      notes: [
        {
          kind: 'did-you-know' as const,
          title: 'Sealed tunnels',
          body: 'There were also over a hundred underground tunnels connecting the temple to the **Thanjavur palace** and other parts of the city. The royal families used the tunnels to access the temple for daily worship but used the main entrances during ceremonial processions. It is speculated that some of the tunnels were intended to help the royal family flee from enemies, while other tunnels led to dead ends to confuse invaders. Due to safety concerns, all these underground tunnels have now been permanently sealed.',
        },
      ],
      image: {
        src: '/assets/explore/4-1-temple-entrances/2-fortification-wall.jpg',
        alt: 'Fortification wall and eastern approach to the temple',
          title: 'Fortification walls'
      },
    },

    maratha: {
      mapNum: 1,
      title: 'Maratha Entrance',
      orientation:
        'The outermost entrance to the temple, the **Maratha entrance**, was built by Maratha king **Serfoji II in the year 1801 CE**. This {{18-foot-tall (5.5 m)}} arch built of strong **red brick and lime mortar** has stairs on both sides that connect it to the temple fortification walls.',
      intro: [
        'The outermost entrance to the temple, the **Maratha entrance**, was built by Maratha king **Serfoji II in the year 1801 CE**.',
      ],
      paragraphs: [
        'The outermost entrance to the temple, the **Maratha entrance**, was built by Maratha king **Serfoji II in the year 1801 CE**. This {{18-foot-tall (5.5 m)}} arch built of strong **red brick and lime mortar** has stairs on both sides that connect it to the temple fortification walls.',
        'The top of the arch contains images of **Shiva** and **Parvathi**. There are two small shrines on either side of the gate dedicated to **Ganesha** and **Subrahmanya**, the sons of **Shiva** and **Parvathi**.',
      ],
      stats: [
        { label: 'Built', value: '1801 CE' },
        { label: 'Height', value: '18 ft / 5.5 m' },
        { label: 'Material', value: 'Red brick & lime' },
      ],
      notes: [
        {
          kind: 'architecture' as const,
          body: 'This {{18-foot-tall (5.5 m)}} arch built of strong **red brick and lime mortar** has stairs on both sides that connect it to the temple fortification walls.',
        },
        {
          kind: 'observe' as const,
          title: 'Shiva, Parvathi, and side shrines',
          body: 'The top of the arch contains images of **Shiva** and **Parvathi**. There are two small shrines on either side of the gate dedicated to **Ganesha** and **Subrahmanya**, the sons of **Shiva** and **Parvathi**.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-1-temple-entrances/1-maratha-entrance.png',
          alt: 'Maratha entrance arch built of red stone',
          title: 'Maratha entrance'
        },
      ],
    },

    keralantakan: {
      mapNum: 2,
      title: 'Keralantakan Tiruvasal',
      orientation:
        '**Around 988 CE**, **Rajaraja** fought the **Cheras** in an epic battle at the southeastern towns of **Kanthaloor** and **Kollam** and brought the entire Kerala region under his rule. He spent all the wealth acquired in this victory on the Brihadishwara temple and named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory. This {{94 × 57 ft (29 × 17 m)}} entrance served as the **Rajagopuram** (royal gateway) to the temple.',
      paragraphs: [
        '**Around 988 CE**, **Rajaraja** fought the **Cheras** in an epic battle at the southeastern towns of **Kanthaloor** and **Kollam** and brought the entire Kerala region under his rule. He spent all the wealth acquired in this victory on the Brihadishwara temple and named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory.',
        'This {{94 × 57 ft (29 × 17 m)}} entrance served as the **Rajagopuram** (royal gateway) to the temple.',
      ],
      stats: [
        { label: 'Footprint', value: '94 × 57 ft' },
        { label: 'Metric', value: '29 × 17 m' },
      ],
      facts: [
        {
          label: 'Rajagopuram',
          detail:
            'This {{94 × 57 ft (29 × 17 m)}} entrance served as the **Rajagopuram** (royal gateway) to the temple.',
        },
      ],
      notes: [],
      images: [
        {
          src: '/assets/explore/4-1-temple-entrances/3-keralanthaka-entrance.jpg',
          alt: 'Keralantakan Tiruvasal gateway with sculpted tiers',
          title: 'Keralantakan Tiruvasal'
        },
      ],
      observe: {
        title: 'What to Observe',
        views: [
          {
            id: 'east-face',
            title: 'Eastern face — dancers in stone',
            body: 'Looking up at the gateway from the front (eastern side), some of the prominent sculptures you see on the first level are the **Natanakali** (dancing Kali) on the left and **Urdhva Thandavamsivan** (dancing Shiva) on the right. There are also many fine examples of **Dwarapalakas** (celestial door keepers) and **Koorai Thangiyar** (ceiling bearers) on the different levels of this gate. The base of the gateway contains a large number of inscriptions.',
            showInscriptionsCallout: true,
          },
          {
            id: 'threshold',
            title: 'Through the polished threshold',
            body: 'Walk into the gateway and observe the {{4 × 3 × 36 ft (1.2 × 0.9 × 11 m)}} finely buffed, single-piece side stones that support the five-level **Gopuram** with its intricate sculptures.',
            stats: [
              { label: 'Side stone', value: '4 × 3 × 36 ft' },
              { label: 'Metric', value: '1.2 × 0.9 × 11 m' },
              { label: 'Gopuram levels', value: '5' },
            ],
            image: {
              src: '/assets/explore/4-1-temple-entrances/5-side-stones.jpg',
              alt: 'Finely buffed single-piece side stones supporting the gopuram',
              title: 'Side stones',
            },
          },
          {
            id: 'west-face',
            title: 'Western tiers — myths in relief',
            body: 'Turn and look back at the western (back) side of the entrance — narrative sculptures climb the tiers above the passage.',
            topics: [
              {
                title: 'Krishna and Narasimha',
                body: 'On the first level you see **Krishna** playing with **Gopikas** (cowherds) under a tree on the left-hand side and **Narasimha** (avatar of **Lord Vishnu**) killing **Hiranyan** on the right side of the second level.',
              },
              {
                title: 'Brahma and Vishnu',
                body: 'Other sculptures show **Brahma** and **Vishnu** and their consorts in various seated and standing positions.',
              },
            ],
          },
        ],
      },
      inscriptionsCallout: {
        title: 'Stone as archive',
        intro: [
          'Inscriptions cover the surfaces of many ancient Indian temples and monuments.',
        ],
        paragraphs: [
          'Inscriptions cover the surfaces of many ancient Indian temples and monuments. It is estimated that there are **60,000** such inscriptions, with over **44,000** in South India alone. Chola-era inscriptions account for **18,000** out of a total of **28,000** Tamil inscriptions.',
          'There are hundreds of inscriptions carved into the entrance gateways, the base of the main shrine, and other areas of the temple. These are in ancient Tamil script and in **Grantha** (an ancient Brahmic script used in Tamil Nadu and Kerala to write Sanskrit) and recount battles and victories, as well as writings on Chola life, land ownership, and administrative matters.',
          'Some inscriptions serve as a record of temple workers, including builders, priests, sculptors, painters, musicians, and dancers. Temple officials and workers were paid in land grants that were also recorded as part of the inscriptions.',
        ],
        stats: [
          { label: 'Inscriptions (India)', value: '60,000' },
          { label: 'South India', value: '44,000+' },
          { label: 'Chola-era', value: '18,000' },
        ],
        cards: [
          {
            title: 'Scale of the archive',
            body: 'It is estimated that there are **60,000** such inscriptions, with over **44,000** in South India alone. Chola-era inscriptions account for **18,000** out of a total of **28,000** Tamil inscriptions.',
          },
          {
            title: 'What they record',
            body: 'There are hundreds of inscriptions carved into the entrance gateways, the base of the main shrine, and other areas of the temple. These are in ancient Tamil script and in **Grantha** (an ancient Brahmic script used in Tamil Nadu and Kerala to write Sanskrit) and recount battles and victories, as well as writings on Chola life, land ownership, and administrative matters.',
          },
          {
            title: 'Temple workers',
            body: 'Some inscriptions serve as a record of temple workers, including builders, priests, sculptors, painters, musicians, and dancers. Temple officials and workers were paid in land grants that were also recorded as part of the inscriptions.',
          },
        ],
        image: {
          src: '/assets/explore/4-1-temple-entrances/4-inscription.jpg',
          alt: 'Ancient Tamil and Grantha inscriptions on gateway stone',
          title: 'Inscriptions'
        },
      },
    },

    rajarajan: {
      mapNum: 3,
      title: 'Rajarajan Tiruvasal',
      orientation:
        'The third gateway, the **Rajarajan Tiruvasal**, is {{88 × 57 ft (27 × 17.25 m)}} and consists of a three-tiered ornamental **Gopuram** (tower) that sits atop a {{7-foot (2 m)}} tall plinth and {{20-foot (6 m)}} tall base with carvings in **Shaivite** and **Puranic** themes. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).',
      intro: [
        'The third gateway, the **Rajarajan Tiruvasal**, is {{88 × 57 ft (27 × 17.25 m)}} and consists of a three-tiered ornamental **Gopuram** (tower) that sits atop a {{7-foot (2 m)}} tall plinth and {{20-foot (6 m)}} tall base with carvings in **Shaivite** and **Puranic** themes.',
      ],
      paragraphs: [
        'The third gateway, the **Rajarajan Tiruvasal**, is {{88 × 57 ft (27 × 17.25 m)}} and consists of a three-tiered ornamental **Gopuram** (tower) that sits atop a {{7-foot (2 m)}} tall plinth and {{20-foot (6 m)}} tall base with carvings in **Shaivite** and **Puranic** themes. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).',
      ],
      stats: [
        { label: 'Footprint', value: '27 × 17.25 m' },
        { label: 'Plinth height', value: '2 m' },
        { label: 'Base height', value: '6 m' },
      ],
      facts: [
        {
          label: 'Connected to',
          detail:
            'It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).',
        },
        {
          label: 'Carving themes',
          detail:
            'The plinth and base carry carvings in **Shaivite** and **Puranic** themes.',
        },
      ],
      notes: [],
      cards: [
        {
          title: 'First level',
          collapsible: true,
          body: 'On the east side of the entrance, on the first level, from left to right, you see a seated **Parvati**, **Vallabha Ganapathi** with ten arms, **Rishabha Vahanar** seated on a bull, **Indra** riding an elephant, **Agni**, and **Murugan** seated on a peacock, along with the ceiling bearers.',
        },
        {
          title: 'Second level',
          collapsible: true,
          body: 'On the second level there are several **Chandrasekaramurthis** (forms of Shiva) and beautiful round decorative structure in the Buddhist decorative style atop the windows.',
        },
        {
          title: 'Third level',
          collapsible: true,
          body: 'On the third level **Uma Maheswari** is depicted seated on **Shiva\'s lap** in the Center round structure.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-1-temple-entrances/6-rajaraja-thiruvasal.jpg',
          alt: 'Rajarajan Tiruvasal three-tiered inner gateway',
          title: 'Rajarajan Tiruvasal'
        },
      ],
      dwarapalaka: {
        title: 'The door guards',
        intro: [
          'The imposing {{18-foot (5.5 m)}} **Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture!',
        ],
        paragraphs: [
          'The imposing {{18-foot (5.5 m)}} **Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture! The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python large enough to swallow an elephant. With his top left hand pointing into the temple, the **Dwarapalaka** tells the visitor that his might and power comes from the omnipotent **Lord Shiva** inside the temple.',
          'The **Dwarapalaka** on the right side appears to have a look of astonishment on his face as if to say, “Have you seen the amazing temple within these gates?” while making a gesture with his right hand to welcome visitors inside.',
        ],
        stats: [
          { label: 'Height', value: '5.5 m' },
        ],
        cards: [
          {
            title: 'Left Dwarapalaka',
            body: 'The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python large enough to swallow an elephant. With his top left hand pointing into the temple, the **Dwarapalaka** tells the visitor that his might and power comes from the omnipotent **Lord Shiva** inside the temple.',
          },
          {
            title: 'Right Dwarapalaka',
            body: 'The **Dwarapalaka** on the right side appears to have a look of astonishment on his face as if to say, “Have you seen the amazing temple within these gates?” while making a gesture with his right hand to welcome visitors inside.',
          },
        ],
        image: {
          src: '/assets/explore/4-1-temple-entrances/7-dwarapalaka.jpg?v=3',
          alt: 'Chola Dwarapalaka door guard sculpture at Rajarajan Tiruvasal',
          title: 'Dwarapalakas'
        },
      },
    },
  },

  cloisters: {
    id: 'cloisters',
    eyebrow: 'Outer corridor',
    title: 'Thiruchutru Maligai',
    overview: {
      intro: [
        'The temple has a massive colonnaded cloister, **Thiruchutru Maligai**, built under the supervision of **Krishnan Raman**, **Rajaraja\'s military commander**. This **1500-foot** perimeter encircles the entire temple complex and offers shelter and shade as devotees perform the traditional three **parikramas** or circumambulations of the temple.',
      ],
      paragraphs: [
        'The temple has a massive colonnaded cloister, **Thiruchutru Maligai**, built under the supervision of **Krishnan Raman**, **Rajaraja\'s military commander**. This **1500-foot** perimeter encircles the entire temple complex and offers shelter and shade as devotees perform the traditional three **parikramas** or circumambulations of the temple.',
      ],
      stats: [
        { label: 'Perimeter', value: '1500 ft' },
        { label: 'East to west', value: '790 ft (240.79 m)' },
        { label: 'North to south', value: '400 ft (121.92 m)' },
      ],
      facts: [
        {
          label: 'Two stacked squares',
          detail:
            'The **Thiruchutru Maligai** creates a perfect rectangle that is almost exactly two stacked squares, **790 ft** (240.79 m) long east to west, and **400 ft** (121.92 m) wide north to south, with the main temple aligned perfectly in the middle of the western square.',
        },
      ],
      cards: [
        {
          title: 'Nandis and statues',
          body: 'A row of small seated **Nandis** (bulls) adorn the top of the **Thiruchutru Maligai** walls on all four sides. Statues and sculptures representing **Lord Shiva and other gods** line the inside of the cloister. In some sections, particularly on the northern side, the walls of the cloister feature frescos from the **Nayaka and Maratha periods**.',
        },
        {
          title: 'Protective barriers',
          collapsible: true,
          body: 'Many of the statues and frescos have been placed inside protective barriers along the **Thiruchutru Maligai** – an unfortunate but necessary measure to protect these ancient and fragile objects from wear and tear and vandalism.',
        },
      ],
      notes: [
        {
          kind: 'tip' as const,
          title: 'Start clockwise',
          body: 'Visitors start their circumambulation here from the **Rajarajan Tiruvasal** going clockwise as is the Hindu tradition.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/1-rectangle.png?v=3',
          alt: 'Diagram of the Thiruchutru Maligai rectangular cloister layout',
          title: 'Perfect rectangle that is almost exactly two stacked squares'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/2-seated-nandi.jpg?v=5',
          alt: 'Row of small seated Nandi bulls atop the cloister wall',
          title: 'Row of small seated Nandis'
        },
      ],
      inscriptionsCallout: {
        title: 'A public ledger',
        intro: [
          'A public ledger carved in granite: one of the richest documentary records of any pre-modern South Asian institution.',
        ],
        paragraphs: [
          'A public ledger carved in granite: one of the richest documentary records of any pre-modern South Asian institution.',
          'Inscriptions along the temple complex record land grants, temple workers, administration, and daily life — a documentary archive cut into stone.',
        ],
        image: {
          src: '/assets/explore/4-1-temple-entrances/4-inscription.jpg',
          alt: 'Ancient Tamil and Grantha inscriptions on temple stone',
          title: 'Inscriptions',
        },
      },
    },

    east: {
      title: 'East Cloister Wall',
      orientation:
        'The small section of the eastern cloister immediately to the left of the **Rajarajan Tiruvasal** contains a row of **Shiva Lingams**. **Rajaraja** and subsequent rulers are said to have brought many of these from different parts of southern India when they returned from military campaigns or travels.',
      notes: [
        {
          kind: 'did-you-know' as const,
          title: 'Shiva Lingam',
          body: 'A **Shiva Lingam** is an abstract representation of the Hindu god **Shiva**, made up of a short cylindrical pillar, typically atop a round base.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/11-east-cloister-lingams.jpg?v=3',
          alt: 'Row of Shiva Lingams in the eastern cloister near Rajarajan Tiruvasal',
          title: 'East Cloister Lingams',
        },
      ],
    },

    south: {
      mapNum: 6,
      title: 'South Cloister Wall',
      orientation:
        'On the southeast corner of the cloister is the temple kitchen with a large, roofed courtyard and well.',
      intro: [
        'On the southeast corner of the cloister is the temple kitchen with a large, roofed courtyard and well.',
      ],
      paragraphs: [
        'On the southeast corner of the cloister is the temple kitchen with a large, roofed courtyard and well.',
        'Continue your circumambulation to the back of the cloister (west side). This section of the cloister is **currently (2026)** closed off due to ongoing restoration work.',
      ],
      notes: [
        {
          kind: 'observe' as const,
          title: 'West side restoration',
          body: 'Continue your circumambulation to the back of the cloister (west side). This section of the cloister is **currently (2026)** closed off due to ongoing restoration work.',
        },
      ],
      cards: [
        {
          title: 'A thousand-year kitchen',
          collapsible: true,
          body: 'This kitchen started functioning the day before the original consecration of the temple and has been in operation ever since. This is the only known temple kitchen in use for more than a thousand years, providing a variety of traditional dishes that are used for daily **prasadam** (offerings for the Gods and distributed to worshipers).',
        },
        {
          title: 'Agni',
          body: 'Inside the kitchen you see an **8-foot-tall** sculpture of **Agni**, the fire God, now in a slightly damaged condition.',
        },
        {
          title: 'Ancient carved pillars',
          body: 'The first section of the southern cloister is unadorned, but the row of ancient carved pillars makes for a stunning visual. Visitors and devotees can be seen sitting in the shade of this section, eating **prasadam** (offering to the Gods) and visiting with family and acquaintances.',
        },
        {
          title: 'Temple Tree',
          body: '**Temple Tree:** All South Indian temples have a sacred tree associated with that temple (**sthala vriksham**) and the **Vanni** (**Prosopis cineraria**) and **Sarakonnai** (**Cassia Fistula**) serve as the Brihadishwara temple trees.',
        },
        {
          title: 'Chola Nandi',
          body: 'In the middle of the southern cloister, next to the **Varahi Amman** shrine (map reference **5**) is a very interesting statue of **Nandi**. Some historians believe that this **Nandi** was carved during **Rajaraja\'s time** and was intended to be placed at the location of the current **Nandi Mandapam** (Map reference **4**) but for some reason was moved to the southern side of the cloister.',
        },
        {
          title: 'Temple Museum and processional statues',
          collapsible: true,
          body: 'Further along the southern cloister is the **Temple Museum**, a short section of the Cloister that contains several **Chola** and later period sculptures. A large stone water tank is seen at the end of this section. The cloister then leads into the barrel-roofed **Interpretation Center** (Map: **8**) that contains a wealth of information about the temple, sculptures and frescos. Beyond the **Interpretation Center** are a set of statues that are used in ceremonial processions during temple festivals and holy days.',
        },
        {
          title: 'Roof rings and physicians',
          body: 'While not visible from the ground, there are said to be rings set into the walls atop the flat roof of the southern cloister. It is speculated that these rings were used to hold poles for tents under which physicians and other medical practitioners held advisory sessions for townspeople.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/3-temple-kitchen.jpg',
          alt: 'Temple kitchen courtyard with roofed structure',
          title: 'Temple Kitchen'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/4-agni-sculpture.jpg?v=3',
          alt: 'Eight-foot sculpture of Agni the fire god in the temple kitchen',
          title: 'Sculpture of Agni'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/5-ancient-carved-pillars.jpg?v=3',
          alt: 'Ancient carved pillars along the southern cloister',
          title: 'Ancient carved pillars'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/12-temple-tree.jpg?v=3',
          alt: 'Sacred temple tree with supported limbs in the southern cloister',
          title: 'Temple Tree'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/7-chola-nandi.png',
          alt: 'Chola-era Nandi statue in the southern cloister',
          title: 'Statue of Nandi'
        },
      ],
    },

    museum: {
      mapNum: 8,
      title: 'Interpretation Centre',
      placeholder: false,
      orientation:
        'The barrel-roofed **Interpretation Center** sits in the middle of the southern wall of the **Thiruchutru Maligai** and contains a wealth of information about the temple construction, sculptures and frescos.',
      intro: [
        'The barrel-roofed **Interpretation Center** sits in the middle of the southern wall of the **Thiruchutru Maligai** and contains a wealth of information about the temple construction, sculptures and frescos.',
      ],
      paragraphs: [
        'The barrel-roofed **Interpretation Center** sits in the middle of the southern wall of the **Thiruchutru Maligai** and contains a wealth of information about the temple construction, sculptures and frescos. One of the most interesting exhibits on view are the original **Nayaka frescos** that were removed intact from the inner circumambulatory passage of the **Vimana**. The deep rich colors of these **17th century** paintings provide a wonderful view into the skill of the artists who created these **300-year-old** works of art.',
        'In addition, replicas of the ancient **1000-year Chola frescos** and dance sculptures (**Karanas**) that are inside the inner circumambulatory passage (closed to visitors) may be viewed in the **Interpretation Center**.',
      ],
      cards: [
        {
          title: 'Nayaka fresco exhibits',
          collapsible: true,
          body: 'One of the most interesting exhibits on view are the original **Nayaka frescos** that were removed intact from the inner circumambulatory passage of the **Vimana**. The deep rich colors of these **17th century** paintings provide a wonderful view into the skill of the artists who created these **300-year-old** works of art.',
        },
        {
          title: 'Chola fresco and Karana replicas',
          collapsible: true,
          body: 'Replicas of the ancient **1000-year Chola frescos** and dance sculptures (**Karanas**) that are inside the inner circumambulatory passage (closed to visitors) may be viewed in the **Interpretation Center**.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/13-interpretation-centre.jpg?v=3',
          alt: 'Original Nayaka fresco exhibit in the Interpretation Centre',
          title: 'Interpretation Centre',
        },
      ],
    },

    north: {
      mapNum: 13,
      title: 'West and North Cloister Wall',
      orientation:
        'Complete your circumambulation, finishing at the **Rajarajan Tiruvasal** where you started.',
      intro: [
        'Complete your circumambulation, finishing at the **Rajarajan Tiruvasal** where you started.',
      ],
      paragraphs: [
        'Complete your circumambulation, finishing at the **Rajarajan Tiruvasal** where you started.',
      ],
      stats: [
        { label: 'Lingams', value: '108' },
        { label: 'Frescos', value: '17th–18th century' },
      ],
      cards: [
        {
          title: 'West-side lingams',
          body: 'The west side of the cloister at the back of the temple complex contains many rows of polished granite **Shiva Lingams from post-Chola rulers**, interspersed with small shrines dedicated to **Lord Shiva and other gods**.',
        },
        {
          title: 'Small stone Nandis',
          body: 'Small stone **Nandis** are placed in front of some of these shrines.',
        },
        {
          title: 'Kubera and Vayuraja',
          body: 'The West and North cloister has several small shrines dedicated to gods and goddesses who are not represented elsewhere in the temple, including a statue of **Kubera** (God of Wealth and one of the **Ashta-Dikpalas** or guardians of the 8 directions) in a seated position with lions surrounding him, and a statue of **Vayuraja** (God of the Winds) in sitting position with deer surrounding him in the north-west corner.',
        },
        {
          title: 'Maratha frescos',
          body: 'One of the most notable sights in the West and North Cloister are the beautiful **17th–18th century** wall frescos from the **Maratha period**. These vibrant paintings show scenes from Hindu mythology, courtly and everyday life.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/9-108-polished-lingams.jpg',
          alt: 'Rows of polished granite Shiva Lingams along the west cloister',
          title: 'West-side lingams'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/10-nandis-shrines.jpg?v=4',
          alt: 'Small stone Nandis placed in front of west and north cloister shrines',
          title: 'Small stone Nandis'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/8-vayu.jpg?v=4',
          alt: 'Statue of Vayuraja god of winds with deer in the northwest corner',
          title: 'Vayuraja'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/13-nayaka-fresco.jpg?v=3',
          alt: '17th–18th century Maratha period wall fresco in the north cloister',
          title: 'Wall frescos'
        },
        {
          src: '/assets/explore/4-2-thiruchutru-maligai/12-nayaka-fresco.jpg?v=3',
          alt: 'Maratha period fresco detail in the west and north cloister',
          title: 'Maratha fresco'
        },
      ],
    },
  },

  nandi: {
    id: 'nandi',
    mapNum: 4,
    title: 'Nandi Mandapam',
    lead: 'One of India\'s largest monolithic Nandi bulls',
    orientation:
      'Within the main temple complex, the first structure is the pillared **Nandi Mandapam** (Hall of the Nandi bull).',
    intro: [
      '**Nandi**, the sacred bull, is the **vahana** (mount) of **Lord Shiva**. **Nandi** statues are found in Shiva temples typically facing the main shrine as they serve as a guardian and an intermediary for devotees seeking **Lord Shiva\'s blessings**.',
      'The **Nandi Mandapam** is dominated by the statue of one of the largest monolithic **Nandi** in India. The robust, youthful bull with its tongue tucked over the upper lip and head tilted to the right, looks as if it is keenly listening to **Rajarajeeswara**.',
    ],
    paragraphs: [
      'Within the main temple complex, the first structure is the pillared **Nandi Mandapam** (Hall of the Nandi bull). **Nandi**, the sacred bull, is the **vahana** (mount) of **Lord Shiva**. **Nandi** statues are found in Shiva temples typically facing the main shrine as they serve as a guardian and an intermediary for devotees seeking **Lord Shiva\'s blessings**.',
      'The **Nandi Mandapam** is dominated by the statue of one of the largest monolithic **Nandi** in India. The robust, youthful bull with its tongue tucked over the upper lip and head tilted to the right, looks as if it is keenly listening to **Rajarajeeswara**.',
    ],
    stats: [
      { label: 'Height', value: '12 ft / 3.65 m' },
      { label: 'Size', value: '20 × 8.5 ft' },
      { label: 'Weight', value: '25 tons' },
      { label: 'Source', value: 'Pachaimalai, 137 km' },
    ],
    facts: [
      {
        label: 'Single block',
        detail:
          'Carved from a single block of stone said to have been brought from **Pachaimalai**. This {{3.65 m (12 ft)}} tall, {{5.94 × 2.59 m (20 × 8.5 ft)}} statue weighs **25 tons**. Historians and archaeologists have long marveled at the effort and ingenuity it must have taken to source and transport a stone of this size and weight.',
      },
    ],
    cards: [
      {
        title: 'Dating debate',
        collapsible: true,
        body: 'The general consensus is that this **Nandi statue** was installed during the **Nayaka period** and that the original **Chola Nandi** was moved to its current location on the southern side of the cloister. This theory is based on the similarity of the Chola **Nandi** to the other **Nandi statues** on the main **Vimana**. Adding further speculation to the **Nandi statue\'s** story, a huge unfinished **Nandi statue** was found in the town of **Sanyasikuppam** which is on the way to **Thanjavur** from the stone quarries of **Thiruvakkarai** where many Chola sculptures were created. This unfinished **Nandi** appears to have fallen and broken during transit and may have caused **Rajaraja Chola** to have another smaller statue created in time for the temple consecration.',
      },
      {
        title: 'Yali pillars',
        body: 'The **16-pillared mandapam** surrounding the **Nandi statue** was added around the **16-17th century** during the time of the **Nayakas**. The pillars feature **Yali** (a mythological creature with the head and the body of a lion and trunk and the tusks of an elephant) as well as images of **Nayaka kings**.',
      },
    ],
    notes: [
      {
        kind: 'observe' as const,
        title: 'Ceiling frescos',
        body: 'Climb up to the raised platform and look up at the ceiling with its colorful frescos painted during the **Maratha rule**.',
      },
    ],
    dhwaja: {
      title: 'Dhwaja stambham',
      intro:
        'Behind the **Nandi Mandapam** is the beautiful bronze covered **dhwaja stambham**, the tall, sacred flagstaff that was added during the time of the **Nayakas**. It serves as a symbolic marker of the deity\'s presence and spiritual authority, with devotees offering respects to it before entering the sanctum.',
    },
    images: [
      {
        src: '/assets/explore/4-3-nandi-mandapam/1-nandi-mandapam.jpg?v=4',
        alt: 'Pillared Nandi Mandapam hall with monolithic bull statue',
        title: 'Nandi Mandapam',
      },
      {
        src: '/assets/explore/4-3-nandi-mandapam/2-nandi-tongue.jpg?v=4',
        alt: 'Close view of the Nandi bull with tongue tucked over upper lip',
        title: 'Tongue tucked over the upper lip',
      },
      {
        src: '/assets/explore/4-3-nandi-mandapam/3-nandi-single-block.jpg?v=4',
        alt: 'Monolithic Nandi carved from a single granite block',
        title: 'Single block of stone',
      },
      {
        src: '/assets/explore/4-3-nandi-mandapam/5-yali-pillar.jpg?v=4',
        alt: 'Yali pillar sculpture on the Nandi Mandapam',
        title: 'Yali pillar',
      },
      {
        src: '/assets/explore/4-3-nandi-mandapam/6-nandi-ceiling-fresco.jpg?v=4',
        alt: 'Colorful Maratha-period ceiling fresco in the Nandi Mandapam',
        title: 'Ceiling fresco',
      },
      {
        src: '/assets/explore/4-3-nandi-mandapam/4-dwaja-stambham.jpg?v=4',
        alt: 'Bronze-covered dhwaja stambham sacred flagstaff behind Nandi Mandapam',
        title: 'Dhwaja stambham',
      },
    ],
    pullQuote: 'A single stone, a thousand years of unbroken attention toward the Lingam.',
  },

  varahi: {
    id: 'varahi',
    mapNum: 5,
    title: 'Varahi Shrine',
    orientation:
      'As you approach the main temple, you will see a small brick shrine to the left dedicated to **Varahi Amman**, one of the seven Hindu mother goddesses, who each represent feminine **Shaktis** (powers) of the male Gods. **Varahi Amman**, who is worshipped by devotees of **Shiva** and **Vishnu**, embodies the **shakti** of **Lord Vishnu** in his boar-headed (**Varaha**) incarnation. **Rajaraja and other Chola kings** sought her blessings as part of their rituals before they set off to war.',
    intro: [],
    paragraphs: [
      'As you approach the main temple, you will see a small brick shrine to the left dedicated to **Varahi Amman**, one of the seven Hindu mother goddesses, who each represent feminine **Shaktis** (powers) of the male Gods. **Varahi Amman**, who is worshipped by devotees of **Shiva** and **Vishnu**, embodies the **shakti** of **Lord Vishnu** in his boar-headed (**Varaha**) incarnation. **Rajaraja and other Chola kings** sought her blessings as part of their rituals before they set off to war.',
    ],
    notes: [
      {
        kind: 'historical-note' as const,
        title: 'Partial idol',
        body: 'The idol was partially destroyed at some point in time and only the top half remains in the shrine today. It is likely that there were individual statues and shrines dedicated to the other six mother goddesses, but only a shrine dedicated to all seven mother goddesses in the **Thiruchutru Maligai** survives to present time.',
      },
    ],
    image: {
      src: '/assets/explore/4-4-varahi-shrine/varahi-amman.jpg',
      alt: 'Varahi Amman shrine with partially preserved idol',
      title: 'Varahi Amman'
    },
  },

  mainTemple: {
    id: 'main-temple',
    mapNum: 7,
    eyebrow: 'stop 07',
    title: 'Brihadishwara Temple - Main Temple Complex',
    orientation:
      'There are four main sections: the main community hall (**Mukha Mandapam**), the great gathering hall (**Maha Mandapam**), the pavilion (**Antrala**) and the sanctum with its towering superstructure (**Sri Vimana**).',
    intro: {
      paragraphs: [
        'There are four main sections: the main community hall (**Mukha Mandapam**), the great gathering hall (**Maha Mandapam**), the pavilion (**Antrala**) and the sanctum with its towering superstructure (**Sri Vimana**).',
      ],
    },

    dakshinaKailasam: {
      title: 'Dakshina Kailasam',
      intro: [
        'On the approach to the main temple, the front of the **Vimana** (main tower) is adorned with a huge, semi-circular, high relief sculpture.',
      ],
      paragraphs: [
        'On the approach to the main temple, the front of the **Vimana** (main tower) is adorned with a huge, semi-circular, high relief sculpture. The hemispherical projected relief work is a replica of the profile of **Mount Kailash** (**Shiva\'s heavenly abode**) and features sculptures of **Shiva** and his consort **Parvati** along with their two sons, **Ganesha** and **Subrahmanya**.',
        'The relief is referred to as **Dakshina Kailasam** (Southern Kailash) and was said to have originally been covered with gold plate. It is believed that **Rajaraja Chola** may have either made a pilgrimage to **Mount Kailash** (in modern day Tibet) or received a rendering of the outline of the mountain that was used to design this relief.',
      ],
      cards: [
        {
          title: 'Profile of Mount Kailash',
          collapsible: true,
          body: 'The hemispherical projected relief work is a replica of the profile of **Mount Kailash** (**Shiva\'s heavenly abode**) and features sculptures of **Shiva** and his consort **Parvati** along with their two sons, **Ganesha** and **Subrahmanya**.',
        },
        {
          title: 'Southern Kailash',
          collapsible: true,
          body: 'The relief is referred to as **Dakshina Kailasam** (Southern Kailash) and was said to have originally been covered with gold plate. It is believed that **Rajaraja Chola** may have either made a pilgrimage to **Mount Kailash** (in modern day Tibet) or received a rendering of the outline of the mountain that was used to design this relief.',
        },
      ],
      image: {
        src: '/assets/explore/4-5-main-complex/01-profile-of-mount-kailash.jpg',
        alt: 'Dakshina Kailasam semi-circular relief replica of Mount Kailash profile on the vimana',
        title: 'Profile of Mount Kailash'
      },
    },

    halls: {
      title: 'Maha Mandapam, Mukha Mandapam, and Antrala',
      lead:
        'On the approach to the main temple and the sanctum, visitors pass through two halls: the **Mukha Mandapam** (the main community hall) and the **Maha Mandapam** (great gathering Hall). These mandapams are square structures aligned between the sanctum and the **Nandi mandapam**.',
      image: {
        src: '/assets/explore/4-5-main-complex/02-temple-cutaway.jpg?v=2',
        alt: 'Cutaway diagram showing Mukha Mandapam, Maha Mandapam, Antrala, and sanctum',
        title: 'Two halls, the Mukha Mandapam and the Maha Mandapam'
      },
      mukha: {
        title: 'Mukha Mandapam',
        intro: [
          'In the **16th century**, the **Mukha Mandapam** was built by **Pachaiyappa Nayaka** on top of a Chola platform, and **Serfoji II**, a Maratha king, constructed the steps leading up to the **Mukha Mandapam** in the **18th century**. Imposing **Dwarapalakas** guard the entrance to the **Mukha Mandapam**.',
        ],
        paragraphs: [
          'In the **16th century**, the **Mukha Mandapam** was built by **Pachaiyappa Nayaka** on top of a Chola platform, and **Serfoji II**, a Maratha king, constructed the steps leading up to the **Mukha Mandapam** in the **18th century**. Imposing **Dwarapalakas** guard the entrance to the **Mukha Mandapam**.',
          'The mandapam has six square pillars on each side topped by imposing **Simha** (lion) heads. The **Mukha Mandapam** originally served as a community hall to gather and converse before and after worship.',
        ],
        stats: [
          { label: 'Built', value: '16th century' },
          { label: 'Steps added', value: '18th century' },
          { label: 'Pillars', value: '6 × 6 with Simha heads' },
        ],
        cards: [
          {
            title: 'Simha pillars',
            body: 'The mandapam has six square pillars on each side topped by imposing **Simha** (lion) heads. The **Mukha Mandapam** originally served as a community hall to gather and converse before and after worship.',
          },
        ],
        notes: [
          {
            kind: 'observe' as const,
            title: 'Dwarapalakas',
            body: 'Imposing **Dwarapalakas** guard the entrance to the **Mukha Mandapam**.',
          },
        ],
        image: {
          src: '/assets/explore/4-5-main-complex/03-simha-head-pillars.jpg?v=2',
          alt: 'Square pillars topped by Simha lion heads in the Mukha Mandapam',
          title: 'Simha (lion) head pillars',
        },
      },
      maha: {
        title: 'Maha Mandapam',
        intro: [
          'Past the stairs towards the sanctum is the **Maha Mandapam**, a large gathering hall constructed by **Pachaiyappa Nayaka** on top of a Chola platform. The {{3.7 m (12 ft)}} **Thirupani Dwarapalakas** (gate guards) were added at the entrance by the **Nayakas** in the **17th century**. The **Maha Mandapam** was originally constructed as a **2-storey** structure, but the upper story did not withstand the ravages of time.',
        ],
        paragraphs: [
          'Past the stairs towards the sanctum is the **Maha Mandapam**, a large gathering hall constructed by **Pachaiyappa Nayaka** on top of a Chola platform. The {{3.7 m (12 ft)}} **Thirupani Dwarapalakas** (gate guards) were added at the entrance by the **Nayakas** in the **17th century**. The **Maha Mandapam** was originally constructed as a **2-storey** structure, but the upper story did not withstand the ravages of time.',
        ],
        stats: [
          { label: 'Thirupani Dwarapalakas', value: '12 ft / 3.7 m' },
          { label: 'Added', value: '17th century Nayakas' },
        ],
        cards: [
          {
            title: 'Two-storey hall',
            collapsible: true,
            body: 'The **Maha Mandapam** was originally constructed as a **2-storey** structure, but the upper story did not withstand the ravages of time.',
          },
          {
            title: 'Ashta-Dikpalas',
            collapsible: true,
            body: 'Around the hall, there were small shrines for **Ashta-Dikpalas** (guardians of the 8 directions) such as **Agni**, **Indra**, **Varuna**, and **Kubera** that were installed during the rule of **Rajendra Chola I**. Unfortunately, some of the original eight shrines and statues are now missing.',
          },
          {
            title: 'Purpose',
            collapsible: true,
            body: 'The **Maha Mandapam** serves as the great gathering hall, a designated space for large congregations within the temple complex.',
          },
        ],
      },
      antrala: {
        title: 'Ardha Mandapam or Antrala',
        intro: [
          'The **Ardha Mandapam** (half hall) or **Antrala** (entrance), is located between the **Maha Mandapam** and the sanctum sanctorum, acting as a transition space for devotees.',
        ],
        paragraphs: [
          'The **Ardha Mandapam** (half hall) or **Antrala** (entrance), is located between the **Maha Mandapam** and the sanctum sanctorum, acting as a transition space for devotees.',
        ],
        cards: [
          {
            title: 'Side reliefs',
            body: 'The **Ardha Mandapam** can also be accessed from the outside via sets of steps on the south (**Ashtamangala Vayil**) and north (**Vikrama Chola Vayil**). On the side of the steps there are reliefs of **Chandesa Anugraha Murthy**, **Daksha\'s** head chopped by **Shiva**, the **Tripuranthaka** story, in which **Lord Vishnu**, as **Buddha** and preaches to **Tripura Asuras** (demons).',
          },
          {
            title: 'Daksha\'s Beheading',
            collapsible: true,
            body: '**Sati**, daughter of King **Daksha**, wished to marry **Shiva**. **Daksha** refused, but **Shiva** appeared at her **Swayamvara**, took the garland, and married her. **Daksha** never forgave him. Later he held a **Yajna** and invited all the Gods except **Shiva** and **Sati**. When **Sati** came uninvited, **Daksha** insulted them; unable to bear the humiliation, she took her own life in the sacrificial fire. In fury, **Shiva** created **Virabhadra** and **Bhadrakali**, who killed **Daksha**—**Virabhadra** cut off his head. **Shiva** later restored **Daksha** to life with a goat\'s head. **Sati** was reborn as **Parvati** and married **Shiva** again.',
          },
          {
            title: 'The Legend of Tripuranthaka',
            collapsible: true,
            body: 'Three **Asura** brothers gained a boon of indestructibility and built **Tripura**—three cities that could only be destroyed by a single arrow, and that aligned only once in a thousand years. They soon harassed the Gods and sages. **Indra** sought **Shiva\'s** help. **Shiva** made a chariot of Earth with the sun and moon as wheels and **Brahma** as charioteer; a bow from **Mt. Meru** with **Vasuki** as the string; and an arrow of **Vishnu**, **Agni**, and **Vayu**. As **Tripura** aligned, **Shiva** as **Tripuranthaka** loosed one arrow and destroyed the cities. He then danced the **Ananda Thandava**—immortalized in **Nataraja** images that became a symbol of South Indian culture.',
          },
        ],
        images: [
          {
            src: '/assets/explore/4-5-main-complex/04a-side-steps-1.jpg?v=2',
            alt: 'Relief carving on the Antrala side steps showing an archer scene',
            title: 'Side steps relief',
          },
          {
            src: '/assets/explore/4-5-main-complex/04b-side-steps-2.jpg?v=2',
            alt: 'Relief carving on the Antrala side steps showing a ceremonial gathering',
            title: 'Side steps relief',
          },
        ],
        notes: [
          {
            kind: 'historical-note' as const,
            title: 'Underground tunnel',
            body: 'The entrance to an underground tunnel used by the royal family to access the temple from the **Thanjavur** Palace is located by the **Vikrama Chola Vayil**. However, the tunnel has been permanently closed for safety reasons.',
          },
          {
            kind: 'tip' as const,
            title: 'Exit via Ashtamangala',
            body: 'Exit the **Ardha Mandapam** using the **Ashtamangala Vayil** on the left (south side) so you can observe the majestic **Vimana** from the outside.',
          },
        ],
      },
    },

    vimana: {
      title: 'Vimana',
      intro: [
        'The Brihadishwara Temple\'s status as a living testament to the engineering prowess of the ancient **Cholas** is most embodied in the construction of the **Vimana** (the main tower above the sanctum). Standing {{66 m (216 ft)}} tall with a perfectly square {{29 × 29 m (96 × 96 ft)}} base, the **Vimana**, unlike modern counterparts, was built without any central beams or binding agents (cement) to hold it together. Instead, it relies on its unique foundation and interlocking stone architecture to provide the stability that has lasted over a thousand years and survived at least six major earthquakes, without a single degree of incline.',
      ],
      paragraphs: [
        'The Brihadishwara Temple\'s status as a living testament to the engineering prowess of the ancient **Cholas** is most embodied in the construction of the **Vimana** (the main tower above the sanctum). Standing {{66 m (216 ft)}} tall with a perfectly square {{29 × 29 m (96 × 96 ft)}} base, the **Vimana**, unlike modern counterparts, was built without any central beams or binding agents (cement) to hold it together. Instead, it relies on its unique foundation and interlocking stone architecture to provide the stability that has lasted over a thousand years and survived at least six major earthquakes, without a single degree of incline.',
      ],
      stats: [
        { label: 'Height', value: '216 ft / 66 m' },
        { label: 'Base', value: '96 × 96 ft' },
        { label: 'Foundation', value: '5.5 ft / 1.7 m' },
        { label: 'Mass', value: '130,000 tons' },
        { label: 'Capstone + Shikhara', value: '80 tons' },
        { label: 'Kalasam', value: '1010 CE' },
      ],
      facts: [
        {
          label: 'Kalasam',
          detail:
            'On the **27th day of his 25th regnal year (1010 CE)** **Rajaraja Chola** presented the {{4.4 m (14.5 ft)}} gold plated **Kalasam** (finial) to crown the **Vimana** and protect it from lightning strikes. This date, a Saturday under the auspices of the **Punarvasu** star, is also carved on the base of the **Shikhara** and is regarded as the consecration date of the temple.',
        },
      ],
      cards: [
        {
          title: 'Foundation and sandbox',
          collapsible: true,
          body: 'The foundation for this huge structure is only {{1.7 m (5.5 ft)}} deep but provides perfect stability to the **130,000-ton** superstructure as it sits on laterite and limestone layers on the bottom topped by a "sandbox" layer. This unique foundation was designed to hold **162-tons** of weight per square meter with zero settlement.',
        },
        {
          title: 'Hollow interlocking construction',
          body: 'The **Vimana** is hollow inside all the way up to the capstone and was constructed using large interlocking blocks of precisely carved granite joined by ball and socket joints and butt end type joints. The first **3** levels have straight vertical sides, and the next **13** levels gradually narrow down at a **70 degrees** angle on the sides until the top level which is {{7.3 m (24 ft)}} square. This receding format is called **Kadalikakarana**, and resembles a bunch of plantains.',
        },
        {
          title: 'Capstone and Shikhara',
          collapsible: true,
          body: 'At the top of the **Vimana** there is a single piece, flat capstone, known as **Bramarendrakkal** above the topmost level. It is fastened down with eight **10-ton Nandi** statues, that serve as counterweights at each corner. Above the capstone is a round structure called the **Shikhara** made up of eight pieces of granite joined together like an orange. Together, the capstone and **Shikhara** are said to weigh **80 tons**. According to the inscriptions found on the temple walls, the **Shikhara** was originally covered with gold plate and referred to as **Dakshina Meru** (the Southern Abode of **Lord Shiva\'s celestial home**, **Meru**, above **Mount Kailash**). Among the inscriptions on the **Shikhara**, is the name "**Azhaghi**" (Beautiful). One legend has it that **Azhaghi** was a buttermilk seller who faithfully served buttermilk every day for **6 years** to the construction workers, officials and royalty as they toiled under the blazing South Indian sun. Another legend says this inscription honors a lady who pushed **Rajaraja Chola** to safety from under a falling stone.',
        },
        {
          title: 'Raising the dome',
          collapsible: true,
          body: 'Historians, engineers and archeologists have long marveled at how the ancient **Cholas** raised the **80-ton** capstone and **Shikhara**—including the **8** sections of the **Shikhara**—up to the top of the {{66 m (216 ft)}} **Vimana** without the benefit of modern cranes. It is speculated that the **Cholas** built a **4-mile-long** mud and stone ramp up to the top of the **Vimana** and transported these enormous pieces of granite up to the top using man and elephant power.',
        },
      ],
      notes: [
        {
          kind: 'did-you-know' as const,
          title: 'Azhaghi',
          body: 'Among the inscriptions on the **Shikhara**, is the name "**Azhaghi**" (Beautiful). One legend has it that **Azhaghi** was a buttermilk seller who faithfully served buttermilk every day for **6 years** to the construction workers, officials and royalty as they toiled under the blazing South Indian sun. Another legend says this inscription honors a lady who pushed **Rajaraja Chola** to safety from under a falling stone.',
        },
        {
          kind: 'observe' as const,
          title: 'Sculptural Ornamentation',
          body: 'Sculptural ornamentation on all sides of the **Vimana** reinforces its symmetry. The first **7** stories place deities and human figures at the center of each face; the upper stories are covered in intricate carvings. Level one holds **Shiva** and other deities in ornamental niches; level two has **32** large **Tripuranthaka** sculptures (**Shiva** destroying the three demonic cities of **Tripura**)—a form **Rajaraja** especially revered, and one shown elsewhere in the temple as well.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-5-main-complex/04-vimana-cross-section.jpg',
          alt: 'Cross-section diagram of the vimana showing hollow interior and tiered structure',
          title: '216-foot tall with a perfectly square 96-foot x 96-foot base'
        },
        {
          src: '/assets/explore/4-5-main-complex/05-hollow-dome.jpg',
          alt: 'Interior view showing the hollow dome of the vimana up to the capstone',
          title: 'Hollow inside'
        },
        {
          src: '/assets/explore/4-5-main-complex/06-capstone-shikara.png?v=4',
          alt: 'Capstone Bramarendrakkal and Shikhara at the top of the vimana',
          title: 'Capstone and Shikhara, together said to weigh 80 tons'
        },
        {
          src: '/assets/explore/4-5-main-complex/07-sculptural-ornamentation.jpg?v=6',
          alt: 'Sculptural ornamentation on the tiers of the vimana',
          title: 'Sculptural ornamentation'
        },
      ],
    },

    exteriorSculptures: {
      title: 'Exterior sculptures',
      lead:
        'Exit the **vimana** on the south side and walk the exterior niches clockwise around the tower.',
      intro: [
        'Exit the **vimana** on the south side and walk the exterior niches clockwise around the tower.',
      ],
      stats: [
        { label: 'Tripuranthaka sculptures', value: '32' },
      ],
      gallery: [
        {
          src: '/assets/explore/4-5-main-complex/08-ganesha.jpg?v=4',
          alt: 'Ganesha sculpture on the south side of the vimana',
          title: 'Ganesha',
          intro:
            'As you exit the **vimana** on the south side you see sculptures of **Ganesha** (the elephant headed god) on the right of the entrance door.'
        },
        {
          src: '/assets/explore/4-5-main-complex/09-bhikshtana.jpg?v=3',
          alt: 'Bhikshatana mendicant form of Shiva sculpture',
          title: 'Bhikshatana',
          intro:
            'To the left is a sculpture of **Bhikshatana** (**mendicant form of Shiva**).'
        },
        {
          src: '/assets/explore/4-5-main-complex/10-nataraja.jpg?v=4',
          alt: 'Nataraja Shiva as Lord of Dance in south corner niche',
          title: 'Nataraja',
          intro:
            'At the corner of the south side is a niche holding a sculpture of **Nataraja** (**Shiva as the Lord of Dance**).'
        },
        {
          src: '/assets/explore/4-5-main-complex/11-harihara.jpg?v=3',
          alt: 'Harihara hybrid of Vishnu and Shiva sculpture on rear of vimana',
          title: 'Harihara',
          intro:
            'Around to the rear of the **Vimana** are the niches that feature **Harihara** (hybrid of **Vishnu and Shiva**).'
        },
        {
          src: '/assets/explore/4-5-main-complex/12-lingodhbava.jpg?v=3',
          alt: 'Lingodbhava sculpture of Shiva emerging from pillar of fire',
          heading: 'Lingodbhava & Vishnu',
          title: 'Lingodbhava',
          intro:
            '**Lingodbhava** (**Shiva emerging from a pillar of fire**) and **Vishnu**.',
          pairLead: true
        },
        {
          src: '/assets/explore/4-5-main-complex/13-vishnu.jpg?v=3',
          alt: 'Vishnu sculpture on the rear of the vimana',
          title: 'Vishnu'
        },
        {
          src: '/assets/explore/4-5-main-complex/14-ardhanarishwara.jpg?v=3',
          alt: 'Ardhanarisvara half-Shiva half-Parvati on the northern wall',
          title: 'Ardhanarisvara',
          intro:
            'The Northern wall of the **Vimana** features **Ardhanarisvara** (**half-Shiva, half-Parvati**).'
        },
        {
          src: '/assets/explore/4-5-main-complex/15-shiva-parvati.jpg?v=3',
          alt: 'Shiva and Parvati sculpture on the northern wall',
          title: 'Shiva and Parvati',
          intro:
            'On the right side of the entrance door is another niche with **Shiva** and **Parvati**.'
        },
        {
          src: '/assets/explore/4-5-main-complex/16-mahishasuramardhini.jpg?v=6',
          alt: 'Mahishasuramardhini Durga with foot on buffalo head',
          title: 'Mahishasuramardhini',
          intro:
            'On the left side is a wonderful representation of the goddess **Durga in the form of Mahishasuramardhini** with her foot the head of a buffalo.'
        },
        {
          src: '/assets/explore/4-5-main-complex/17-man-with-headwear.jpg',
          alt: 'Limestone carving of a man with distinctive headwear above the third level',
          title: 'Man with distinctive headwear',
          intro:
            'Just before the **Vikrama Chola Vayil** (north side entrance to the **Vimana**) is one of the most mysterious carvings in the temple. Just above the **3rd level** is a unique limestone carving of a man with distinctive headwear and a collared shirt. It has been speculated that this carving may represent a **Dutchman** or **Kublai Khan** added during the **Nayaka period**, or possibly be a **Frenchman** added during the **Maratha period**. On the same side is another sculpture of a kneeling lady who appears Grecian with her long curly locks of hair.'
        },
      ],
      note:
        'Just before the **Vikrama Chola Vayil** (north side entrance to the **Vimana**) is one of the most mysterious carvings in the temple. Just above the **3rd level** is a unique limestone carving of a man with distinctive headwear and a collared shirt. It has been speculated that this carving may represent a **Dutchman** or **Kublai Khan** added during the **Nayaka period**, or possibly be a **Frenchman** added during the **Maratha period**. On the same side is another sculpture of a kneeling lady who appears Grecian with her long curly locks of hair.',
      notes: [
        {
          kind: 'did-you-know' as const,
          title: 'Kneeling lady',
          body: 'On the same side is another sculpture of a kneeling lady who appears Grecian with her long curly locks of hair.',
        },
      ],
    },

    waterspouts: {
      title: 'Waterspouts',
      intro: [
        'Around the **Vimana**, there are beautifully carved waterspouts that channel water and milk away from the sanctum after **abhishekam** (bathing or anointing the Gods).',
      ],
      paragraphs: [
        'Around the **Vimana**, there are beautifully carved waterspouts that channel water and milk away from the sanctum after **abhishekam** (bathing or anointing the Gods).',
      ],
      notes: [
        {
          kind: 'architecture' as const,
          title: 'Architecture Highlight',
          body: 'Around the **Vimana**, there are beautifully carved waterspouts that channel water and milk away from the sanctum after **abhishekam** (bathing or anointing the Gods).',
        },
        {
          kind: 'tip' as const,
          title: 'Reenter the Vimana',
          body: 'Reenter the **Vimana** using the **Vikrama Chola Vayil** on the north side.',
        },
      ],
      image: {
        src: '/assets/explore/4-5-main-complex/18-waterspout.jpg?v=2',
        alt: 'Carved waterspout with a gana supporting the drain channel beside temple inscriptions',
        title: 'Beautifully carved waterspouts',
      },
    },

    innerPassage: {
      title: 'Inner Circumambulatory Passage (Pradakshinapatha)',
      intro: [
        'There is a narrow {{2 m (7 ft)}} wide passage between the outer and inner walls surrounding the sanctum in the main temple. While this passage is not open to the public, it is noteworthy as the location of a wealth of sculptures and fragile **1000-year-old** frescos.',
      ],
      stats: [
        { label: 'Width', value: '7 ft / 2 m' },
        { label: 'Karanas completed', value: '81 of 108' },
        { label: 'Fresco discovery', value: '1931' },
      ],
      notes: [
        {
          kind: 'historical-note' as const,
          title: 'Fresco discovery, 1931',
          body: 'The lower passage is richly adorned with **17th-century Nayaka** frescos of earthly and celestial scenes. **In 1931**, a crack revealed **Chola** paintings beneath. The Archaeological Survey of India (**ASI**) carefully detached the Nayaka layer using the Italian \u2018destucco\u2019 technique; those panels are now on fiberglass boards in the temple museum. Restoration is still underway **as of 2026**, so the gallery remains closed until the Chola paintings are preserved. See section **6.3. Frescos** for more.',
        },
      ],
      cards: [
        {
          title: 'Karanas',
          body: 'In the upper level of the passage, are granite sculptures of **Shiva Thandava** or **Nataraja** (**Shiva** in his dancing form) in **Karanas** (poses and movements in dance units) from the classical Indian dance treatise, the **Natyashastra**. Only **81** of the **108 karanas** were completed, but blank panels for the others remain in the passage.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-5-main-complex/19-7-foot-wide-passage.jpg',
          alt: 'Narrow seven-foot-wide inner circumambulatory passage around the sanctum',
          title: '7-foot-wide passage'
        },
        {
          src: '/assets/explore/4-5-main-complex/20-frescos.jpg',
          alt: 'Layered Chola and Nayaka period frescos from the inner passage',
          title: 'Frescos'
        },
        {
          src: '/assets/explore/4-5-main-complex/21-karana.jpg?v=2',
          alt: 'Granite sculptures of Shiva in karana dance poses from the Natyashastra',
          title: 'Karanas'
        },
      ],
    },

    sanctum: {
      title: 'Karuvarai or Garbhagriha (Sanctum Sanctorum)',
      intro: [
        'The sanctum sanctorum remains a place of active worship, where soft voices and a sense of reverence are the norm. It is a place of reflection and the atmosphere reflects that. It is customary to observe worship and the main deity by standing slightly to one side or the other and not directly in front of the idol.',
      ],
      paragraphs: [
        'The sanctum sanctorum remains a place of active worship, where soft voices and a sense of reverence are the norm. It is a place of reflection and the atmosphere reflects that. It is customary to observe worship and the main deity by standing slightly to one side or the other and not directly in front of the idol.',
        'Daily **pooja** (or worship) is conducted several times each day in the sanctum. Further details are found in section 6 Worship and Festivals.',
      ],
      stats: [
        { label: 'Chamber', value: '26 × 26 ft / 7.9 m' },
        { label: 'Outer wall', value: '13.5 ft / 4 m' },
        { label: 'Inner corridor', value: '7 ft / 2 m' },
      ],
      cards: [
        {
          title: 'Chamber',
          collapsible: true,
          body: 'The sanctum (**Karuvarai** or **Garbhagriha**—“womb chamber”) is a square {{7.9 × 7.9 m (26 × 26 ft)}} chamber inside the **Vimana**, with a {{4 m (13.5 ft)}} outer wall and a {{2 m (7 ft)}} inner circumambulatory corridor (see 4.5.3). Only priests may enter. Originally open up to the **Bramarendrakkal** capstone, a later wooden ceiling now hides the hollow dome.',
        },
        {
          title: 'Lingam',
          collapsible: true,
          body: 'The sanctum’s primary deity is **Shiva** as a huge stone **Lingam** (aniconic form)—the world’s largest, with a {{16.5 m (54 ft)}} **Aavudai** and a {{3.95 m (13 ft)}} monolithic shaft. Behind it stands a tall brass **Vasuki**, the cobra of fearlessness and divine power. Given the doorway sizes, the **Lingam** was likely set in place first and the sanctum built around it.',
        },
        {
          title: 'Twenty-four families',
          collapsible: true,
          body: 'The **Shiva Lingam** is made of black granite that is believed to have been sourced from the **Narmada River** at **Jabalpur**, **1,100 miles** from **Thanjavur**. **24** of the most prominent and pious families of **Thanjavur** sourced the stone and made arrangements to transport it to the temple site and presented it to **Rajaraja** as their contribution to the temple construction. **Rajaraja** was very pleased with the quality and appearance of this dark granite and invited the head of each family to a special annual prayer ceremony. To this day, the temple continues this annual tradition with members of the very same **24** families.',
        },
      ],
      notes: [
        {
          kind: 'tip' as const,
          title: 'Visitor note',
          body: 'Daily **pooja** (or worship) is conducted several times each day in the sanctum. Further details are found in section 6 Worship and Festivals.',
        },
      ],
      image: {
        src: '/assets/explore/4-5-main-complex/22-primary-deity-shiva.jpg?v=2',
        alt: 'Primary deity Shiva as the monolithic Lingam during aarti in the sanctum',
        title: 'Primary deity, Shiva'
      },
      highlights: [
        { label: 'Chamber', value: '26 ft × 26 ft' },
        { label: 'Vimana', value: '216 ft' },
        { label: 'Lingam', value: 'Monolithic' },
        { label: 'Consecration', value: '1010 CE' },
      ],
    },
  },

  shrines: {
    id: 'shrines',
    eyebrow: 'side shrines',
    title: 'Shrines within the walls',

    ganapathi: {
      mapNum: 9,
      title: 'Ganapathi Kovil',
      orientation:
        'As you exit the main temple, you will see the **Ganapathi Kovil** directly in front of you. This temple is dedicated to the elephant headed God **Ganapathi** (or **Ganesha** as he is known in other parts of India), the son of **Shiva** and **Parvathi**.',
      intro: [
        'As you exit the main temple, you will see the **Ganapathi Kovil** directly in front of you. This temple is dedicated to the elephant headed God **Ganapathi** (or **Ganesha** as he is known in other parts of India), the son of **Shiva** and **Parvathi**.',
      ],
      paragraphs: [
        'As you exit the main temple, you will see the **Ganapathi Kovil** directly in front of you. This temple is dedicated to the elephant headed God **Ganapathi** (or **Ganesha** as he is known in other parts of India), the son of **Shiva** and **Parvathi**.',
      ],
      stats: [
        { label: 'British damage', value: '1771–1798' },
        { label: 'Rebuilt', value: '1801' },
      ],
      cards: [
        {
          title: 'Murals and idol',
          collapsible: true,
          body: 'The porch walls of this shrine are decorated with large-scale murals depicting various deities and the **Tiruvilayadal Puranam**, stories from Sacred Games. The original red stone idol from **Rajaraja\'s time** was damaged and was replaced by the current idol.',
        },
        {
          title: 'British damage and rebuild',
          collapsible: true,
          body: 'Parts of the Brihadishwara temple, including the **Ganapathi Kovil** (were damaged by a British garrison **between 1771 and 1798**. Subsequently, the temple was **rebuilt in 1801** under the rule of the Maratha king, **Serfoji II**, under the supervision of **Nagaraja Pandithar**, according to an inscription on the temple wall.',
        },
      ],
      image: {
        src: '/assets/explore/4-6-ganapathi-kovil/1-ganapathi-kovil.jpg?v=2',
        alt: 'Ganapathi Kovil shrine with mural-decorated porch walls',
        title: 'Ganapathi Kovil'
      },
    },

    karuvur: {
      mapNum: 10,
      title: 'Karuvur Siddhar Mandapam',
      orientation:
        'Circle around to the back of the **Vimana** where you will find a small **Mandapam** (hall) dedicated to **Karuvur Siddhar**, a wise and enlightened sage, who was **Rajaraja\'s** Guru or spiritual teacher.',
      intro: [
        'Circle around to the back of the **Vimana** where you will find a small **Mandapam** (hall) dedicated to **Karuvur Siddhar**, a wise and enlightened sage, who was **Rajaraja\'s** Guru or spiritual teacher.',
      ],
      paragraphs: [
        'Circle around to the back of the **Vimana** where you will find a small **Mandapam** (hall) dedicated to **Karuvur Siddhar**, a wise and enlightened sage, who was **Rajaraja\'s** Guru or spiritual teacher.',
      ],
      stats: [
        { label: 'Mandapam built', value: '1890' },
      ],
      cards: [
        {
          title: 'Role in construction',
          collapsible: true,
          body: '**Karuvur Siddhar** played a significant role in the construction of the temple and assisted in the installation of the huge **Shiva Lingam** in the Sanctum. It is said that he may even have carved some of the idols himself. One of the most famous frescos in the temple (inner circumambulatory corridor) shows **Karuvur Siddhar** with **Rajaraja**.',
        },
        {
          title: 'Mandapam on the platform',
          collapsible: true,
          body: 'When the temple was under construction, there was a platform where **Karuvur Siddhar** used to sit and supervise construction work. **In 1890**, a mandapam was built on that spot and his idol was installed there.',
        },
      ],
      notes: [
        {
          kind: 'did-you-know' as const,
          title: 'Platform of supervision',
          body: 'When the temple was under construction, there was a platform where **Karuvur Siddhar** used to sit and supervise construction work. **In 1890**, a mandapam was built on that spot and his idol was installed there.',
        },
      ],
      image: {
        src: '/assets/explore/4-7-karuvur-siddhar-mandapam/1-karuvur-siddhar-mandapam.jpg?v=2',
        alt: 'Karuvur Siddhar Mandapam hall dedicated to Rajaraja\'s spiritual teacher',
        title: 'Mandapam (hall) dedicated to Karuvur Siddhar'
      },
    },

    subrahmanya: {
      mapNum: 11,
      title: 'Subrahmanya Shrine',
      orientation:
        'Located just behind, the main temple in the northwestern corner of the temple complex, is the **Subrahmanya** shrine, built by the **Nayakas in the 17th century**.',
      intro: [
        'Located just behind, the main temple in the northwestern corner of the temple complex, is the **Subrahmanya** shrine, built by the **Nayakas in the 17th century**.',
      ],
      paragraphs: [
        'It features a traditional **Garbhagriha** (sanctum sanctorum) topped by a **55-foot vimana**, **Ardha Mandapam** (half hall), and a **Maha Mandapam** (main hall).',
      ],
      stats: [
        { label: 'Built', value: '17th century' },
        { label: 'Vimana', value: '55 ft' },
      ],
      cards: [
        {
          title: 'Pillars and Dwarapalakas',
          collapsible: true,
          body: 'The shrine, especially the **Maha Mandapam**, features elaborately carved pillars decorated with floral and geometric patterns. On the sides of the steps going into the shrine, you can see an elephant fighting a warrior on the right-hand side and an elephant lifting a man on the left. The **Dwarapalakas** (door guards) outside this shrine are made of metallic black granite that is not found in India. It is speculated that it was brought from an outside country, possibly **Indonesia**. Beautifully carved waterspouts channel water and milk away from the sanctum after **abhishekam** (bathing or anointing the Gods). Some of the sculptures on this shrine are so fine that it is hard to pass a thread through the gaps in the patterns. There are frescos on the wall from Maratha times.',
        },
        {
          title: 'Waterspouts and frescos',
          collapsible: true,
          body: 'Beautifully carved waterspouts channel water and milk away from the sanctum after **abhishekam** (bathing or anointing the Gods). Some of the sculptures on this shrine are so fine that it is hard to pass a thread through the gaps in the patterns. There are frescos on the wall from Maratha times.',
        },
        {
          title: 'Shanmukha',
          collapsible: true,
          body: 'The sanctum houses a single stone sculpture of **Subrahmanya** (also known as **Murugan**) in his **Shanmukha** (six-faced) form, seated on a peacock, accompanied by his consorts, **Valli** and **Deivayanai**. One can only marvel at the skill of the sculptors who carved their elaborate **thiruvasi** (decoration around the head).',
        },
        {
          title: 'Mallapa Mandapam',
          body: 'The **Maha Mandapam**, known as the **Mallapa Mandapam**, has elaborately carved and painted pillars and ceiling and added frescos depicting portraits of **Maratha kings**.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-8-subrahmanya-shrine/1-subrahmanya-shrine.jpg?v=2',
          alt: 'Subrahmanya shrine with 55-foot vimana in the northwest corner',
          title: 'Subrahmanya shrine'
        },
        {
          src: '/assets/explore/4-8-subrahmanya-shrine/2-steps.jpg',
          alt: 'Carved steps with elephant and warrior reliefs at Subrahmanya shrine entrance',
          title: 'Sides of the steps'
        },
        {
          src: '/assets/explore/4-8-subrahmanya-shrine/3-maha-mandapam.jpg?v=1',
          alt: 'Mallapa Mandapam carved pillars with painted Yali brackets and ceiling medallions',
          title: 'Mallapa Mandapam'
        },
      ],
    },

    chandikeshwara: {
      mapNum: 12,
      title: 'Chandikeshwara Shrine',
      orientation:
        'Between the **Subrahmanya** shrine and the main temple, sits a smaller shrine dedicated to **Chandikeshwara**. It is said that this shrine, per tradition in South India, was built and consecrated before any other parts of the temple including the main sanctum.',
      intro: [
        'Between the **Subrahmanya** shrine and the main temple, sits a smaller shrine dedicated to **Chandikeshwara**. It is said that this shrine, per tradition in South India, was built and consecrated before any other parts of the temple including the main sanctum.',
      ],
      paragraphs: [
        'Between the **Subrahmanya** shrine and the main temple, sits a smaller shrine dedicated to **Chandikeshwara**. It is said that this shrine, per tradition in South India, was built and consecrated before any other parts of the temple including the main sanctum.',
      ],
      cards: [
        {
          title: 'Idol and inscriptions',
          collapsible: true,
          body: 'This one level shrine with a **vimana** contains an idol of **Chandikeshwara** in a seated meditating position. The first inscriptions of the temple were inscribed on the three sides of the base of the walls of this shrine.',
        },
        {
          title: 'Hindu mythology',
          collapsible: true,
          body: 'According to the Hindu mythology, as a young boy, **Chandikeshwara** spent all his time making **Lingams** out of sand and meditating instead of tending to the cows. One day, annoyed at him, his father kicked the lingam. The boy got angry and cut off his father\'s leg for daring to destroy the image of his Lord. At this sign of his devotion, **Lord Shiva** appeared from the **Lingam**, blessed the boy, gave him a permanent place in his temple and restored his father\'s leg. **Chandikeshwara\'s** story is inscribed on the east wall of the **Ashtamangala Vayil**.',
        },
      ],
      notes: [
        {
          kind: 'tip' as const,
          title: 'Mark your presence',
          body: 'It is believed that **Chandikeshwara** keeps records of who visits the temple and so, per tradition, tap your hands together silently and chant the name of **Lord Shiva** 3 times to mark your presence in the temple, without disturbing the meditation of **Chandikeshwara**.',
        },
        {
          kind: 'tip' as const,
          title: 'Caretaker of Shiva\'s properties',
          body: '**Chandikeswara** is also the caretaker of **Lord Shiva\'s** properties. Rub your hands in front of his shrine to assure him that you are not taking anything from the temple!',
        },
      ],
      image: {
        src: '/assets/explore/4-9-chandikeshwara-shrine/1-chandikeshwara-shrine.jpg?v=3',
        alt: 'Chandikeshwara shrine with meditating idol',
        title: 'Smaller shrine dedicated to Chandikeshwara'
      },
    },

    amman: {
      mapNum: 14,
      title: 'Amman Shrine',
      orientation:
        'Walking around the temple back towards the entrance gate, you will see a single-story shrine dedicated to **Amman** (also known as **Brihadishwari** or **Brahanayaki** or **Ulagammuludaiya Nachchiyar**), the consort of **Shiva**.',
      intro: [
        'Walking around the temple back towards the entrance gate, you will see a single-story shrine dedicated to **Amman** (also known as **Brihadishwari** or **Brahanayaki** or **Ulagammuludaiya Nachchiyar**), the consort of **Shiva**.',
      ],
      paragraphs: [
        'Walking around the temple back towards the entrance gate, you will see a single-story shrine dedicated to **Amman** (also known as **Brihadishwari** or **Brahanayaki** or **Ulagammuludaiya Nachchiyar**), the consort of **Shiva**.',
      ],
      stats: [
        { label: 'Arms', value: '12' },
        { label: 'Shrine built', value: '16th century' },
        { label: 'Ceiling painted', value: '18th century' },
      ],
      cards: [
        {
          title: 'Idol origin',
          body: 'From the inscription in this temple, you come to know that the idol was brought from the outer corridor, and a separate temple was built by the **Nayakas in the 16th century** and the ceiling painted by the **Marathas in the 18th Century**.',
        },
      ],
      notes: [
        {
          kind: 'historical-note' as const,
          title: 'Growing importance of Amman shrines',
          body: 'The construction of subsidiary shrines like these is indicative of the growing importance of **Amman** shrines in South Indian temple complexes in this time period.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-10-amman-shrine/1-amman-shrine.jpg?v=3',
          alt: 'Amman shrine dedicated to Brihannayaki consort of Shiva',
          title: 'Single-story shrine dedicated to Amman'
        },
        {
          src: '/assets/explore/4-10-amman-shrine/2-amman-idol.jpg?v=2',
          alt: 'Twelve-armed Amman idol inside the shrine',
          title: 'Idol of the 12-armed goddess'
        },
      ],
    },

    nataraja: {
      mapNum: 15,
      title: 'Nataraja Mandapam',
      orientation:
        'Next to the **Amman** shrine, in the northeast corner of the temple complex, you will find **Nataraja Mandapam**, a rectangular stone hall built by the **Marathas** under **Sarfoji II**. It is dedicated to **Lord Shiva** as the cosmic dancer, **Nataraja**.',
      intro: [
        'Next to the **Amman** shrine, in the northeast corner of the temple complex, you will find **Nataraja Mandapam**, a rectangular stone hall built by the **Marathas** under **Sarfoji II**. It is dedicated to **Lord Shiva** as the cosmic dancer, **Nataraja**.',
      ],
      paragraphs: [
        'Next to the **Amman** shrine, in the northeast corner of the temple complex, you will find **Nataraja Mandapam**, a rectangular stone hall built by the **Marathas** under **Sarfoji II**. It is dedicated to **Lord Shiva** as the cosmic dancer, **Nataraja**.',
        'The structure is an open pavilion with an ornate ceiling and intricately carved pillars featuring detailed depictions of celestial beings, musicians, and dancers.',
      ],
      cards: [
        {
          title: 'Bronze Nataraja',
          body: 'Inside the Mandapam is a large **Chola period** bronze statue of **Nataraja**, with a smaller statue of his consort **Sivakami** next to him. The bronze statue of **Nataraja** in the **Nataraja Mandapam** was damaged during the **19th century British occupation** and, according to the inscription on the base of the statue, it was **repaired in 1885** by **Queen Kamakshi Bai** (wife of **Shivaji II**, the last Maratha ruler of **Thanjavur**).',
        },
        {
          title: 'Talicceris and 400 dancers',
          body: '**Rajaraja** brought dancers from various communities across his kingdom to **Thanjavur**, where he housed them in special residences called "**Talicceris**", with each dancer receiving a house, a grant of agricultural land and elevated social status. He also employed musicians, singers, and teachers to train them. A list of **400 dancers** with details of the places they came from, and their tithes are inscribed on the **Anukkan Tiruvasal**, the entrance connecting the temple and the **Shivaganga** pond area.',
        },
        {
          title: 'Dance performances and Sadhaya Vizha',
          collapsible: true,
          body: 'During **Rajaraja\'s time**, the temple dancers would perform in front of **Nataraja** every day after evening **pooja**. Classical dance performances are still featured at the temple to mark special religious observances. A festival is held at the temple in October/November each year to commemorate the birth anniversary of **Rajaraja** (**Sadhaya Vizha**) and features hundreds of classical dancers who come to pay homage to **Lord Nataraja**.',
        },
      ],
      images: [
        {
          src: '/assets/explore/4-11-nataraja-mandapam/1-nataraja-mandapam.jpg?v=2',
          alt: 'Nataraja Mandapam open pavilion with carved pillars',
          title: 'Nataraja Mandapam'
        },
        {
          src: '/assets/explore/4-11-nataraja-mandapam/2-chola-nataraja.jpg?v=1',
          alt: 'Chola period bronze Nataraja with consort Sivakami',
          title: 'Bronze Nataraja'
        },
        {
          src: '/assets/explore/4-11-nataraja-mandapam/2-dancers.jpg',
          alt: 'Carved pillars depicting celestial dancers and musicians',
          title: 'Dancers'
        },
      ],
      pullQuote:
        'A living heritage of dance: from Chola karanas in stone to Maratha bronze under open sky.',
    },
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'Architecture, history, art, and living worship: more ways to know **Brihadishwara** beyond the walking plan.',
  },

  contents: [
    { id: 'etiquette', label: 'Visitor Etiquette' },
    { id: 'map-walk', label: 'The Walk' },
    { id: 'entrances', label: 'Entrances' },
    { id: 'cloisters', label: 'Cloisters' },
    { id: 'nandi', label: 'Nandi Mandapam' },
    { id: 'varahi', label: 'Varahi Shrine' },
    { id: 'main-temple', label: 'Main Temple' },
    { id: 'shrines', label: 'Side Shrines' },
    { id: 'continue', label: 'Continue Exploring' },
  ],

  /** Floating Contents — journey stages (expand to locations) */
  contentsStages: [
    {
      id: 'prepare',
      label: 'Prepare',
      items: [
        { id: 'etiquette', label: 'Visitor Etiquette' },
        { id: 'map-walk', label: 'Temple Map' },
      ],
    },
    {
      id: 'temple-entrance',
      label: 'Temple Entrance',
      nums: [1, 2, 3],
      items: [
        { id: 'entrances-maratha', label: 'Maratha Entrance' },
        { id: 'entrances-keralantakan', label: 'Keralantakan Tiruvasal' },
        { id: 'entrances-rajarajan', label: 'Rajarajan Tiruvasal' },
      ],
    },
    {
      id: 'towards-sanctum',
      label: 'Towards the Sanctum',
      nums: [4, 5],
      items: [
        { id: 'nandi', label: 'Nandi Mandapam' },
        { id: 'varahi', label: 'Varahi Shrine' },
      ],
    },
    {
      id: 'outer-corridor',
      label: 'Thiruchutru Maligai',
      nums: [6, 13],
      items: [
        { id: 'cloisters-south', label: 'South Cloister' },
        { id: 'cloisters-north', label: 'North Cloister' },
      ],
    },
    {
      id: 'main-temple-stage',
      label: 'Main Temple',
      nums: [7],
      items: [
        { id: 'main-temple', label: 'Main Temple' },
        { id: 'dakshina-kailasam', label: 'Dakshina Kailasam' },
        { id: 'hall-mukha', label: 'Mukha Mandapam' },
        { id: 'hall-maha', label: 'Maha Mandapam' },
        { id: 'hall-antrala', label: 'Antrala' },
        { id: 'vimana', label: 'Vimana' },
        { id: 'sanctum', label: 'Sanctum' },
      ],
    },
    {
      id: 'interpretation-stage',
      label: 'Interpretation Centre',
      nums: [8],
      items: [{ id: 'cloisters-museum', label: 'Interpretation Centre' }],
    },
    {
      id: 'inner-court-stage',
      label: 'Inner Court Shrines',
      nums: [9, 10, 11, 12],
      items: [
        { id: 'shrines-ganapathi', label: 'Ganapathi' },
        { id: 'shrines-karuvur', label: 'Karuvur' },
        { id: 'shrines-subrahmanya', label: 'Subrahmanya' },
        { id: 'shrines-chandikeshwara', label: 'Chandikeshwara' },
      ],
    },
    {
      id: 'return-path-stage',
      label: 'Return Path',
      nums: [14, 15],
      items: [
        { id: 'shrines-amman', label: 'Amman' },
        { id: 'shrines-nataraja', label: 'Nataraja' },
      ],
    },
    {
      id: 'next',
      label: 'Continue Exploring',
      items: [{ id: 'continue', label: 'Continue Exploring' }],
    },
  ],
}
