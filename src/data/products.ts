import { categories } from "./categories";

export const products = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    price: 99.99,
    originalPrice: 129.99,
    description: "High-quality wireless earbuds with noise cancellation technology.",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000&auto=format&fit=crop",
    category: categories[5].name, // Electronics
    vendor: "TechGear",
    rating: 4.7,
    reviews: 124
  },
  {
    id: "2",
    name: "Handcrafted Ceramic Mug",
    price: 24.99,
    description: "Elegant design, perfect for your morning coffee.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
    category: categories[0].name, // Home & Living
    vendor: "ArtisanCrafts",
    rating: 4.8,
    reviews: 89
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 34.50,
    description: "Comfortable, eco-friendly, and stylish.",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    category: categories[1].name, // Fashion
    vendor: "EcoFashion",
    rating: 4.3,
    reviews: 156
  },
  {
    id: "4",
    name: "Smart LED Desk Lamp",
    price: 59.99,
    description: "Adjustable brightness with wireless charging base.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
    category: categories[5].name, // Electronics
    vendor: "SmartHome",
    rating: 4.6,
    reviews: 78
  },
  {
    id: "5",
    name: "Professional Camera Tripod",
    price: 79.99,
    description: "Sturdy and versatile tripod for photographers.",
    image: "https://images.unsplash.com/photo-1617953141905-b27fb1f17d71?q=80&w=1000&auto=format&fit=crop",
    category: categories[5].name, // Electronics
    vendor: "PhotoPro",
    rating: 4.5,
    reviews: 92
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    price: 129.99,
    description: "Handcrafted genuine leather bag for professionals.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    category: categories[1].name, // Fashion
    vendor: "LeatherCraft",
    rating: 4.9,
    reviews: 67
  },
  {
    id: "7",
    name: "Smart Home Security Camera",
    price: 149.99,
    description: "HD security camera with night vision and motion detection.",
    image: "https://images.unsplash.com/photo-1557324232-b8917d8c3908?q=80&w=1000&auto=format&fit=crop",
    category: categories[5].name, // Electronics
    vendor: "SmartTech",
    rating: 4.6,
    reviews: 85
  },
  {
    id: "8",
    name: "Ergonomic Office Chair",
    price: 299.99,
    description: "Adjustable office chair with lumbar support.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
    category: categories[0].name, // Home & Living
    vendor: "ComfortPlus",
    rating: 4.8,
    reviews: 132
  },
  {
    id: "9",
    name: "Fitness Smartwatch",
    price: 179.99,
    description: "Water-resistant smartwatch with health tracking features.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
    category: categories[5].name, // Electronics
    vendor: "FitTech",
    rating: 4.7,
    reviews: 94
  }
];
