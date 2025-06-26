const stationData = [
  {
    answer: "Dhoby Ghaut",
    clues: [
      "Circle Line code is CC1.",
      "One stop away from Somerset.",
      "Connects three different MRT lines.",
      "Located in Central Singapore.",
      "Near a mall famous for Christmas decorations.",
    ]
  },
  {
    answer: "Bugis",
    clues: [
      "Downtown Line and East West Line interchange.",
      "Near a famous street market.",
      "Popular with youths and tourists.",
      "Connects blue and green lines.",
      "Starts with 'B'.",
    ]
  },
  {
    answer: "HarbourFront",
    clues: [
      "End of the North East Line.",
      "Connected to the Circle Line.",
      "Next to a giant mall and cable car station.",
      "Closest MRT to Sentosa.",
      "Located in the south of Singapore.",
    ]
  },
  {
    answer: "Woodlands",
    clues: [
      "Located near the border with Malaysia.",
      "Connects the North South and Thomson-East Coast Lines.",
      "Station codes include NS9 and TE2.",
      "Near a checkpoint and regional library.",
      "Northernmost MRT town centre.",
    ]
  },
  {
    answer: "Bishan",
    clues: [
      "North South and Circle Lines meet here.",
      "Near a popular junction mall.",
      "Serves a major junior college.",
      "Starts with a 'B'.",
      "Central Singapore interchange.",
    ]
  },
  {
    answer: "Tampines",
    clues: [
      "Located in the East.",
      "Interchange for East West, Downtown, and Thomson-East Coast Lines.",
      "Has three separate MRT stations.",
      "Surrounded by malls and bus interchange.",
      "One stop away from Simei.",
    ]
  },
  {
    answer: "Outram Park",
    clues: [
      "Triple-line interchange station.",
      "Serves hospitals and police HQ.",
      "Green, purple, and brown lines meet.",
      "A walk away from SGH.",
      "Busy junction in Chinatown district.",
    ]
  },
  {
    answer: "Orchard",
    clues: [
      "Shopping paradise in Singapore.",
      "On the North South and Thomson-East Coast Lines.",
      "Ion Orchard is above this station.",
      "Popular tourist destination.",
      "Station name starts with 'O'.",
    ]
  },
  {
    answer: "City Hall",
    clues: [
      "Located under Raffles City.",
      "Interchange for East West and North South Lines.",
      "Next to a war memorial park.",
      "One stop from Bugis.",
      "Historic civic district MRT.",
    ]
  },
  {
    answer: "Esplanade",
    clues: [
      "Circle Line station near the arts.",
      "Connected underground to Suntec and Marina Square.",
      "Named after a performing arts centre.",
      "Close to the Padang and National Library.",
      "Station name starts with 'E'.",
    ]
  },
  {
    answer: "Jurong East",
    clues: [
      "Major interchange in the West.",
      "East West Line and North South Line diverge here.",
      "Gateway to IMM and JEM malls.",
      "Large bus interchange nearby.",
      "Located in a planned commercial hub.",
    ]
  },
  {
    answer: "Paya Lebar",
    clues: [
      "East West and Circle Line interchange.",
      "Located in the East.",
      "Close to Geylang Serai.",
      "Has PLQ nearby.",
      "Yellow and green lines intersect.",
    ]
  },
  {
    answer: "Buona Vista",
    clues: [
      "East West and Circle Lines intersect.",
      "Near a science and technology park.",
      "Station name starts with 'B'.",
      "Serves One-North and Star Vista.",
      "Has a hybrid industrial-academic crowd.",
    ]
  },
  {
    answer: "Changi Airport",
    clues: [
      "Located at a world-famous terminal.",
      "End of the East West Line spur.",
      "Blue signs welcome tourists here.",
      "Station name includes 'Airport'.",
      "Linked to Terminals 2 and 3.",
    ]
  },
  {
    answer: "Bras Basah",
    clues: [
      "Circle Line station near museums.",
      "Close to SMU and the National Museum.",
      "One stop from Dhoby Ghaut.",
      "Station name starts with 'B'.",
      "Named after a historic road.",
    ]
  },
  {
    answer: "Newton",
    clues: [
      "North South and Downtown Line intersect.",
      "Near a popular food centre.",
      "Located near Novena and Orchard.",
      "One stop from Little India.",
      "Starts with 'N'.",
    ]
  },
  {
    answer: "Serangoon",
    clues: [
      "Interchange for North East and Circle Lines.",
      "Near a big shopping mall.",
      "Station starts with 'S'.",
      "Northern part of central Singapore.",
      "Connects purple and yellow lines.",
    ]
  },
  {
    answer: "Little India",
    clues: [
      "North East and Downtown Line station.",
      "Located in a culturally vibrant area.",
      "Near Tekka Market and Mustafa Centre.",
      "One stop from Rochor.",
      "Named after an ethnic enclave.",
    ]
  },
  {
    answer: "Bayfront",
    clues: [
      "Circle and Downtown Lines meet.",
      "Direct access to MBS and Gardens by the Bay.",
      "Underground station by the waterfront.",
      "Popular with tourists.",
      "You can see the skyline from above here.",
    ]
  },
  {
    answer: "Raffles Place",
    clues: [
      "Central business district station.",
      "North South and East West lines meet.",
      "Skyscrapers all around.",
      "One stop from City Hall.",
      "Named after Singapore’s founder.",
    ]
  },
  {
    answer: "Marina Bay",
    clues: [
      "End of the North South Line (NS27).",
      "Also serves Circle and Thomson Lines.",
      "Future growth area.",
      "Near Marina Barrage.",
      "Station with the same name as a casino resort.",
    ]
  },
  {
    answer: "Farrer Park",
    clues: [
      "North East Line station.",
      "Near Mustafa and City Square Mall.",
      "Popular for budget shopping.",
      "Purple line only.",
      "Named after a colonial official.",
    ]
  },
  {
    answer: "Rochor",
    clues: [
      "Downtown Line only.",
      "One stop from Little India.",
      "Close to Sim Lim Square.",
      "Light blue themed signage.",
      "Starts with 'R'.",
    ]
  },
  {
    answer: "Queenstown",
    clues: [
      "East West Line station.",
      "Oldest housing estate nearby.",
      "Named after a British monarch.",
      "One stop from Commonwealth.",
      "Serves IKEA and Anchorpoint.",
    ]
  },
  {
    answer: "Toa Payoh",
    clues: [
      "North South Line station.",
      "One of Singapore’s first towns.",
      "Close to HDB Hub.",
      "Starts with 'T'.",
      "Near Braddell and Novena.",
    ]
  },
  {
    answer: "Aljunied",
    clues: [
      "East West Line station.",
      "Located in Geylang.",
      "Has a red-light reputation.",
      "Station code is EW9.",
      "One stop from Paya Lebar.",
    ]
  },
  {
    answer: "Redhill",
    clues: [
      "East West Line station.",
      "Named after a legendary hill.",
      "One stop from Queenstown.",
      "Station color is red.",
      "Located in the south.",
    ]
  },
  {
    answer: "Tiong Bahru",
    clues: [
      "East West Line.",
      "Near a famous hipster enclave.",
      "Known for cafes and art deco flats.",
      "Starts with 'T'.",
      "One stop from Redhill.",
    ]
  },
  {
    answer: "Caldecott",
    clues: [
      "Circle Line and Thomson Line intersect.",
      "Near Mediacorp and MacRitchie Reservoir.",
      "Starts with 'C'.",
      "Deep underground station.",
      "Named after a colonial administrator.",
    ]
  },
  {
    answer: "Promenade",
    clues: [
      "Downtown and Circle Lines intersect.",
      "Near Suntec, Flyer, and Nicoll Highway.",
      "Purple-blue station theme.",
      "Leads to Esplanade and Bayfront.",
      "Starts with 'P'.",
    ]
  }
];

export default stationData;
