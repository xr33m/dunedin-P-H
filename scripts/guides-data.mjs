// Guides (the site's blog). Each guide becomes /guides/<slug>/ and is listed on /guides/.
// Inline links in paragraphs and list items: [[link text|/path/]].
// To add a post: copy an entry, change the slug and content, run `npm run build`.

export const GUIDES = [
  {
    slug: 'burst-pipe-what-to-do',
    title: 'What to Do If a Pipe Bursts',
    benefit: 'The First 10 Minutes, Step by Step',
    kw: ['Burst Pipe Help', 'emergency plumbing', 'leak repair', 'burst pipe repair'],
    description: 'A pipe has burst in your Edinburgh home. Here is exactly what to do in the first 10 minutes to stop the water, protect your home and your insurance claim.',
    excerpt: 'Water pouring through a ceiling or out of a cupboard? Here’s what to do, in order, before the plumber arrives.',
    photo: 'copper-supply-valves',
    photoAlt: 'Copper water pipes with isolation valves under a sink',
    services: ['emergency-plumbing', 'leak-repair'],
    published: '2026-10-22',
    keyPoints: [
      'Turn the water off at the stopcock first — everything else comes second.',
      'Keep away from electrics that water has reached; switch them off at the fuse box only if you can do it from somewhere dry.',
      'Open the cold taps to drain the pipes, then catch and mop what’s left.',
      'Take photos before you clear up — your insurer will want them.',
    ],
    sections: [
      {
        h2: 'Step 1: Turn Off the Water at the Stopcock',
        paras: [
          'The single most useful thing you can do is shut off the mains water. Your internal stopcock is usually under the kitchen sink, but in older Edinburgh flats it can be in a hall cupboard, under the floorboards near the front door, behind a bath panel or even in the common stair. Turn it clockwise until it stops.',
          'If you’ve never found it, read our [[guide to finding your stopcock in an Edinburgh flat|/guides/find-stopcock-edinburgh-flat/]] once this is over — knowing where it is turns a disaster into a nuisance.',
        ],
      },
      {
        h2: 'Step 2: Make the Electrics Safe',
        paras: [
          'Water and electricity don’t mix. If water is coming through a ceiling light, running down a wall with sockets on it, or has reached your fuse box, don’t touch the switches or anything plugged in.',
          'If you can reach the consumer unit (fuse box) from somewhere completely dry, switch off the main switch. If you can’t do that safely, leave it and keep everyone away from the wet area until an electrician has checked it.',
        ],
      },
      {
        h2: 'Step 3: Drain the System and Contain the Water',
        paras: ['Once the supply is off, the pipes still hold water. Get rid of it in a controlled way:'],
        list: [
          'Open all the cold taps in the house to drain the pipework.',
          'Flush the toilets to empty the cisterns.',
          'If you have an electric water heater or immersion heater, switch it off.',
          'Put buckets and towels under the leak, and move furniture, rugs and electricals out of the way.',
          'If a ceiling is bulging with water, keep well clear of it — it can come down without warning.',
        ],
      },
      {
        h2: 'Step 4: Record the Damage for Your Insurer',
        paras: [
          'Before you mop up, take photos and a short video of the leak, the damaged ceilings, floors and belongings. Note the time it started. Most home insurance policies cover sudden escape of water, and clear evidence makes the claim far smoother.',
          'Keep any damaged pipe the plumber removes — some insurers ask to see it.',
        ],
      },
      {
        h2: 'Step 5: Call a Plumber — and Your Neighbours If You’re in a Flat',
        paras: [
          'Call a plumber who answers 24 hours a day. A good one will talk you through anything you haven’t managed yet while they’re on the way. We cover [[emergency plumbing across Edinburgh|/services/emergency-plumbing/]] around the clock, and making things safe always comes first; the price for the permanent repair is agreed with you before we start it.',
          'In a tenement or block of flats, knock on the door below — water travels down quickly and they may not know yet. If the burst is in a shared pipe, let your factor know too.',
        ],
      },
      {
        h2: 'Why Pipes Burst in Edinburgh Homes',
        paras: [
          'The most common causes we see are frozen pipes in cold snaps (especially in lofts, under-floor voids and outside walls), old fittings and joints giving way, and pipework damaged during building work. Older tenements and Georgian properties often have pipe runs in unheated spaces that were never insulated.',
          'If a pipe has frozen but not split, thaw it gently with a hairdryer or warm towels, working from the tap end back. Never use a naked flame or boiling water.',
        ],
      },
    ],
    faqs: [
      ['Will my insurance cover a burst pipe?', 'Most UK home insurance policies cover sudden escape of water, but not wear and tear or slow leaks that have gone on for a long time. Check your policy, report the claim promptly and keep photos and receipts.'],
      ['Can I fix a burst pipe myself?', 'You can make it safe — water off, electrics safe, water contained. A temporary repair clamp can hold a small split, but a proper repair should be done by a plumber so it doesn’t fail again behind a wall or floor.'],
      ['How quickly can an emergency plumber get to me in Edinburgh?', 'It depends on the time of day and where you are, but a real emergency plumber will give you an honest arrival time on the phone and talk you through making things safe while you wait.'],
    ],
  },

  {
    slug: 'find-stopcock-edinburgh-flat',
    title: 'How to Find Your Stopcock in an Edinburgh Flat',
    benefit: 'Tenements, Georgian Flats & Modern Homes',
    kw: ['Stopcock Help', 'emergency plumbing', 'leak repair', 'water line repair'],
    description: 'Where to find the stopcock in an Edinburgh tenement, Georgian flat or modern home, how to turn it off, and what to do if it is stuck or shared.',
    excerpt: 'In older Edinburgh flats the stopcock is rarely where you’d expect. Here’s where to look — before you need it.',
    photo: 'first-fix-supply-waste',
    photoAlt: 'Exposed water supply and waste pipes during a plumbing first fix',
    services: ['emergency-plumbing', 'water-line-repair'],
    published: '2026-10-22',
    keyPoints: [
      'Start where the cold water pipe comes into your home — usually the kitchen.',
      'In tenements, check hall cupboards, under floorboards, behind bath panels and the common stair.',
      'Turn it clockwise to close. If it won’t budge, don’t force it.',
      'Test it once a year so it works when you need it.',
    ],
    sections: [
      {
        h2: 'Why Edinburgh Stopcocks Are Hard to Find',
        paras: [
          'In a new-build house the stopcock is almost always under the kitchen sink. In Edinburgh’s tenements and Georgian flats, the plumbing has often been altered several times over a hundred years or more, and the stopcock ends up wherever the last person put it. We regularly find them hidden behind kitchen units, boxed in, or under a floor that has since been carpeted over.',
        ],
      },
      {
        h2: 'Where to Look, in Order',
        list: [
          'Under the kitchen sink, at the back of the cupboard — follow the cold pipe that feeds the kitchen tap.',
          'In the hall or a storage cupboard near the front door, often low down near the skirting.',
          'Under the floorboards just inside the front door — look for a small lift-out hatch.',
          'Behind the bath panel or in the bathroom, where the supply rises in some conversions.',
          'In the common stair or close — some tenements have individual stopcocks for each flat on the landing or at the foot of the stair.',
          'In the loft or a high cupboard, if your flat is fed from a cold water tank.',
        ],
      },
      {
        h2: 'How to Turn It Off',
        paras: [
          'Turn the handle clockwise until it stops — “righty tighty”. Then open the cold kitchen tap to check the water has stopped. If it slows but doesn’t stop completely, the valve may be worn, which is common on old brass stopcocks.',
          'If a lever-style valve is fitted instead, a quarter turn so the lever sits across the pipe closes it.',
        ],
      },
      {
        h2: 'What If It’s Stuck, Leaking or Shared?',
        paras: [
          'Don’t force a seized stopcock with a wrench — old ones can snap and make things far worse. If it won’t move, the outside stopcock in the pavement at your property boundary belongs to Scottish Water; in a real emergency, call a plumber or Scottish Water rather than trying to dig it out yourself.',
          'In some tenements one stopcock controls more than one flat. If yours does, it’s worth fitting your own isolation valve so you can turn off your water without cutting off your neighbours. Replacing a seized or shared stopcock is a quick, inexpensive job — see our [[water line repair service|/services/water-line-repair/]].',
        ],
      },
      {
        h2: 'Make It Easy for Next Time',
        paras: [
          'Once you’ve found it, label it, make sure everyone in the house knows where it is, and keep the cupboard in front of it clear. Turn it off and on once a year so it doesn’t seize. It’s the cheapest insurance you’ll ever buy against a [[burst pipe|/guides/burst-pipe-what-to-do/]].',
        ],
      },
    ],
    faqs: [
      ['Which way do I turn a stopcock to turn the water off?', 'Clockwise. If it’s a lever valve, turn the lever a quarter turn so it sits across the pipe.'],
      ['Who owns the stopcock outside in the pavement?', 'Scottish Water is responsible for the pipe up to and including the stopcock at your property boundary. Everything from there into your home is the owner’s responsibility.'],
      ['Can a plumber move my stopcock somewhere easier to reach?', 'Yes. Moving it, or adding an easy-to-reach isolation valve, is a common small job and well worth doing in older flats.'],
    ],
  },

  {
    slug: 'leak-from-flat-above-edinburgh',
    title: 'Water Coming Through Your Ceiling From the Flat Above?',
    benefit: 'What to Do in an Edinburgh Tenement',
    kw: ['Ceiling Leak Advice', 'emergency plumbing', 'leak detection', 'ceiling leak repair'],
    description: 'Water coming through the ceiling from the flat above in an Edinburgh tenement? What to do straight away, who is usually responsible, and how insurance and shared pipes work in Scotland.',
    excerpt: 'Water dripping from the flat upstairs is one of the most common calls we get in Edinburgh. Here’s what to do — and who usually pays.',
    photo: 'copper-riser',
    photoAlt: 'Copper water riser pipe running up a wall',
    services: ['leak-repair', 'emergency-plumbing'],
    published: '2026-10-22',
    keyPoints: [
      'Make it safe first: keep away from wet light fittings and switch off at the fuse box if you can do so safely.',
      'Contact the neighbour above straight away — they may not know.',
      'Photograph everything for your insurer.',
      'A pipe serving one flat is usually that owner’s responsibility; shared pipes are usually shared — but your title deeds decide.',
    ],
    sections: [
      {
        h2: 'Right Now: Make It Safe',
        paras: [
          'If water is coming through a ceiling light or near sockets, don’t touch them. Switch off the electricity at the consumer unit if you can reach it from somewhere dry. Put buckets down, move belongings, and keep clear of any ceiling that’s sagging — old lath-and-plaster ceilings in tenements hold a lot of water before they give way.',
        ],
      },
      {
        h2: 'Contact the Flat Above',
        paras: [
          'Go upstairs and knock. Most leaks from above are a bath or shower seal, a washing machine hose, a toilet cistern or a pipe joint, and the neighbour can often stop it by turning off their stopcock or the appliance.',
          'If nobody answers, try your factor if you have one, and leave a note. If water is pouring and you can’t get access, call an emergency plumber — in some tenements the flat’s stopcock is in the common stair and can be turned off from there.',
        ],
      },
      {
        h2: 'Who Is Responsible for the Leak?',
        paras: [
          'In Scotland, tenement repairs are governed first by your title deeds, and where the deeds are silent or unclear by the Tenement Management Scheme under the Tenements (Scotland) Act 2004. As a general rule:',
        ],
        list: [
          'A pipe, fitting or appliance that serves only one flat is normally that flat owner’s responsibility.',
          'Pipes that serve more than one flat — such as a shared rising main or soil stack — are often treated as common, with repair costs shared between the owners who use them.',
          'Your title deeds can change these rules, so check them or ask your factor or solicitor.',
        ],
        after: [
          'The Act also requires every tenement flat owner to have buildings insurance for their flat. For impartial help with tenement repairs, the Scottish Government’s guidance on mygov.scot and the Under One Roof website are good places to start. This guide is general information, not legal advice.',
        ],
      },
      {
        h2: 'Insurance: What to Do',
        list: [
          'Photograph and video the damage and the source of the leak as soon as you can.',
          'Tell your home insurer promptly, and ask your neighbour to tell theirs.',
          'Keep receipts for any emergency work, drying equipment or replacement items.',
          'Ask the plumber for a short written note of what caused the leak — insurers and factors find it very helpful.',
        ],
      },
      {
        h2: 'Getting the Leak Found and Fixed',
        paras: [
          'Sometimes the obvious culprit isn’t the cause: water can track along joists and pipes and appear several feet from where it started, or even come from two floors up. We trace the source properly before anything is opened up, isolate what we can, and give you and your neighbour the facts to take to insurers. See our [[leak detection and repair service|/services/leak-repair/]], or call us now if it’s still coming through.',
        ],
      },
    ],
    faqs: [
      ['My upstairs neighbour isn’t home and water is pouring in. What can I do?', 'Make your flat safe, then call an emergency plumber. Some tenement flats have their stopcock in the common stair, and in other cases access can be arranged through the factor or owner.'],
      ['Who pays for the damage to my ceiling?', 'Usually your own buildings and contents insurance handles the damage in your flat, and insurers settle between themselves. Where the leak came from a neighbour’s neglect, their insurer may be liable. Your title deeds and policies decide the details.'],
      ['Can you tell which flat the leak is actually coming from?', 'Yes. We trace the water back to its source rather than guessing, which matters when it has travelled along joists or come from more than one floor up.'],
    ],
  },

  {
    slug: 'lead-pipes-edinburgh',
    title: 'Lead Pipes in Edinburgh Homes',
    benefit: 'How to Check, and What Replacement Involves',
    kw: ['Lead Pipe Advice', 'lead pipe replacement', 'water line repair', 'plumbing'],
    description: 'Many Edinburgh homes built before 1970 still have lead water pipes. How to check yours, who is responsible for which section, and what replacement involves.',
    excerpt: 'If your home was built before 1970 it may still have lead pipes. Here’s how to tell — and what to do about it.',
    photo: 'fitout-first-fix',
    photoAlt: 'New supply pipework being installed during a plumbing first fix',
    services: ['lead-replacement', 'water-line-repair'],
    published: '2026-10-22',
    keyPoints: [
      'Homes built before 1970 may have lead pipework — it was phased out in the 1960s and banned in 1969.',
      'Lead pipe is dull grey, soft and shows shiny silver metal when lightly scratched.',
      'Scottish Water looks after the pipe up to the boundary stopcock; the owner is responsible from there into the home.',
      'The only way to remove the risk completely is to replace the lead pipework.',
    ],
    sections: [
      {
        h2: 'Does My Edinburgh Home Have Lead Pipes?',
        paras: [
          'According to Scottish Water, homes built before 1970 may have lead pipework, because lead service pipes were phased out during the 1960s and banned in 1969. That covers a large share of Edinburgh’s housing — tenements in Leith, Marchmont and Gorgie, Georgian New Town flats and older villas alike. Many have been replaced over the years, but plenty haven’t, especially the short section where the supply enters the building.',
        ],
      },
      {
        h2: 'How to Check Your Pipes',
        paras: ['Find the pipe coming into your home just before the internal stopcock, usually under the kitchen sink, and look for these signs:'],
        list: [
          'Colour: lead is a dull, matt grey. Copper is orange-brown; plastic is usually blue, black or white.',
          'Scratch test: gently scrape the surface with a coin. Lead shows bright silver underneath.',
          'Knock test: tap it with something metal. Lead gives a dull thud rather than a ring.',
          'Joints: lead pipes often have bulbous, swollen-looking joints rather than neat fittings.',
          'Magnet: lead isn’t magnetic (neither is copper, so use this with the other signs).',
        ],
        after: [
          'If you’re not sure, a plumber can confirm it in a couple of minutes. Scottish Water will also sample your water for lead if you ask them.',
        ],
      },
      {
        h2: 'Who Is Responsible for Which Pipe?',
        paras: [
          'Scottish Water is responsible for the water main in the street and the communication pipe up to and including the stopcock at your property boundary. The property owner is responsible for the supply pipe from that boundary stopcock into the building, and for all the plumbing inside. In tenements, the supply into the building can be shared between several flats, so replacement is often best organised with your neighbours or factor.',
          'Scottish Water says that where its own lead pipes are found during investigation, it will remove them — so when you replace your section, it’s worth asking them to check theirs.',
        ],
      },
      {
        h2: 'What Lead Pipe Replacement Involves',
        paras: [
          'Replacement means running a new supply pipe — normally modern plastic outside and copper inside — from the boundary into the home, and replacing any lead sections indoors. In a house that usually means a trench from the pavement to the wall; in a tenement it often means working in the common stair or cellar. Most homes are only without water for part of a day. Often the new pipe improves your water pressure too, because old lead pipes are narrow.',
          'We’ll check what you have, explain which parts are yours, and agree a fixed price before any work starts. See our [[lead pipe replacement service|/services/lead-replacement/]].',
        ],
      },
    ],
    faqs: [
      ['Is it dangerous to drink water from lead pipes?', 'Lead can dissolve into water that sits in lead pipes. For health advice, Scottish Water refers people to NHS inform. The only way to remove the risk entirely is to replace the lead pipework.'],
      ['Will Scottish Water replace my lead pipe for free?', 'Scottish Water is responsible for its own pipe up to the boundary stopcock. The supply pipe from there into your home is the owner’s responsibility. Ask them to check their section when you replace yours.'],
      ['How long does lead pipe replacement take?', 'Most homes are done within a day or two, and you’re usually only without water for part of a day. Tenements can take longer if the supply is shared and access needs arranging.'],
    ],
  },

  {
    slug: 'bathroom-renovation-cost-edinburgh',
    title: 'How Much Does a Bathroom Renovation Cost in Edinburgh?',
    benefit: '2026 Price Guide for Edinburgh Homes',
    kw: ['Bathroom Renovation Cost', 'bathroom renovation', 'bathroom fitters', 'shower room installation'],
    description: 'What a bathroom renovation costs in Edinburgh in 2026: typical UK price ranges, what drives the cost in tenements and older homes, and how to get a fixed price.',
    excerpt: 'Typical prices for a new bathroom, what pushes the cost up in Edinburgh flats, and how to avoid surprises.',
    photo: 'bath-freestanding',
    photoAlt: 'Freestanding bath in a renovated bathroom',
    services: ['bathroom-renovations', 'tap-repair-installation'],
    published: '2026-10-22',
    keyPoints: [
      'UK guide prices for a full bathroom run from around £3,500 for a budget refit to £11,000–£15,000 for a premium one.',
      'Labour is typically £1,800–£4,000 and materials £2,000–£6,000.',
      'A typical full bathroom takes around 6–8 working days.',
      'Tenement access, old pipework and parking can all affect cost in Edinburgh — a proper survey avoids surprises.',
    ],
    sections: [
      {
        h2: 'Typical Bathroom Renovation Prices',
        paras: ['Published UK guide prices for 2026 (MyJobQuote) put a full bathroom refurbishment at roughly:'],
        table: [
          ['Budget refit', '£3,500 – £4,500'],
          ['Standard refit', '£6,000 – £8,000'],
          ['Premium refit', '£11,000 – £15,000'],
          ['Small bathroom', '£2,200 – £5,500'],
        ],
        after: [
          'Those are national averages. Scotland generally sits around the middle of the UK range, but your price depends far more on your room and what you choose than on the postcode.',
        ],
      },
      {
        h2: 'Where the Money Goes',
        list: [
          'Labour: typically £1,800–£4,000 for a full refit.',
          'Materials: typically £2,000–£6,000 — the suite, shower, taps, tiles or wall panels, flooring and lighting.',
          'Stripping out the old bathroom and disposing of it.',
          'Any electrical work, plastering and decorating.',
        ],
        after: ['Swapping tiles for wall panels, keeping the layout the same and choosing a mid-range suite are the three biggest ways to keep the cost down without it looking cheap.'],
      },
      {
        h2: 'What Pushes the Cost Up in Edinburgh',
        list: [
          'Tenement access: carrying everything up several flights of a common stair takes time.',
          'Parking and skips: much of central Edinburgh has controlled parking, and a skip on the street needs a council permit.',
          'Old pipework: lead or corroded iron supply pipes, or old waste pipes, often need replacing once the room is opened up.',
          'Floors and walls: uneven floors, lath-and-plaster walls and old joists in tenements and Georgian flats may need extra preparation.',
          'Moving things around: relocating the toilet or shower means new waste and supply runs, which adds labour.',
        ],
      },
      {
        h2: 'How Long It Takes',
        paras: [
          'A typical full bathroom takes around six to eight working days from strip-out to finish; a simple like-for-like refit can be closer to five. Shower rooms are often quicker. You’ll usually have a working toilet most evenings — ask your fitter how they plan for that.',
        ],
      },
      {
        h2: 'How to Get a Price You Can Trust',
        paras: [
          'A reliable bathroom quote should be based on seeing the room, list exactly what’s included, and be fixed rather than “estimated”. We visit, measure, talk through what you want and what it’ll cost, and agree one price before we start — then the same plumber plans and builds it. Have a look at [[bathroom renovations we’ve completed in Edinburgh|/services/bathroom-renovations/]].',
        ],
      },
    ],
    faqs: [
      ['How much is a small shower room in Edinburgh?', 'National guide prices put a small bathroom at roughly £2,200–£5,500 depending on the finish. A shower room is often at the lower end because there’s no bath, but a proper visit is the only way to give a real figure.'],
      ['Do I need permission to renovate my bathroom in a tenement?', 'A like-for-like bathroom refit doesn’t normally need building warrant. Structural changes or new drainage might. In a listed building, check with the council before changing anything visible. Your title deeds may also require you to tell the other owners about certain works.'],
      ['Can you just replace the suite and keep my tiles?', 'Yes, and it’s one of the easiest ways to save money — as long as the tiles are in good condition and the new suite fits the existing pipework positions.'],
    ],
  },

  {
    slug: 'emergency-plumber-cost-edinburgh',
    title: 'How Much Does an Emergency Plumber Cost in Edinburgh?',
    benefit: 'Call-Out Charges, Hourly Rates & What’s Fair',
    kw: ['Emergency Plumber Cost', 'emergency plumbing', 'leak repair', '24 hour plumber'],
    description: 'What an emergency plumber costs in Edinburgh: typical UK call-out charges and hourly rates, what affects the price, and how to avoid being overcharged.',
    excerpt: 'Typical call-out charges and hourly rates, what makes the price go up, and the questions to ask before anyone starts work.',
    photo: 'cracked-basin',
    photoAlt: 'Cracked bathroom basin needing urgent repair',
    services: ['emergency-plumbing', 'leak-repair'],
    published: '2026-10-22',
    keyPoints: [
      'WaterSafe puts typical UK plumber rates at £40–£70 an hour, with emergency call-out fees of £60–£120.',
      'Nights, weekends and bank holidays cost more.',
      'Ask how the call-out is charged and what’s included before anyone sets off.',
      'A good plumber makes things safe first and agrees the price of the permanent repair with you.',
    ],
    sections: [
      {
        h2: 'Typical Emergency Plumber Prices',
        paras: ['WaterSafe, the UK scheme for approved plumbers, puts typical 2026 prices at:'],
        table: [
          ['Hourly rate', '£40 – £70'],
          ['Day rate', '£250 – £400'],
          ['Emergency call-out fee', '£60 – £120'],
        ],
        after: [
          'Out-of-hours visits — evenings, overnight, weekends and bank holidays — usually cost more, and London and the South East are generally the most expensive parts of the UK.',
        ],
      },
      {
        h2: 'What Affects the Price',
        list: [
          'Time of day: a 3am call-out costs more than a weekday afternoon.',
          'Whether the call-out includes any labour, or is charged on top.',
          'The fix itself: a split pipe under a sink is quick; a leak inside a wall or under a tenement floor takes longer to find and reach.',
          'Parts: most emergency repairs need only standard fittings, but some need ordering.',
          'Access: tenement stairs, controlled parking and getting into neighbouring flats all add time.',
        ],
      },
      {
        h2: 'How to Avoid Being Overcharged',
        list: [
          'Ask on the phone how the call-out fee works and roughly what the first hour costs.',
          'Ask whether they’ll make it safe first and then agree the price of the full repair before doing it.',
          'Check reviews from real local customers — and be wary of national “local” numbers that pass you to whoever is free.',
          'Get a written receipt explaining what was done — useful for your insurer.',
        ],
      },
      {
        h2: 'Is It Really an Emergency?',
        paras: [
          'Call someone now for water you can’t stop, water near electrics, no water at all, a blocked or overflowing toilet that’s the only one in the house, or a leak coming through a ceiling. A dripping tap, a slow-draining sink or a running toilet can usually wait for a normal-hours visit, which costs less. If you’re not sure, ask — an honest plumber will tell you if it can wait.',
          'Our [[24/7 emergency plumbing service|/services/emergency-plumbing/]] covers Edinburgh, the Lothians and Fife. We make things safe first, and the price for the proper repair is agreed with you before we start it.',
        ],
      },
    ],
    faqs: [
      ['Do emergency plumbers charge more at night?', 'Usually, yes. Evening, overnight, weekend and bank holiday call-outs typically cost more than weekday daytime visits.'],
      ['Is the call-out fee on top of the repair?', 'It varies between plumbers. Some include a first period of labour in the call-out; others charge it separately. Always ask before they set off.'],
      ['What can I do myself before the plumber arrives?', 'Turn off the water at the stopcock, keep away from wet electrics, drain the taps and contain the water. Our burst pipe guide walks through it step by step.'],
    ],
  },

  {
    slug: 'radiator-cold-at-top-or-bottom',
    title: 'Radiator Cold at the Top or Bottom?',
    benefit: 'What It Means and How to Fix It',
    kw: ['Radiator Advice', 'radiator repair', 'radiator installation', 'plumbing and heating'],
    description: 'A radiator that is cold at the top usually needs bleeding; cold at the bottom usually means sludge. How to tell the difference, what you can fix yourself and when to call a plumber.',
    excerpt: 'Where a radiator is cold tells you what’s wrong with it. Here’s how to read the signs — and the easy fixes.',
    photo: 'radiator-column',
    photoAlt: 'White column radiator on a wall',
    services: ['radiator-maintenance', 'plumbing-heating'],
    published: '2026-10-22',
    keyPoints: [
      'Cold at the top, warm at the bottom: air in the radiator — bleed it.',
      'Cold at the bottom or in the middle: sludge has built up — it needs flushing.',
      'Some radiators cold, others hot: the system needs balancing.',
      'No heat anywhere: the problem is the boiler, which needs a Gas Safe engineer.',
    ],
    sections: [
      {
        h2: 'Cold at the Top: Trapped Air',
        paras: ['Air collects at the top of a radiator and stops hot water filling it. Bleeding it takes five minutes:'],
        list: [
          'Turn the heating off and let the radiators cool.',
          'Hold a cloth under the bleed valve at the top corner and turn it anticlockwise with a radiator key, about a quarter turn.',
          'You’ll hear a hiss as the air escapes. Close the valve as soon as water starts to come out.',
          'If your system has a pressure gauge, check it afterwards — bleeding can lower the pressure, and the manufacturer’s instructions will tell you how to top it up.',
        ],
        after: ['If the same radiator needs bleeding every few weeks, something is letting air in, and it’s worth having it looked at.'],
      },
      {
        h2: 'Cold at the Bottom or in the Middle: Sludge',
        paras: [
          'Over the years, rust and debris form a black sludge that settles in the bottom of radiators and blocks the flow. Bleeding won’t fix it. The radiator needs to be taken off and flushed through, or the whole system cleaned if several are affected. Fitting a magnetic filter afterwards helps stop it coming back.',
        ],
      },
      {
        h2: 'Some Radiators Hot, Others Cold: Balancing',
        paras: [
          'If the radiators nearest the boiler are roasting and the ones furthest away are lukewarm, the system needs balancing. That means adjusting the lockshield valve on each radiator (the one under a plastic cap) so hot water is shared out evenly. It’s fiddly but not difficult — or we can do it in one visit.',
        ],
      },
      {
        h2: 'Leaking, Stuck or Old Radiators',
        paras: [
          'Weeping valves, a radiator that won’t turn off, or one that’s simply too small for the room are all straightforward fixes. We repair and replace radiators and valves across Edinburgh, including swapping old panels for column or vertical designs — see our [[radiator repair and installation service|/services/radiator-maintenance/]].',
          'One thing we don’t do is boilers. If no radiators heat up at all, or the boiler is showing a fault, you need a Gas Safe registered engineer.',
        ],
      },
    ],
    faqs: [
      ['How often should I bleed my radiators?', 'Only when they need it — when they’re cold at the top. Many people check them once at the start of the heating season.'],
      ['Why is my radiator cold at the bottom?', 'Almost always sludge — debris that has settled in the radiator and blocks the flow. It needs flushing rather than bleeding.'],
      ['Can you replace a radiator without draining the whole system?', 'Often, yes. Depending on the valves fitted, a single radiator can sometimes be isolated and swapped with only a partial drain.'],
    ],
  },

  {
    slug: 'low-water-pressure-edinburgh-flat',
    title: 'Low Water Pressure in an Edinburgh Flat?',
    benefit: 'Common Causes and How to Fix Them',
    kw: ['Water Pressure Help', 'water line repair', 'lead pipe replacement', 'tap repair'],
    description: 'Why water pressure is often low in Edinburgh flats and tenements — from part-closed stopcocks to old lead pipes and shared supplies — and how each one is fixed.',
    excerpt: 'Weak showers and slow-filling baths are common in older Edinburgh flats. Here’s why, and what actually fixes it.',
    photo: 'shower-room-4',
    photoAlt: 'Modern shower in a tiled shower room',
    services: ['water-line-repair', 'lead-replacement'],
    published: '2026-10-22',
    keyPoints: [
      'First check whether it’s just you or the whole street — if neighbours are affected, it’s usually a Scottish Water issue.',
      'Make sure your stopcock is fully open.',
      'Old, narrow lead or iron supply pipes are a common cause in tenements.',
      'One slow tap or shower usually means a blocked aerator, head or valve.',
    ],
    sections: [
      {
        h2: 'Step 1: Is It Just You?',
        paras: [
          'Ask a neighbour or check Scottish Water’s website for work or bursts in your area. If the whole street has low pressure, it’s a supply issue for Scottish Water rather than a problem in your home.',
        ],
      },
      {
        h2: 'Step 2: Check the Obvious',
        list: [
          'Make sure your stopcock is fully open — it’s often left half-closed after a repair.',
          'If only one tap or shower is weak, unscrew the aerator or shower head and clean it out.',
          'Check isolation valves under sinks and behind toilets — the slot should run along the pipe when open.',
        ],
      },
      {
        h2: 'Common Causes in Edinburgh Tenements',
        list: [
          'Old supply pipes: lead and iron pipes are narrow and may be partly blocked, so less water gets through. Replacing them often makes a big difference — see our [[guide to lead pipes in Edinburgh|/guides/lead-pipes-edinburgh/]].',
          'Shared supplies: in some tenements several flats share one supply, so pressure drops when everyone uses water at once.',
          'Top-floor flats: water has further to climb, and some flats are fed from a tank in the loft, which gives low pressure by design.',
          'Hidden leaks: a leak on your supply pipe lets water escape before it reaches your taps.',
        ],
      },
      {
        h2: 'How It’s Fixed',
        paras: [
          'The right fix depends on the cause, which is why it’s worth having it diagnosed rather than buying a pump straight away. Often it’s as simple as replacing a seized stopcock or a restricted valve; sometimes the old supply pipe needs replacing. We trace the cause and agree the price before any work — see our [[water line repair service|/services/water-line-repair/]].',
        ],
      },
    ],
    faqs: [
      ['Why is my water pressure suddenly low?', 'A sudden drop is often down to Scottish Water work or a burst nearby, a stopcock or valve that’s been partly closed, or a new leak. Check with a neighbour first.'],
      ['Will a new supply pipe improve my water pressure?', 'If your current pipe is old, narrow lead or iron, replacing it often makes a noticeable difference.'],
      ['Can I fit a pump to boost my pressure?', 'Sometimes, but there are rules about pumping directly from the mains, and a pump won’t fix a leak or a blocked pipe. Find the cause first.'],
    ],
  },
];
