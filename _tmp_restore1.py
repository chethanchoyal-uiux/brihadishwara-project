# -*- coding: utf-8 -*-
"""Restore Word-doc wording in explore.ts — content strings only."""
from pathlib import Path
import re

path = Path(r"c:\Users\wmsms\Downloads\Brihadeeshwara Temple Project\website-option-2\src\data\explore.ts")
text = path.read_text(encoding="utf-8")

# Preserve map intro exactly (user request)
MAP_LEAD_MARKER = "<<<MAP_LEAD_PRESERVED>>>"
map_lead = """There are **15 main sections** of the temple as shown on the plan. Follow the guided walk below — the map stays with you as orientation while each stop comes into view."""
assert map_lead in text, "map lead not found"
text = text.replace(map_lead, MAP_LEAD_MARKER, 1)

# Ordered replacements: (old, new). Prefer longer/more specific first.
# new = exact Word wording with selective **bold** on key terms.
replacements = [
# --- Orientation ---
(
"The **Brihadishwara** temple faces **east** and sits within a moat with fortified walls. Rulers and dynasties have placed their mark here from **1000 CE** through the late **18th century**.",
"The **Brihadishwara** temple faces **east** and has a moat with fortified walls around it. Many rulers and dynasties have placed their mark on the temple from **1000 CE** all the way to the late **18th century**.",
),
(
"The original temple built by **Rajaraja Chola** consisted of the **Keralantakan** and **Rajarajan Tiruvasal** gateways, the colonnaded **Thiruchutru Maligai**, the sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara** shrine.",
"The original temple as built by **Rajaraja Chola** consisted of the second and third gateways (**Keralantakan** and **Rajarajan Tiruvasal**), the colonnaded corridor (**Thiruchutru Maligai**), the Sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara** temple.",
),
(
"All other structures were added after the **11th century** during the **Pandya**, **Nayaka**, **Vijayanagara**, and **Maratha** eras, before the colonial period began.",
"All the other structures were added to the original temple after the **11th century**, during the **Pandya**, **Nayaka**, **Vijayanagara** and **Maratha** eras, before the colonial era started.",
),
(
"As the layout shows, later builders understood and respected the original plans and symmetry rules. The complex holds several independent structures, each with its own structural character, art, and history. Take your time to absorb this unique place.",
"As seen by the layout of the temple complex, these later builders appear to have understood and respected the original plans and symmetry rules. The temple complex consists of several independent structures within the outer walls, each with its own unique structural and artistic character and associated history and lore. Take your time to absorb the beauty and history of this unique place!",
),
# paragraphs[1] combined version
(
"The original temple built by **Rajaraja Chola** consisted of the **Keralantakan** and **Rajarajan Tiruvasal** gateways, the colonnaded **Thiruchutru Maligai**, the sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara** shrine. All other structures were added after the **11th century** during the **Pandya**, **Nayaka**, **Vijayanagara**, and **Maratha** eras, before the colonial period began.",
"The original temple as built by **Rajaraja Chola** consisted of the second and third gateways (**Keralantakan** and **Rajarajan Tiruvasal**), the colonnaded corridor (**Thiruchutru Maligai**), the Sanctum with its towering **vimana** and gathering halls, and the **Chandikeshwara** temple. All the other structures were added to the original temple after the **11th century**, during the **Pandya**, **Nayaka**, **Vijayanagara** and **Maratha** eras, before the colonial era started.",
),

# --- Entrances overview ---
(
"Standing outside the eastern side of the temple walls, observe the three main **Tiruvasal** gateways with their **gopura** towers.",
"Standing outside the Eastern side of the temple walls observe the three main gateways (**Tiruvasal**) with their towers (**Gopuram**) that are used to enter the temple complex.",
),
(
"In South Indian temples, gateway **gopuras** are typically taller than the main temple tower (**vimana**), but at Brihadishwara it is the other way around: **Rajaraja** wanted the main **vimana** to stand tall as a tribute to **Lord Shiva**.",
"In South Indian temples, the gateway **Gopuras** are typically taller than the main temple tower (**Vimana**), but in the Brihadishwara temple, it is the other way around. **Rajaraja** wanted the main **Vimana** to stand tall as a tribute to **Lord Shiva**.",
),
(
"While these three gateways form the main entrance, there are **four additional entrances** through the inner and outer walls used by townspeople, artists, and dancers approaching from different parts of the town.",
"While these three gateways form the main entrance to the temple, there are **4 additional entrances** through the inner and outer walls that were used by the townspeople, artists and dancers who approached the temple from different parts of the town.",
),
(
"There were also over a **hundred underground tunnels** connecting the temple to the **Thanjavur** palace and other parts of the city. Royal families used the tunnels for daily worship but used the main entrances during ceremonial processions. Some tunnels may have helped the royal family flee from enemies; others led to dead ends to confuse invaders. Due to safety concerns, all underground tunnels have now been permanently sealed.",
"There were also over a hundred underground tunnels connecting the temple to the **Thanjavur** palace and other parts of the city. The royal families used the tunnels to access the temple for daily worship but used the main entrances during ceremonial processions. It is speculated that some of the tunnels were intended to help the royal family flee from enemies, while other tunnels led to dead ends to confuse invaders. Due to safety concerns, all these underground tunnels have now been permanently sealed.",
),

# --- Maratha ---
(
"The outermost entrance used by visitors today, the **Maratha entrance**, was built by Maratha king **Serfoji II** in **1801 CE**. This **18-foot-tall** arch built of strong red stone has stairs on both sides connecting it to the temple fortification walls.",
"The outermost entrance to the temple, the **Maratha entrance**, was built by Maratha king **Serfoji II** in the year **1801 CE**. This **18-foot-tall** arch built of strong red stone has stairs on both sides that connect it to the temple fortification walls.",
),
(
"The outermost entrance used by visitors today, the **Maratha entrance**, was built by Maratha king **Serfoji II** in **1801 CE**.",
"The outermost entrance to the temple, the **Maratha entrance**, was built by Maratha king **Serfoji II** in the year **1801 CE**.",
),
(
"This **18-foot-tall** arch built of strong red stone has stairs on both sides connecting it to the temple fortification walls.",
"This **18-foot-tall** arch built of strong red stone has stairs on both sides that connect it to the temple fortification walls.",
),
(
"At the top of the arch you can see limestone images of **Shiva** and **Parvathi**.",
"At top of the arch, you can see limestone images of **Shiva** and **Parvathi**.",
),

# --- Keralantakan ---
(
"Around **988 CE**, **Rajaraja** fought the **Cheras** in an epic land and sea battle at the southeastern towns of **Kanthaloor** and **Kollam** and brought the entire Kerala region under his rule. He spent the wealth acquired in this victory on the Brihadishwara temple and named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory.",
"Around **988 CE**, **Rajaraja** fought the **Cheras** in an epic land and sea battle at the southeastern towns of **Kanthaloor** and **Kollam** and brought the entire Kerala region under his rule. He spent all the wealth acquired in this victory on the Brihadishwara temple and named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory.",
),
(
"This **18-foot-wide**, **36-foot-tall** entrance served as the **Rajagopuram** (royal gateway) to the temple. **Rajaraja** named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory over the **Cheras**, spending the wealth from that campaign on the Brihadishwara temple.",
"Around **988 CE**, **Rajaraja** fought the **Cheras** in an epic land and sea battle at the southeastern towns of **Kanthaloor** and **Kollam** and brought the entire Kerala region under his rule. He spent all the wealth acquired in this victory on the Brihadishwara temple and named this beautiful second entrance gate **Keralantakan Tiruvasal** to commemorate his victory. This **18-foot-wide**, **36-foot-tall** entrance served as the **Rajagopuram** (royal gateway) to the temple.",
),
(
"Looking up from the eastern side, prominent sculptures on the first level include **Natanakali** (dancing Kali) on the left and **Urdhva Thandavamsivan** (dancing Shiva) on the right. There are also fine examples of **Dwarapalakas** (celestial door keepers) and **Koorai Thangiyar** (ceiling bearers) on the different levels. The base of the gateway contains a large number of inscriptions.",
"Looking up at the gateway from the front (eastern side), some of the prominent sculptures you see on the first level are the **Natanakali** (dancing Kali) on the left and **Urdhva Thandavamsivan** (dancing Shiva) on the right. There are also many fine examples of **Dwarapalakas** (celestial door keepers) and **Koorai Thangiyar** (ceiling bearers) on the different levels of this gate. The base of the gateway contains a large number of inscriptions.",
),
(
"Walk into the gateway and observe the **4-foot × 3-foot × 36-foot** finely buffed, single-piece side stones that support the five-level **gopuram** with its intricate sculptures.",
"Walk into the gateway and observe the **4-foot x 3-foot x 36-foot** finely buffed, single piece, side stones that support the five level **Gopuram** with its intricate sculptures.",
),
(
"On the western (back) side, on the first level you see **Krishna** playing with **Gopikas** (cowherds) under a tree on the left, and **Narasimha** (avatar of **Lord Vishnu**) killing **Hiranyan** on the right side of the second level. Other sculptures show **Brahma** and **Vishnu** and their consorts in various seated and standing positions.",
"On the western (back) side of the entrance, on the first level you see **Krishna** playing with **Gopikas** (cowherds) under a tree on the left-hand side and **Narasimha** (avatar of **Lord Vishnu**) killing **Hiranyan** on the right side of the second level. Other sculptures show **Brahma** and **Vishnu** and their consorts in various seated and standing positions.",
),
(
"On the western (back) side, on the first level you see **Krishna** playing with **Gopikas** (cowherds) under a tree on the left, and **Narasimha** (avatar of **Lord Vishnu**) killing **Hiranyan** on the right side of the second level.",
"On the western (back) side of the entrance, on the first level you see **Krishna** playing with **Gopikas** (cowherds) under a tree on the left-hand side and **Narasimha** (avatar of **Lord Vishnu**) killing **Hiranyan** on the right side of the second level.",
),

# --- Rajarajan ---
(
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure atop a **7-foot** plinth and **20-foot** base. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor). Walk through the entrance into the temple complex: the **vimana** rises into full view over the courtyard.",
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure that sits atop a **7-foot** plinth and **20-foot** base. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).",
),
(
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure atop a **7-foot** plinth and **20-foot** base. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).",
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure that sits atop a **7-foot** plinth and **20-foot** base. It is connected on both sides to the **Thiruchutru Maligai** (inner surrounding corridor).",
),
(
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure atop a **7-foot** plinth and **20-foot** base.",
"The third gateway, the **Rajarajan Tiruvasal**, consists of a three-tiered structure that sits atop a **7-foot** plinth and **20-foot** base.",
),
(
"Walk through the entrance into the temple complex: the **vimana** rises into full view over the courtyard.",
"Walk through the entrance into the temple complex.",
),
(
"The imposing **18-foot Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture. The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python swallowing an elephant, showing the fierce might of these door guards.",
"The imposing **18-foot Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture! The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python swallowing an elephant, showing the fierce might of these door guards!",
),
(
"The imposing **18-foot Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture.",
"The imposing **18-foot Dwarapalakas** (door guards) on both sides of the Rajarajan Tiruvasal are wonderful specimens of Chola sculpture!",
),
(
"The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python swallowing an elephant, showing the fierce might of these door guards.",
"The **Dwarapalaka** on the left is pressing his foot down on a crocodile and a python swallowing an elephant, showing the fierce might of these door guards!",
),
(
"The **Dwarapalaka** on the right appears to have a look of astonishment, as if saying to visitors, \\"Have you seen the amazing temple within these gates?\\" and making a gesture with his right hand to urge people inside.",
"The **Dwarapalaka** on the right side appears to have a look of astonishment on his face as if saying to visitors \\u201cHave you seen the amazing temple within these gates?\\u201d and making a gesture with his right hand to urge people inside to do so.",
),
(
"On the east side, on the first level from left to right, you see a seated **Parvati**, **Vallabha Ganapathi** with ten arms, **Rishabha Vahanar** seated on a bull, **Indra** riding an elephant, **Agni**, and **Murugan** seated on a peacock, along with ceiling bearers.",
"On the east side of the entrance, on the first level, from left to right, you see a seated **Parvati**, **Vallabha Ganapathi** with ten arms, **Rishabha Vahanar** seated on a bull, **Indra** riding an elephant, **Agni**, and **Murugan** seated on a peacock, along with the ceiling bearers.",
),
(
"On the second level there are several **Chandrasekaramurthis** (forms of Shiva) and a beautiful round decorative structure in the Buddhist decorative style atop the windows.",
"On the second level there are several **Chandrasekaramurthis** (forms of Shiva) and beautiful round decorative structure in the Buddhist decorative style atop the windows.",
),
(
"On the third level **Uma Maheswari** is depicted seated on **Shiva\\'s** lap in the center round structure.",
"On the third level **Uma Maheswari** is depicted seated on **Shiva\\'s** lap in the Center round structure.",
),

# --- Cloisters ---
(
"The temple has a massive colonnaded cloister, **Thiruchutru Maligai**, built under the supervision of **Krishnan Raman**, **Rajaraja\\'s** military commander. This **1500-foot** perimeter encircles the entire temple complex and offers shelter and shade as devotees perform the traditional three **parikramas** (circumambulations) of the temple.",
"The temple has a massive colonnaded cloister, **Thiruchutru Maligai**, built under the supervision of **Krishnan Raman**, **Rajaraja\\'s** military commander. This **1500-foot** perimeter encircles the entire temple complex and offers shelter and shade as devotees perform the traditional three **parikramas** or circumambulations of the temple.",
),
(
"The **Thiruchutru Maligai** creates a perfect rectangle that is almost exactly two stacked squares: **790 ft** (240.79 m) long east to west, and **400 ft** (121.92 m) wide north to south, with the main temple aligned perfectly in the middle of the western half.",
"The **Thiruchutru Maligai** creates a perfect rectangle that is almost exactly two stacked squares, **790 ft** (240.79 m) long east to west, and **400 ft** (121.92 m) wide north to south, with the main temple aligned perfectly in the middle of the western square.",
),
(
"A row of small seated **Nandis** (bulls) adorn the top of the walls on all four sides. Statues and sculptures representing **Lord Shiva** and other gods line the inside of the cloister. In some sections, particularly on the northern side, the walls feature frescos from the **Nayaka** and **Maratha** periods.",
"A row of small seated **Nandis** (bulls) adorn the top of the **Thiruchutru Maligai** walls on all four sides. Statues and sculptures representing **Lord Shiva** and other gods line the inside of the cloister. In some sections, particularly on the northern side, the walls of the cloister feature frescos from the **Nayaka** and **Maratha** periods.",
),
(
"Many statues and frescos have been placed inside protective barriers along the cloister: an unfortunate but necessary measure to protect these ancient and fragile objects from wear and vandalism.",
"Many of the statues and frescos have been placed inside protective barriers along the **Thiruchutru Maligai** – an unfortunate but necessary measure to protect these ancient and fragile objects from wear and tear and vandalism.",
),
(
"Start your circumambulation from the **Rajarajan Tiruvasal** going **clockwise**, as is the Hindu tradition.",
"Start your circumambulation from the **Rajarajan Tiruvasal** going clockwise as is the Hindu tradition.",
),

# --- South cloister ---
(
"On the southeast corner of the cloister is the **temple kitchen** with a large, roofed courtyard and well. This kitchen started functioning the day before the original consecration of the temple and has been in continuous operation ever since.",
"**Temple Kitchen:** On the southeast corner of the cloister is the temple kitchen with a large, roofed courtyard and well. This kitchen started functioning the day before the original consecration of the temple and has been in continuous operation ever since.",
),
(
"On the southeast corner of the cloister is the **temple kitchen** with a large, roofed courtyard and well.",
"**Temple Kitchen:** On the southeast corner of the cloister is the temple kitchen with a large, roofed courtyard and well.",
),
(
"This kitchen started functioning the day before the original consecration of the temple and has been in continuous operation ever since. This is the only known temple kitchen in use for more than a thousand years, providing traditional dishes for **prasadam** every single day without interruptions for war or famine.",
"This kitchen started functioning the day before the original consecration of the temple and has been in continuous operation ever since. This is the only known temple kitchen in use for more than a thousand years, providing a variety of traditional dishes that are used for **prasadam** (offerings for the Gods and distributed to worshipers) every single day without interruptions for war or famine!",
),
(
"Inside the kitchen you see an **8-foot-tall** sculpture of **Agni**, the fire god, now in a slightly damaged condition.",
"Inside the kitchen you see an **8-foot-tall** sculpture of **Agni**, the fire God, now in a slightly damaged condition.",
),
(
"Turn the corner and walk along the long southern cloister with its ancient carved pillars. The first section contains a row of **Lingams** (representations of Shiva) that **Rajaraja** and subsequent rulers are said to have brought from different parts of southern India.",
"Turn the corner and walk along the long Southern cloister with its ancient carved pillars. The first section contains a row of **Lingams** (representations of Shiva) **Rajaraja** and subsequent rulers are said to have brought from different parts of southern India.",
),
(
"In the middle of the southern cloister, next to the **Varahi** shrine (map reference **5**), is a very interesting statue of **Nandi**. Some historians believe this **Nandi** was carved during **Rajaraja\\'s** time and was intended for the current **Nandi Mandapam** (map reference **4**) but was moved to the southern side of the cloister for some reason.",
"In the middle of the southern cloister, next to the **Varahi** shrine (map reference **5**) is a very interesting statue of **Nandi**. Some historians believe that this **Nandi** was carved during **Rajaraja\\'s** time and was intended to be placed at the location of the current **Nandi Mandapam** (Map reference **4**) but for some reason was moved to the southern side of the cloister.",
),
(
"While not visible from the ground, rings are set into the walls atop the flat roof of the southern cloister. These rings were used to hold poles for tents under which physicians and other medical practitioners held advisory sessions for townspeople. Exercise classes were also provided for the general public here.",
"While not visible from the ground, there are rings are set into the walls atop the flat roof of the southern cloister. These rings were used to hold poles for tents under which physicians and other medical practitioners held advisory sessions for townspeople. Exercise classes were also provided for the general public here.",
),
(
"Continue to the back of the cloister (west side). This section is currently (**2026**) closed off due to ongoing restoration work.",
"Continue your circumambulation to the back of the cloister (west side). This section of the cloister is currently (**2026**) closed off due to ongoing restoration work.",
),

# --- Museum ---
(
"Continuing along the southern cloister, you come to the **Interpretation Center and Temple Museum** (map reference **8**) containing **Chola**, **Nayaka**, and **Maratha** period sculptures and paintings. A small shrine dedicated to **Yama Raja** shows the god of death in a seated position with buffaloes around him. A large stone water tank is seen at the end of this section.",
"Continuing along the southern cloister, you come to the **Interpretation Center and Temple Museum** (Map Reference **8**) that contains a number of **Chola**, **Nayaka** and **Maratha** period sculptures and paintings. A small shrine dedicated to **Yama Raja** shows the God of Death in a seated position with buffaloes around him. A large stone water tank is seen at the end of this section.",
),
(
"Continuing along the southern cloister, you come to the **Interpretation Center and Temple Museum** (map reference **8**) containing **Chola**, **Nayaka**, and **Maratha** period sculptures and paintings.",
"Continuing along the southern cloister, you come to the **Interpretation Center and Temple Museum** (Map Reference **8**) that contains a number of **Chola**, **Nayaka** and **Maratha** period sculptures and paintings.",
),
(
"A small shrine dedicated to **Yama Raja** shows the god of death in a seated position with buffaloes around him.",
"A small shrine dedicated to **Yama Raja** shows the God of Death in a seated position with buffaloes around him.",
),

# --- North cloister ---
(
"As you walk to the north side of the cloister, you will see a statue of **Vayuraja** (god of the winds) in sitting position with deer surrounding him in the northwest corner.",
"As you walk to the north side of the cloister, you will see a statue of **Vayuraja** (God of the Winds) in sitting position with deer surrounding him in the north-west corner.",
),
(
"The north cloister has several small shrines dedicated to gods and goddesses not represented elsewhere in the temple, including a statue of **Kubera** (god of wealth and one of the **Ashta-Dikpalas**, guardians of the eight directions) in a seated position with lions surrounding him.",
"The North cloister has several small shrines dedicated to gods and goddesses who are not represented elsewhere in the temple, including a statue of **Kubera** (God of Wealth and one of the **Ashta-Dikpalas** or guardians of the 8 directions) in a seated position with lions surrounding him.",
),
(
"One of the most notable sights in the north cloister is the beautiful **17th-century** wall frescos from the **Nayaka** period. These vibrant paintings show scenes from Hindu mythology, courtly and everyday life.",
"One of the most notable sights in the North Cloister is the beautiful **17th c.** wall frescos from the **Nayaka** period. These vibrant paintings show scenes from Hindu mythology, courtly and everyday life.",
),
(
"**Maratha** rulers installed the rows of **108 polished granite Shiva Lingams** seen in this section of the cloister. One of the most notable sights in the north cloister is the beautiful **17th-century** wall frescos from the **Nayaka** period. Complete your circumambulation, finishing at the **Rajarajan Tiruvasal** where you started.",
"As you walk to the north side of the cloister, you will see a statue of **Vayuraja** (God of the Winds) in sitting position with deer surrounding him in the north-west corner. **Maratha** rulers installed the rows of **108 polished granite Shiva Lingams** seen in this section of the cloister. One of the most notable sights in the North Cloister is the beautiful **17th c.** wall frescos from the **Nayaka** period. Complete your circumambulation, finishing at the **Rajarajan Tiruvasal** where you started.",
),
]

count = 0
for old, new in replacements:
    n = text.count(old)
    if n:
        text = text.replace(old, new)
        count += n
    else:
        # try without exact match logging
        pass

# restore map lead
text = text.replace(MAP_LEAD_MARKER, map_lead)

path.write_text(text, encoding="utf-8")
print(f"Applied {count} replacements (batch 1)")
# check remaining paraphrases for batch tracking
print("map lead ok:", map_lead in text)
