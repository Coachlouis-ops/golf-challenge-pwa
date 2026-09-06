export type ImprovePlayerBoosterProduct = {
  code: string;
  category:
    | "player_protecting"
    | "player_reload"
    | "player_tech"
    | "player_accessory"
    | "player_image";
  productName: string;
  description: string;
  image: string;
};




export const IMPROVE_PLAYER_BOOSTERS: ImprovePlayerBoosterProduct[] = [

  // =========================================================
  // PLAYER PROTECTING
  // =========================================================

  {
    code: "protect-001",
    category: "player_protecting",
    productName: "Umbrella",
    description:
      "Automatic Open Golf Umbrella - Extra Large Double Canopy, All-Weather Protection",
    image: "/boosters/player_protect001.png",
  },

  {
    code: "protect-002",
    category: "player_protecting",
    productName: "Sunscreen",
    description:
      "Sun Lab - water resistant, non-greasy, non-sticky sport sunblock, SPF 50",
    image: "/boosters/player_protect002.png",
  },

  {
    code: "protect-003",
    category: "player_protecting",
    productName: "Golf Cap",
    description:
      "Premium golf cap - mens, ladies, various colours",
    image: "/boosters/player_caps.png",
  },

  {
    code: "protect-004",
    category: "player_protecting",
    productName: "Golf Cap",
    description:
      "Premium golf cap - mens, ladies, various colours",
    image: "/boosters/player_caps.png",
  },

  {
    code: "protect-005",
    category: "player_protecting",
    productName: "Sunglasses",
    description:
      "6 x Stylish Square Frame Fashion Glasses",
    image: "/boosters/player_protect005.png",
  },

  {
    code: "protect-006",
    category: "player_protecting",
    productName: "Umbrella",
    description:
      "Automatic Open Golf Umbrella - Extra Large Double Canopy, All-Weather Protection",
    image: "/boosters/player_protect006.png",
  },

  {
    code: "protect-007",
    category: "player_protecting",
    productName: "Sunscreen",
    description:
      "Sun Lab - water resistant, non-greasy, non-sticky sport sunblock, SPF 50",
    image: "/boosters/player_protect007.png",
  },

  {
    code: "protect-008",
    category: "player_protecting",
    productName: "Golf Cap",
    description:
      "Premium golf cap - mens, ladies, various colours",
    image: "/boosters/player_caps.png",
  },

  {
    code: "protect-009",
    category: "player_protecting",
    productName: "Golf Cap",
    description:
      "Premium golf cap - mens, ladies, various colours",
    image: "/boosters/player_caps.png",
  },

  {
    code: "protect-010",
    category: "player_protecting",
    productName: "Sunglasses",
    description:
      "6 x Stylish Square Frame Fashion Glasses",
    image: "/boosters/player_image008.png",
  },


  // =========================================================
  // PLAYER RELOAD
  // =========================================================

  ...Array.from(
    { length: 10 },
    (_, index) => ({
      code: `reload-${String(index + 1).padStart(3, "0")}`,
    category: "player_reload" as const,
      productName: "Premium Refurbished Golf Balls",
      description:
        "24 x premium refurbished golf balls",
      image: "/boosters/player_balls.png",
    })
  ),


  // =========================================================
  // PLAYER TECHNICAL
  // =========================================================

  {
    code: "tech-001",
    category: "player_tech",
    productName: "Swing Trainer",
    description:
      "Golf Swing Trainer, Golf Training Aid",
    image: "/boosters/player_tech001.png",
  },

  {
    code: "tech-002",
    category: "player_tech",
    productName: "Putting Mirror",
    description:
      "Training Aid Lens Golf Putter Practice Posture Correction Equipment",
    image: "/boosters/player_tech002.png",
  },

  {
    code: "tech-003",
    category: "player_tech",
    productName: "Practice Green",
    description:
      "Mat Set with Return Track Indoor & Outdoor",
    image: "/boosters/player_tech003.png",
  },

  {
    code: "tech-004",
    category: "player_tech",
    productName: "Professional Lesson",
    description:
      "Professional lesson",
    image: "/boosters/player_tech004.png",
  },

  {
    code: "tech-005",
    category: "player_tech",
    productName: "Swing Trainer",
    description:
      "Golf swing trainer",
    image: "/boosters/player_tech005.png",
  },

  {
    code: "tech-006",
    category: "player_tech",
    productName: "Plane Sticks",
    description:
      "Golf Swing Trainer, Golf Training Aid",
    image: "/boosters/player_tech006.png",
  },

  {
    code: "tech-007",
    category: "player_tech",
    productName: "Putting Mirror",
    description:
      "Training Aid Lens Golf Putter Practice Posture Correction Equipment",
    image: "/boosters/player_tech007.png",
  },

  {
    code: "tech-008",
    category: "player_tech",
    productName: "Practice Green",
    description:
      "Mat Set with Return Track Indoor & Outdoor",
    image: "/boosters/player_tech008.png",
  },

  {
    code: "tech-009",
    category: "player_tech",
    productName: "Professional Lesson",
    description:
      "Professional lesson",
    image: "/boosters/player_tech009.png",
  },

  {
    code: "tech-010",
    category: "player_tech",
    productName: "Swing Trainer",
    description:
      "Golf swing trainer",
    image: "/boosters/player_tech005.png",
  },


  // =========================================================
  // PLAYER ACCESSORIES
  // =========================================================

  {
    code: "access_001",
    category: "player_accessory",
    productName: "Range Finder",
    description:
      "Golf Rangefinder with Slope Compensation",
    image: "/boosters/player_access001.png",
  },

  {
    code: "access_002",
    category: "player_accessory",
    productName: "Golf Accessories Combo",
    description:
      "Accessories for your golfing needs",
    image: "/boosters/player_access002.png",
  },

  {
    code: "access_003",
    category: "player_accessory",
    productName: "Putter",
    description:
      "Mallet Golf Putter",
    image: "/boosters/player_access003.png",
  },

  {
    code: "access_004",
    category: "player_accessory",
    productName: "Golf Ball Retriever",
    description:
      "Retractable 5-Section Golf Ball Retriever",
    image: "/boosters/player_access004.png",
  },

  {
    code: "access_005",
    category: "player_accessory",
    productName: "Portable Speaker",
    description:
      "Wireless Speakers, Portable",
    image: "/boosters/player_access005.png",
  },

  {
    code: "access_006",
    category: "player_accessory",
    productName: "Golf Grips",
    description:
      "8pcs/set Golf Grips",
    image: "/boosters/player_access006.png",
  },

  {
    code: "access_007",
    category: "player_accessory",
    productName: "Putter Grip",
    description:
      "Putter Grip, Non-Slip Ultra-Light Handle",
    image: "/boosters/player_access007.png",
  },

  {
    code: "access_008",
    category: "player_accessory",
    productName: "Golf Gloves",
    description:
      "2 x Gloves Anti-Slip",
    image: "/boosters/player_access008.png",
  },

  {
    code: "access_009",
    category: "player_accessory",
    productName: "Oversize Putter Grip",
    description:
      "Golf Grip Golf Putter Grip TOUR 5.0",
    image: "/boosters/player_access009.png",
  },

  {
    code: "access_010",
    category: "player_accessory",
    productName: "Golf Gloves",
    description:
      "2 x Gloves Anti-Slip",
    image: "/boosters/player_access0010.png",
  },


  // =========================================================
  // PLAYER IMAGE
  // =========================================================

  {
    code: "image-001",
    category: "player_image",
    productName: "Golf Shirt",
    description:
      "Premium golf shirt - mens, ladies, various colours",
    image: "/boosters/player_shirts.png",
  },

  {
    code: "image-002",
    category: "player_image",
    productName: "Golf Shirt",
    description:
      "Premium golf shirt - mens, ladies, various colours",
    image: "/boosters/player_shirts.png",
  },

  {
    code: "image-003",
    category: "player_image",
    productName: "Golf Belts",
    description:
      "3 x golf belts",
    image: "/boosters/player_image003.png",
  },

  {
    code: "image-004",
    category: "player_image",
    productName: "Golf Shoes",
    description:
      "Premium golf shoes - mens, ladies, various colours",
    image: "/boosters/player_shoes.png",
  },

  {
    code: "image-005",
    category: "player_image",
    productName: "Golf Shoes",
    description:
      "Premium golf shoes - mens, ladies, various colours",
    image: "/boosters/player_shoes.png",
  },

  {
    code: "image-006",
    category: "player_image",
    productName: "Golf Shirt",
    description:
      "Premium golf shirt - mens, ladies, various colours",
    image: "/boosters/player_shirts.png",
  },

  {
    code: "image-007",
    category: "player_image",
    productName: "Golf Cap",
    description:
      "Premium golf cap - mens, ladies, various colours",
    image: "/boosters/player_caps.png",
  },

  {
    code: "image-008",
    category: "player_image",
    productName: "Sunglasses",
    description:
      "6 x Stylish Square Frame Fashion Glasses",
    image: "/boosters/player_image008.png",
  },

  {
    code: "image-009",
    category: "player_image",
    productName: "Golf Outfit Combo",
    description:
      "Premium golf combo - mens, ladies, various colours",
    image: "/boosters/player_image009.png",
  },

  {
    code: "image-010",
    category: "player_image",
    productName: "Golf Outfit Combo",
    description:
      "Premium golf combo - mens, ladies, various colours",
    image: "/boosters/player_image0010.png",
  },
];


export function getImprovePlayerBoosters(
  category: ImprovePlayerBoosterProduct["category"]
) {
  return IMPROVE_PLAYER_BOOSTERS.filter(
    (product) =>
      product.category === category
  );
}

export function getImprovePlayerBoosterByCode(
  code: string
) {
  return IMPROVE_PLAYER_BOOSTERS.find(
    (product) =>
      product.code === String(code || "").trim()
  );
}