/** Worship & Festivals page — writeup §6. Client wording preserved; structure is presentation only. */

export type WorshipImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  credit?: string
  objectPosition?: string
}

export type WorshipFestival = {
  id: string
  title: string
  period: string
  paragraphs: string[]
  image?: WorshipImage
  mediaFirst?: boolean
}

export const worshipPage = {
  hero: {
    eyebrow: 'daily pooja and festivals',
    title: 'Worship & Festivals',
    lead:
      'The Chola kings were ardent **Saivites**, and the **Brihadishwara Temple** remains a pilgrimage site for devotees of **Lord Shiva** from all over the world, seeking blessings, solace, and spiritual enlightenment.',
    image: '/assets/worship/1-natyanjali.jpg',
    cta: 'Begin with daily pooja',
    ctaHref: '#daily-pooja',
  },

  daily: {
    id: 'daily-pooja',
    chapterLabel: '01',
    eyebrow: 'Daily worship',
    title: 'Daily pooja',
    hours:
      'The temple is currently open daily from 6 am - 12:30 pm and from 4 - 8:30 pm.',
    poojaLead: 'Daily pooja rituals are performed at:',
    poojas: [
      { id: 'kaala-sandhi', name: 'Kaala Sandhi', time: '6:30 AM' },
      { id: 'uchikalam', name: 'Uchikalam', time: '12:00 PM' },
      { id: 'sayarakshai', name: 'Sayarakshai', time: '5:30 PM' },
      { id: 'arthajamam', name: 'Arthajamam', time: '8:00 PM' },
    ],
    lastFlower: {
      id: 'last-flower',
      text: 'At the end of the pooja, the priests throw the last flower up into the air above the **Shiva Lingam** and call out \u201c**Paramashivaya namaha**\u201d (I bow to the mighty Lord Shiva).',
    },
    closing: [
      {
        id: 'pancha-bootham',
        title: 'Pancha Bootham',
        paragraphs: [
          'This is said to be done to acknowledge that the **Brihadishwara temple** represents all five elements in the **Pancha Bootham** (earth, air, water, fire, and ether/space/sky). As the sanctum was originally open to the very top, flowers and prayers are spiritually carried up to the sky with this gesture.',
        ],
      },
    ],
  },

  festivals: {
    id: 'festivals',
    chapterLabel: '02',
    eyebrow: 'Major Festivals',
    title: 'Major Festivals',
    items: [
      {
        id: 'natyanjali',
        title: 'Natyanjali Dance Festival',
        period: 'Feb/Mar',
        paragraphs: [
          'An annual classical dance festival celebrating **Lord Shiva**, featuring Indian dance forms like **Bharatanatyam** and **Kuchipudi**. Held during **Mahashivratri** at the **Big Temple**, featuring classical dancers.',
        ],
        image: {
          src: '/assets/worship/1-natyanjali.jpg',
          alt: 'Classical dancers performing at the Natyanjali Dance Festival in the Brihadishwara temple complex',
          title: 'Natyanjali',
          objectPosition: '50% 60%',
        } satisfies WorshipImage,
      },
      {
        id: 'chithirai',
        title: 'Chithirai Car Festival',
        period: 'April/May; Tamil month of Chithirai',
        paragraphs: [
          'A joyous multi-day festival where devotees take the ceremonial images of deities into the four main streets (**Raja Veedhis**) surrounding the Temple. The {{5m (16\')}} chariot was recently reconstructed by more than **30** artisans and sculptors, with **25 tons** of **Iluppai** and teakwood.',
        ],
        image: {
          src: '/assets/worship/2-car-festival.jpg',
          alt: 'The reconstructed Chithirai festival chariot standing beside the temple',
          title: 'Chithirai Car Festival',
          credit: '\u0baa\u0bbe.\u0b9c\u0bae\u0bcd\u0baa\u0bc1\u0bb2\u0bbf\u0b99\u0bcd\u0b95\u0bae\u0bcd, Own work, CC BY-SA 4.0',
          objectPosition: '48% 28%',
        } satisfies WorshipImage,
        mediaFirst: true,
      },
      {
        id: 'sadhaya',
        title: 'Sadhaya Vizha',
        period: 'October/November; Tamil month Aippasi',
        paragraphs: [
          'Commemorates King **Rajaraja Chola I**\u2019s birth anniversary. The festival includes adorning the emperor\u2019s statue, sacred baths for the deity, lamp waving, holy processions, classical dance and folk-art performances.',
        ],
        image: {
          src: '/assets/worship/3-sadhaya-vizha.jpg',
          alt: 'Illuminated deity procession during Sadhaya Vizha, with the Brihadishwara temple tower behind',
          title: 'Sadhaya Vizha',
          objectPosition: '50% 35%',
        } satisfies WorshipImage,
      },
    ] satisfies WorshipFestival[],
  },

  continue: {
    id: 'continue',
    eyebrow: 'next',
    title: 'Continue Exploring',
    lead:
      'History, the temple, a walking plan, and art: more ways to know **Brihadishwara** beyond living worship.',
  },

  contentsStages: [
    {
      id: 'stage-worship',
      label: 'Worship & Festivals',
      items: [
        { id: 'daily-pooja', label: 'Daily pooja' },
        { id: 'last-flower', label: 'The last flower' },
        { id: 'pancha-bootham', label: 'Pancha Bootham' },
        { id: 'festivals', label: 'Major Festivals' },
        { id: 'natyanjali', label: 'Natyanjali' },
        { id: 'chithirai', label: 'Chithirai Car Festival' },
        { id: 'sadhaya', label: 'Sadhaya Vizha' },
        { id: 'continue', label: 'Continue Exploring' },
      ],
    },
  ],
}
