export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: "buyer" | "seller" | "both";
  rating: number;
  totalTransactions: number;
  memberSince: string;
  verified: boolean;
  status: "active" | "suspended" | "pending";
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  startingPrice: number;
  currentBid: number;
  minIncrement: number;
  totalBids: number;
  watchers: number;
  status: "active" | "ending_soon" | "ended" | "scheduled";
  startTime: string;
  endTime: string;
  timeLeft: string;
  condition: "new" | "like_new" | "good" | "fair";
  location: string;
  shipping: boolean;
  featured: boolean;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  amount: number;
  timestamp: string;
  isWinning: boolean;
}

export interface Transaction {
  id: string;
  auctionId: string;
  auctionTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "disputed";
  date: string;
}

export interface DashboardStats {
  totalAuctions: number;
  activeAuctions: number;
  totalUsers: number;
  totalBids: number;
  revenue: number;
  pendingPayments: number;
  completedToday: number;
  newUsersToday: number;
}

// Sample Users
export const users: User[] = [
  {
    id: "u1",
    name: "Carlos Mendoza",
    email: "carlos@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    type: "both",
    rating: 4.9,
    totalTransactions: 156,
    memberSince: "2023-03-15",
    verified: true,
    status: "active",
  },
  {
    id: "u2",
    name: "Ana Silva",
    email: "ana@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    type: "seller",
    rating: 4.8,
    totalTransactions: 89,
    memberSince: "2023-06-20",
    verified: true,
    status: "active",
  },
  {
    id: "u3",
    name: "Roberto Lima",
    email: "roberto@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    type: "buyer",
    rating: 4.7,
    totalTransactions: 42,
    memberSince: "2023-09-10",
    verified: true,
    status: "active",
  },
  {
    id: "u4",
    name: "Maria Santos",
    email: "maria@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    type: "both",
    rating: 4.6,
    totalTransactions: 67,
    memberSince: "2023-07-05",
    verified: false,
    status: "active",
  },
  {
    id: "u5",
    name: "Pedro Costa",
    email: "pedro@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    type: "seller",
    rating: 4.5,
    totalTransactions: 34,
    memberSince: "2024-01-12",
    verified: true,
    status: "active",
  },
  {
    id: "u6",
    name: "Julia Ferreira",
    email: "julia@email.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    type: "buyer",
    rating: 4.9,
    totalTransactions: 28,
    memberSince: "2024-02-20",
    verified: true,
    status: "active",
  },
];

// Sample Auctions
export const auctions: Auction[] = [
  {
    id: "a1",
    title: "Relogio Rolex Submariner Vintage 1985",
    description: "Relogio Rolex Submariner original de 1985 em excelente estado de conservacao. Acompanha caixa original e documentacao completa. Peca rara para colecionadores.",
    category: "Relogios",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    ],
    sellerId: "u2",
    sellerName: "Ana Silva",
    startingPrice: 15000,
    currentBid: 28500,
    minIncrement: 500,
    totalBids: 23,
    watchers: 45,
    status: "active",
    startTime: "2025-01-28T10:00:00",
    endTime: "2025-02-03T22:00:00",
    timeLeft: "2d 14h 32m",
    condition: "good",
    location: "Sao Paulo, SP",
    shipping: true,
    featured: true,
  },
  {
    id: "a2",
    title: "Quadro Original - Tarsila do Amaral (Reproducao Autorizada)",
    description: "Reproducao autorizada em tela de alta qualidade da obra 'Abaporu'. Certificado de autenticidade incluso. Moldura em madeira nobre.",
    category: "Arte",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    ],
    sellerId: "u1",
    sellerName: "Carlos Mendoza",
    startingPrice: 5000,
    currentBid: 12800,
    minIncrement: 200,
    totalBids: 34,
    watchers: 78,
    status: "ending_soon",
    startTime: "2025-01-25T14:00:00",
    endTime: "2025-01-31T20:00:00",
    timeLeft: "4h 15m",
    condition: "new",
    location: "Rio de Janeiro, RJ",
    shipping: true,
    featured: true,
  },
  {
    id: "a3",
    title: "Moeda Antiga - Pataca Brasil Colonia 1695",
    description: "Moeda historica do periodo colonial brasileiro. Peca rara em otimo estado de conservacao. Ideal para colecao numismatica.",
    category: "Numismatica",
    images: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
    ],
    sellerId: "u5",
    sellerName: "Pedro Costa",
    startingPrice: 8000,
    currentBid: 8000,
    minIncrement: 300,
    totalBids: 0,
    watchers: 23,
    status: "active",
    startTime: "2025-01-30T09:00:00",
    endTime: "2025-02-06T18:00:00",
    timeLeft: "5d 8h 45m",
    condition: "good",
    location: "Belo Horizonte, MG",
    shipping: true,
    featured: false,
  },
  {
    id: "a4",
    title: "Guitarra Gibson Les Paul Standard 1959 Reissue",
    description: "Gibson Les Paul Standard 1959 Reissue em perfeito estado. Som incrivel, acabamento impecavel. Acompanha case original Gibson.",
    category: "Instrumentos",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop",
    ],
    sellerId: "u1",
    sellerName: "Carlos Mendoza",
    startingPrice: 25000,
    currentBid: 42000,
    minIncrement: 1000,
    totalBids: 15,
    watchers: 56,
    status: "active",
    startTime: "2025-01-27T12:00:00",
    endTime: "2025-02-04T21:00:00",
    timeLeft: "3d 11h 20m",
    condition: "like_new",
    location: "Curitiba, PR",
    shipping: true,
    featured: true,
  },
  {
    id: "a5",
    title: "Camera Leica M6 Classic Black",
    description: "Camera Leica M6 classica em preto. Funcionamento perfeito, sensor de luz calibrado. Acompanha lente Summicron 50mm f/2.",
    category: "Fotografia",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    ],
    sellerId: "u2",
    sellerName: "Ana Silva",
    startingPrice: 18000,
    currentBid: 24500,
    minIncrement: 500,
    totalBids: 12,
    watchers: 34,
    status: "active",
    startTime: "2025-01-29T08:00:00",
    endTime: "2025-02-05T19:00:00",
    timeLeft: "4d 9h 15m",
    condition: "good",
    location: "Porto Alegre, RS",
    shipping: true,
    featured: false,
  },
  {
    id: "a6",
    title: "Colecao Completa Selos Brasil Imperio",
    description: "Colecao completa de selos do Brasil Imperio (1843-1889). Inclui o famoso Olho-de-Boi. Album e certificados inclusos.",
    category: "Filatelia",
    images: [
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
    ],
    sellerId: "u5",
    sellerName: "Pedro Costa",
    startingPrice: 35000,
    currentBid: 52000,
    minIncrement: 2000,
    totalBids: 8,
    watchers: 67,
    status: "active",
    startTime: "2025-01-26T10:00:00",
    endTime: "2025-02-02T22:00:00",
    timeLeft: "1d 12h 45m",
    condition: "good",
    location: "Salvador, BA",
    shipping: true,
    featured: true,
  },
  {
    id: "a7",
    title: "Vaso Porcelana Chinesa Dinastia Qing",
    description: "Vaso autentico da Dinastia Qing (seculo XVIII). Peca de museu com certificado de autenticidade. Altura: 45cm.",
    category: "Antiguidades",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
    ],
    sellerId: "u4",
    sellerName: "Maria Santos",
    startingPrice: 45000,
    currentBid: 78000,
    minIncrement: 3000,
    totalBids: 11,
    watchers: 89,
    status: "ending_soon",
    startTime: "2025-01-24T14:00:00",
    endTime: "2025-01-31T18:00:00",
    timeLeft: "2h 30m",
    condition: "good",
    location: "Brasilia, DF",
    shipping: false,
    featured: true,
  },
  {
    id: "a8",
    title: "Livro Primeira Edicao - Dom Casmurro 1899",
    description: "Primeira edicao de Dom Casmurro de Machado de Assis, 1899. Exemplar raro em bom estado de conservacao. Encadernacao original.",
    category: "Livros Raros",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop",
    ],
    sellerId: "u1",
    sellerName: "Carlos Mendoza",
    startingPrice: 120000,
    currentBid: 185000,
    minIncrement: 5000,
    totalBids: 14,
    watchers: 112,
    status: "active",
    startTime: "2025-01-28T16:00:00",
    endTime: "2025-02-07T20:00:00",
    timeLeft: "6d 10h 25m",
    condition: "good",
    location: "Sao Paulo, SP",
    shipping: true,
    featured: true,
  },
];

// Sample Bids
export const bids: Bid[] = [
  {
    id: "b1",
    auctionId: "a1",
    userId: "u3",
    userName: "Roberto Lima",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    amount: 28500,
    timestamp: "2025-01-31T15:32:00",
    isWinning: true,
  },
  {
    id: "b2",
    auctionId: "a1",
    userId: "u6",
    userName: "Julia Ferreira",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    amount: 28000,
    timestamp: "2025-01-31T15:28:00",
    isWinning: false,
  },
  {
    id: "b3",
    auctionId: "a1",
    userId: "u3",
    userName: "Roberto Lima",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    amount: 27500,
    timestamp: "2025-01-31T15:15:00",
    isWinning: false,
  },
  {
    id: "b4",
    auctionId: "a1",
    userId: "u4",
    userName: "Maria Santos",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    amount: 27000,
    timestamp: "2025-01-31T14:45:00",
    isWinning: false,
  },
  {
    id: "b5",
    auctionId: "a2",
    userId: "u6",
    userName: "Julia Ferreira",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    amount: 12800,
    timestamp: "2025-01-31T15:45:00",
    isWinning: true,
  },
  {
    id: "b6",
    auctionId: "a2",
    userId: "u3",
    userName: "Roberto Lima",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    amount: 12600,
    timestamp: "2025-01-31T15:40:00",
    isWinning: false,
  },
];

// Sample Transactions
export const transactions: Transaction[] = [
  {
    id: "t1",
    auctionId: "a10",
    auctionTitle: "Violino Stradivarius Replica Premium",
    buyerId: "u3",
    buyerName: "Roberto Lima",
    sellerId: "u1",
    sellerName: "Carlos Mendoza",
    amount: 45000,
    status: "delivered",
    date: "2025-01-25",
  },
  {
    id: "t2",
    auctionId: "a11",
    auctionTitle: "Caneta Montblanc Meisterstuck Vintage",
    buyerId: "u6",
    buyerName: "Julia Ferreira",
    sellerId: "u2",
    sellerName: "Ana Silva",
    amount: 8500,
    status: "shipped",
    date: "2025-01-28",
  },
  {
    id: "t3",
    auctionId: "a12",
    auctionTitle: "Estatua Bronze Art Deco 1925",
    buyerId: "u4",
    buyerName: "Maria Santos",
    sellerId: "u5",
    sellerName: "Pedro Costa",
    amount: 32000,
    status: "paid",
    date: "2025-01-30",
  },
  {
    id: "t4",
    auctionId: "a13",
    auctionTitle: "Maquina de Escrever Olivetti Lettera 32",
    buyerId: "u3",
    buyerName: "Roberto Lima",
    sellerId: "u4",
    sellerName: "Maria Santos",
    amount: 4200,
    status: "pending",
    date: "2025-01-31",
  },
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalAuctions: 156,
  activeAuctions: 42,
  totalUsers: 1247,
  totalBids: 3842,
  revenue: 847500,
  pendingPayments: 12,
  completedToday: 8,
  newUsersToday: 23,
};

// Categories
export const categories = [
  { id: "relogios", name: "Relogios", icon: "Watch", count: 23 },
  { id: "arte", name: "Arte", icon: "Palette", count: 45 },
  { id: "numismatica", name: "Numismatica", icon: "Coins", count: 34 },
  { id: "instrumentos", name: "Instrumentos", icon: "Music", count: 18 },
  { id: "fotografia", name: "Fotografia", icon: "Camera", count: 27 },
  { id: "filatelia", name: "Filatelia", icon: "Stamp", count: 15 },
  { id: "antiguidades", name: "Antiguidades", icon: "Landmark", count: 56 },
  { id: "livros", name: "Livros Raros", icon: "BookOpen", count: 38 },
];

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
