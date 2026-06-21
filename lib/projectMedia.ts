export type ProjectImage = {
  title: string;
  vehicle: string;
  category: string;
  image: string;
  description: string;
};

export const projectImages = {
  genesisFront: "/media/projects/genesis-front-detail.webp",
  genesisRear: "/media/projects/genesis-rear-finish.webp",
  genesisSide: "/media/projects/genesis-side-profile.webp",
  genesisConsole: "/media/projects/genesis-console-detail.webp",
  genesisDash: "/media/projects/genesis-dash-finish.webp",
  mazdaWheel: "/media/projects/mazda-wheel-finish.webp",
  mazdaSide: "/media/projects/mazda-side-gloss.webp",
  mazdaWash: "/media/projects/mazda-wash-process.webp",
  hondaExterior: "/media/projects/honda-exterior-reset.webp",
  expeditionSeat: "/media/projects/expedition-leather-seat.webp",
  expeditionConsole: "/media/projects/expedition-console.webp",
  expeditionLeather: "/media/projects/expedition-leather-row.webp",
  fordTruckFront: "/media/projects/ford-truck-front.webp",
  fordTruckFinish: "/media/projects/ford-truck-finish.webp",
  fordLeatherFront: "/media/projects/ford-leather-front.webp",
  fordConsole: "/media/projects/ford-console-finish.webp",
  fordRearLeather: "/media/projects/ford-rear-leather.webp",
  fordCabinWide: "/media/projects/ford-cabin-wide.webp",
  reviewJonathan: "/media/projects/review-jonathan-mitchell.jpg",
  reviewJesus: "/media/projects/review-jesus-valencia.jpg",
} as const;

export const featuredProjects: ProjectImage[] = [
  {
    title: "Genesis Exterior Preservation",
    vehicle: "Genesis GV80",
    category: "Exterior finish reset",
    image: projectImages.genesisFront,
    description: "A white luxury SUV refined for cleaner paint presentation, sharper trim contrast, and a more composed ownership feel.",
  },
  {
    title: "Black Mazda Gloss Recovery",
    vehicle: "Mazda CX-5",
    category: "Wash process + gloss",
    image: projectImages.mazdaWash,
    description: "Dark paint documented through the wash and finish process, with wheel, gloss, and reflection proof from the appointment.",
  },
  {
    title: "Ford Truck Interior Preservation",
    vehicle: "Ford F-150 King Ranch",
    category: "Leather cabin restoration",
    image: projectImages.fordCabinWide,
    description: "Brown leather, cabin touchpoints, console surfaces, and rear seating restored for a truck owner who expects the interior to feel cared for.",
  },
  {
    title: "Honda Daily Driver Reset",
    vehicle: "Honda CR-V",
    category: "Daily-driver preservation",
    image: projectImages.hondaExterior,
    description: "A practical East Texas daily driver brought back into a cleaner, easier-to-maintain state without losing the human proof of real work.",
  },
];

export const galleryImages: ProjectImage[] = [
  ...featuredProjects,
  {
    title: "Genesis Side Profile",
    vehicle: "Genesis GV80",
    category: "Exterior presentation",
    image: projectImages.genesisSide,
    description: "A finished side profile showing the stance, wheels, glass, and paint presentation after care.",
  },
  {
    title: "Genesis Console Detail",
    vehicle: "Genesis GV80",
    category: "Interior touchpoints",
    image: projectImages.genesisConsole,
    description: "High-contact console areas cleaned and presented with the calm precision expected in a luxury cabin.",
  },
  {
    title: "Mazda Wheel Finish",
    vehicle: "Mazda CX-5",
    category: "Wheel and lower-body detail",
    image: projectImages.mazdaWheel,
    description: "Wheels and lower-body areas brought into focus because small surfaces often reveal the real standard.",
  },
  {
    title: "Ford Truck Exterior",
    vehicle: "Ford F-150",
    category: "Truck preservation",
    image: projectImages.fordTruckFinish,
    description: "A working truck documented after exterior care, with chrome, paint, and front-end presence restored.",
  },
  {
    title: "Leather Console Restoration",
    vehicle: "King Ranch Interior",
    category: "Leather preservation",
    image: projectImages.fordConsole,
    description: "Leather and console surfaces conditioned and reset for a richer, more orderly cabin experience.",
  },
  {
    title: "Rear Leather Detail",
    vehicle: "King Ranch Interior",
    category: "Cabin restoration",
    image: projectImages.fordRearLeather,
    description: "Rear seating and cabin surfaces cleaned for the owner who notices what passengers see and feel.",
  },
  {
    title: "Brown Leather Row",
    vehicle: "Expedition Interior",
    category: "Interior preservation",
    image: projectImages.expeditionLeather,
    description: "Warm leather seating restored with a focus on comfort, presentation, and pride of ownership.",
  },
  {
    title: "Interior Command Center",
    vehicle: "Expedition Interior",
    category: "Cabin touchpoints",
    image: projectImages.expeditionConsole,
    description: "Cupholders, center console, leather, and plastics brought back into a clean, composed state.",
  },
];

export const reviewProof = [
  {
    name: "Jonathan Mitchell",
    detail: "2 reviews · 3 photos",
    image: projectImages.reviewJonathan,
    quote: "The kind of public review proof that turns real project documentation into trust.",
  },
  {
    name: "Jesus Valencia",
    detail: "12 reviews · 1 photo",
    image: projectImages.reviewJesus,
    quote: "Excellent service, deep cleaning and detailing. My car was really dirty and it came out looking brand new.",
  },
] as const;
