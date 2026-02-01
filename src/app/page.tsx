"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Gavel,
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Settings,
  Bell,
  Search,
  Plus,
  Eye,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  ChevronRight,
  Star,
  MapPin,
  Truck,
  Shield,
  Heart,
  Share2,
  ArrowUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  Hash,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Ban,
  Check,
  X,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  auctions,
  users,
  bids,
  transactions,
  dashboardStats,
  categories,
  formatCurrency,
  type Auction,
  type Bid,
} from "@/lib/data";

type TabType = "dashboard" | "auctions" | "users" | "transactions" | "settings";
type ViewType = "list" | "detail";

export default function AuctionPlatform() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [viewMode, setViewMode] = useState<ViewType>("list");
  const [bidAmount, setBidAmount] = useState("");
  const [showBidSuccess, setShowBidSuccess] = useState(false);
  const [currentBids, setCurrentBids] = useState<Bid[]>(bids);
  const [auctionData, setAuctionData] = useState(auctions);

  const handleViewAuction = (auction: Auction) => {
    setSelectedAuction(auction);
    setViewMode("detail");
    setBidAmount(String(auction.currentBid + auction.minIncrement));
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedAuction(null);
  };

  const handlePlaceBid = () => {
    if (!selectedAuction || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    if (amount <= selectedAuction.currentBid) return;

    // Simulate placing a bid
    const newBid: Bid = {
      id: `b${Date.now()}`,
      auctionId: selectedAuction.id,
      userId: "u3",
      userName: "Voce",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      amount,
      timestamp: new Date().toISOString(),
      isWinning: true,
    };

    // Update bids
    const updatedBids = currentBids.map(b =>
      b.auctionId === selectedAuction.id ? { ...b, isWinning: false } : b
    );
    setCurrentBids([newBid, ...updatedBids]);

    // Update auction
    const updatedAuctions = auctionData.map(a =>
      a.id === selectedAuction.id
        ? { ...a, currentBid: amount, totalBids: a.totalBids + 1 }
        : a
    );
    setAuctionData(updatedAuctions);
    setSelectedAuction({ ...selectedAuction, currentBid: amount, totalBids: selectedAuction.totalBids + 1 });

    setShowBidSuccess(true);
    setTimeout(() => setShowBidSuccess(false), 3000);
    setBidAmount(String(amount + selectedAuction.minIncrement));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-30">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LeiloesBR</h1>
              <p className="text-xs text-gray-500">Painel Admin</p>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "auctions", label: "Leiloes", icon: Gavel },
            { id: "users", label: "Usuarios", icon: Users },
            { id: "transactions", label: "Transacoes", icon: CreditCard },
            { id: "settings", label: "Configuracoes", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as TabType);
                setViewMode("list");
                setSelectedAuction(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-80">Leiloes Ativos</p>
            <p className="text-2xl font-bold">{dashboardStats.activeAuctions}</p>
            <div className="flex items-center gap-1 text-xs mt-1 opacity-80">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12% esta semana</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar leiloes, usuarios..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Admin"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Admin</p>
                  <p className="text-xs text-gray-500">Gerente</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === "dashboard" && <DashboardView onViewAuction={handleViewAuction} auctions={auctionData} />}

          {activeTab === "auctions" && viewMode === "list" && (
            <AuctionsListView
              auctions={auctionData}
              onViewAuction={handleViewAuction}
            />
          )}

          {activeTab === "auctions" && viewMode === "detail" && selectedAuction && (
            <AuctionDetailView
              auction={selectedAuction}
              bids={currentBids.filter(b => b.auctionId === selectedAuction.id)}
              onBack={handleBackToList}
              bidAmount={bidAmount}
              setBidAmount={setBidAmount}
              onPlaceBid={handlePlaceBid}
              showBidSuccess={showBidSuccess}
            />
          )}

          {activeTab === "users" && <UsersView />}
          {activeTab === "transactions" && <TransactionsView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// Dashboard View
function DashboardView({
  onViewAuction,
  auctions
}: {
  onViewAuction: (auction: Auction) => void;
  auctions: Auction[];
}) {
  const featuredAuctions = auctions.filter(a => a.featured).slice(0, 4);
  const endingSoon = auctions.filter(a => a.status === "ending_soon");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Visao geral da plataforma</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Leiloes Ativos"
          value={dashboardStats.activeAuctions}
          subtitle={`${dashboardStats.totalAuctions} total`}
          icon={Gavel}
          color="indigo"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Usuarios"
          value={dashboardStats.totalUsers.toLocaleString()}
          subtitle={`+${dashboardStats.newUsersToday} hoje`}
          icon={Users}
          color="green"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Total de Lances"
          value={dashboardStats.totalBids.toLocaleString()}
          subtitle="Este mes"
          icon={Activity}
          color="purple"
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Receita"
          value={formatCurrency(dashboardStats.revenue)}
          subtitle={`${dashboardStats.pendingPayments} pagamentos pendentes`}
          icon={DollarSign}
          color="orange"
          trend={{ value: 15, positive: true }}
        />
      </div>

      {/* Ending Soon Alert */}
      {endingSoon.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Timer className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-900">Leiloes Encerrando em Breve</h3>
              <p className="text-sm text-orange-700">{endingSoon.length} leiloes terminam nas proximas horas</p>
            </div>
          </div>
        </div>
      )}

      {/* Featured Auctions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Leiloes em Destaque</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onClick={() => onViewAuction(auction)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bids */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Lances Recentes</h3>
          <div className="space-y-4">
            {bids.slice(0, 5).map((bid) => {
              const auction = auctions.find(a => a.id === bid.auctionId);
              return (
                <div key={bid.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <Image
                      src={bid.userAvatar}
                      alt={bid.userName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{bid.userName}</p>
                      <p className="text-xs text-gray-500">{auction?.title.substring(0, 30)}...</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(bid.amount)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(bid.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
          <div className="space-y-3">
            {categories.slice(0, 6).map((category) => (
              <div key={category.id} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{category.name}</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Auctions List View
function AuctionsListView({
  auctions,
  onViewAuction,
}: {
  auctions: Auction[];
  onViewAuction: (auction: Auction) => void;
}) {
  const [filter, setFilter] = useState<"all" | "active" | "ending_soon" | "ended">("all");

  const filteredAuctions = auctions.filter(a => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Leiloes</h1>
          <p className="text-gray-500">{auctions.length} leiloes cadastrados</p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Leilao
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {[
          { id: "all", label: "Todos" },
          { id: "active", label: "Ativos" },
          { id: "ending_soon", label: "Encerrando" },
          { id: "ended", label: "Encerrados" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.id
                ? "bg-indigo-100 text-indigo-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Auctions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Leilao</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Vendedor</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Lance Atual</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Lances</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Tempo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAuctions.map((auction) => (
                <tr key={auction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={auction.images[0]}
                        alt={auction.title}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{auction.title.substring(0, 35)}...</p>
                        <p className="text-xs text-gray-500">{auction.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{auction.sellerName}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(auction.currentBid)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                      {auction.totalBids} lances
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={auction.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{auction.timeLeft}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewAuction(auction)}
                        className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Auction Detail View
function AuctionDetailView({
  auction,
  bids,
  onBack,
  bidAmount,
  setBidAmount,
  onPlaceBid,
  showBidSuccess,
}: {
  auction: Auction;
  bids: Bid[];
  onBack: () => void;
  bidAmount: string;
  setBidAmount: (value: string) => void;
  onPlaceBid: () => void;
  showBidSuccess: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState(auction.timeLeft);

  // Simulate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      // Just for visual effect
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Voltar para lista
      </button>

      {/* Success Message */}
      {showBidSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Lance registrado com sucesso!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative aspect-video">
              <Image
                src={auction.images[0]}
                alt={auction.title}
                fill
                className="object-cover"
              />
              {auction.status === "ending_soon" && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Encerrando em breve!
                </div>
              )}
              {auction.featured && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-medium">
                  Destaque
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                  {auction.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{auction.title}</h1>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{auction.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Condicao</p>
                <p className="font-medium text-gray-900 capitalize">{auction.condition.replace("_", " ")}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Localizacao</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {auction.location}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Envio</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {auction.shipping ? "Disponivel" : "Retirada"}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Observadores</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {auction.watchers}
                </p>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Vendedor</h3>
            <div className="flex items-center gap-4">
              <Image
                src={users.find(u => u.id === auction.sellerId)?.avatar || ""}
                alt={auction.sellerName}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{auction.sellerName}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>4.9</span>
                  </div>
                  <span>•</span>
                  <span>156 vendas</span>
                  <span>•</span>
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Verificado</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                Ver Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Bidding */}
        <div className="space-y-6">
          {/* Bid Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            {/* Timer */}
            <div className={`p-4 rounded-xl mb-4 ${
              auction.status === "ending_soon" ? "bg-orange-50" : "bg-gray-50"
            }`}>
              <p className="text-sm text-gray-500 mb-1">Tempo Restante</p>
              <p className={`text-2xl font-bold ${
                auction.status === "ending_soon" ? "text-orange-600" : "text-gray-900"
              }`}>
                {timeLeft}
              </p>
            </div>

            {/* Current Bid */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Lance Atual</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(auction.currentBid)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {auction.totalBids} lances • Lance inicial: {formatCurrency(auction.startingPrice)}
              </p>
            </div>

            {/* Bid Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Lance (min. {formatCurrency(auction.currentBid + auction.minIncrement)})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  />
                </div>
              </div>

              <button
                onClick={onPlaceBid}
                disabled={parseFloat(bidAmount) <= auction.currentBid}
                className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Gavel className="w-5 h-5" />
                Fazer Lance
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ao dar um lance, voce concorda com nossos termos de uso
              </p>
            </div>
          </div>

          {/* Bid History */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Historico de Lances</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {bids.length > 0 ? (
                bids.map((bid, index) => (
                  <div
                    key={bid.id}
                    className={`flex items-center justify-between p-3 rounded-xl bid-entry ${
                      index === 0 ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={bid.userAvatar}
                        alt={bid.userName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {bid.userName}
                          {index === 0 && (
                            <span className="ml-2 text-xs text-green-600">Vencendo</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(bid.timestamp).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">{formatCurrency(bid.amount)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">Nenhum lance ainda. Seja o primeiro!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Users View
function UsersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuarios</h1>
          <p className="text-gray-500">{users.length} usuarios cadastrados</p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Usuario
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Usuario</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Tipo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Avaliacao</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Transacoes</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Verificado</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.type === "both" ? "bg-purple-100 text-purple-600" :
                      user.type === "seller" ? "bg-blue-100 text-blue-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                      {user.type === "both" ? "Ambos" : user.type === "seller" ? "Vendedor" : "Comprador"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-gray-900">{user.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.totalTransactions}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === "active" ? "bg-green-100 text-green-600" :
                      user.status === "suspended" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-600"
                    }`}>
                      {user.status === "active" ? "Ativo" : user.status === "suspended" ? "Suspenso" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.verified ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Transactions View
function TransactionsView() {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    paid: "bg-blue-100 text-blue-600",
    shipped: "bg-purple-100 text-purple-600",
    delivered: "bg-green-100 text-green-600",
    disputed: "bg-red-100 text-red-600",
  };

  const statusLabels = {
    pending: "Pendente",
    paid: "Pago",
    shipped: "Enviado",
    delivered: "Entregue",
    disputed: "Disputa",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transacoes</h1>
          <p className="text-gray-500">{transactions.length} transacoes registradas</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">{transactions.filter(t => t.status === "pending").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Pagos</p>
          <p className="text-2xl font-bold text-blue-600">{transactions.filter(t => t.status === "paid").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Enviados</p>
          <p className="text-2xl font-bold text-purple-600">{transactions.filter(t => t.status === "shipped").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Entregues</p>
          <p className="text-2xl font-bold text-green-600">{transactions.filter(t => t.status === "delivered").length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Leilao</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Comprador</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Vendedor</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Valor</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Data</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">#{transaction.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 text-sm">{transaction.auctionTitle.substring(0, 30)}...</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{transaction.buyerName}</td>
                  <td className="px-6 py-4 text-gray-700">{transaction.sellerName}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                      {statusLabels[transaction.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings View
function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuracoes</h1>
        <p className="text-gray-500">Gerencie as configuracoes da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Configuracoes Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Plataforma</label>
              <input
                type="text"
                defaultValue="LeiloesBR"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contato</label>
              <input
                type="email"
                defaultValue="contato@leiloesbr.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Moeda Padrao</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>BRL - Real Brasileiro</option>
                <option>USD - Dolar Americano</option>
                <option>EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Configuracoes de Leilao</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taxa da Plataforma (%)</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duracao Minima (dias)</label>
              <input
                type="number"
                defaultValue="3"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Extensao Automatica (min)</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">Tempo adicionado quando um lance e feito no ultimo minuto</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Integracao de Pagamentos</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mercado Pago</p>
                  <p className="text-xs text-gray-500">Conectado</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">PagSeguro</p>
                  <p className="text-xs text-gray-500">Nao configurado</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 font-medium">Configurar</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Notificacoes</h3>
          <div className="space-y-4">
            {[
              { label: "Novos lances", enabled: true },
              { label: "Leiloes encerrando", enabled: true },
              { label: "Novos usuarios", enabled: false },
              { label: "Pagamentos pendentes", enabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-gray-700">{item.label}</span>
                <button
                  className={`w-12 h-6 rounded-full transition-colors ${
                    item.enabled ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      item.enabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Salvar Alteracoes
        </button>
      </div>
    </div>
  );
}

// Reusable Components
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  color: "indigo" | "green" | "purple" | "orange";
  trend?: { value: number; positive: boolean };
}) {
  const colorStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colorStyles[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.positive ? "text-green-600" : "text-red-600"
          }`}>
            {trend.positive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {trend.value}%
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function AuctionCard({
  auction,
  onClick,
}: {
  auction: Auction;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer auction-card"
    >
      <div className="relative aspect-square">
        <Image
          src={auction.images[0]}
          alt={auction.title}
          fill
          className="object-cover"
        />
        <StatusBadge status={auction.status} className="absolute top-3 left-3" />
        {auction.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium">
            Destaque
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{auction.category}</p>
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{auction.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Lance Atual</p>
            <p className="font-bold text-gray-900">{formatCurrency(auction.currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Tempo</p>
            <p className={`text-sm font-medium ${
              auction.status === "ending_soon" ? "text-orange-600" : "text-gray-600"
            }`}>
              {auction.timeLeft}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  const styles = {
    active: "bg-green-500 text-white",
    ending_soon: "bg-orange-500 text-white",
    ended: "bg-gray-500 text-white",
    scheduled: "bg-blue-500 text-white",
  };

  const labels = {
    active: "Ativo",
    ending_soon: "Encerrando",
    ended: "Encerrado",
    scheduled: "Agendado",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]} ${className}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}
