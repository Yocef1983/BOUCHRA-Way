import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Star, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Eye, 
  Truck, 
  Leaf, 
  CreditCard, 
  Headphones, 
  Heart, 
  MessageCircle, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  Menu, 
  ArrowRight, 
  Shield, 
  Gift 
} from 'lucide-react';
// ============ TYPES ============
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  ingredients: string;
  benefits: string[];
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface OrderForm {
  name: string;
  phone: string;
  city: string;
  address: string;
}

// ============ DATA ============
const products: Product[] = [
  {
    id: 1,
    name: "Sérum Éclat Vitamine C",
    category: "Huiles & Sérums",
    price: 189,
    oldPrice: 249,
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=700&fit=crop",
    description: "Sérum concentré en vitamine C pure pour un teint lumineux et uniforme. Formule légère qui pénètre rapidement.",
    ingredients: "Acide L-Ascorbique 20%, Acide Hyaluronique, Vitamine E, Extrait de réglisse, Eau de rose damascena.",
    benefits: ["Éclat immédiat", "Anti-taches", "Hydratation intense", "Protection antioxydante"],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Crème Hydratante Rose & Jasmin",
    category: "Soins Visage",
    price: 149,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=700&fit=crop",
    description: "Crème onctueuse enrichie en eau de rose et jasmin pour une peau douce et veloutée toute la journée.",
    ingredients: "Eau de rose de Damas, Extrait de jasmin, Beurre de karité, Acide hyaluronique, Squalane végétal.",
    benefits: ["Hydratation 48h", "Peau veloutée", "Anti-rougeurs", "Parfum naturel"],
    badge: "Nouveau",
  },
  {
    id: 3,
    name: "Huile Précieuse d'Argan Bio",
    category: "Huiles & Sérums",
    price: 129,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=700&fit=crop",
    description: "Huile d'argan 100% pure et biologique, pressée à froid. Nourrit en profondeur peau et cheveux.",
    ingredients: "Argania Spinosa Kernel Oil (100% pur), Vitamine E naturelle.",
    benefits: ["100% naturel", "Anti-âge", "Nourrissant", "Multi-usage"],
    badge: "100% Bio",
  },
  {
    id: 4,
    name: "Masque Purifiant Charbon & Tea Tree",
    category: "Soins Visage",
    price: 99,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=700&fit=crop",
    description: "Masque détoxifiant au charbon actif et tea tree qui purifie les pores en profondeur sans dessécher.",
    ingredients: "Charbon actif de bambou, Huile essentielle de tea tree, Argile verte, Aloe vera, Zinc PCA.",
    benefits: ["Purifie les pores", "Anti-imperfections", "Peau nette", "Éclat retrouvé"],
  },
  {
    id: 5,
    name: "Gel Douche Fleur d'Oranger",
    category: "Corps & Bain",
    price: 79,
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop",
    description: "Gel douche onctueux parfumé à la fleur d'oranger. Transforme votre douche en moment de spa.",
    ingredients: "Extrait de fleur d'oranger, Glycérine végétale, Huile d'amande douce, Provitamine B5.",
    benefits: ["Parfum envoûtant", "Hydrate la peau", "Mousse riche", "Peau satinée"],
  },
  {
    id: 6,
    name: "Coffret Rituel Hammam Royal",
    category: "Coffrets Cadeaux",
    price: 349,
    oldPrice: 429,
    rating: 4.9,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=700&fit=crop",
    description: "Coffret complet rituel hammam : savon noir, gant kessa, ghassoul, huile d'argan et parfum d'ambiance.",
    ingredients: "Savon noir à l'huile d'olive, Ghassoul pur du Maroc, Huile d'argan bio, Eau de rose, Encens naturel.",
    benefits: ["Rituel complet", "Idée cadeau parfaite", "5 produits inclus", "Écrin luxe"],
    badge: "Best Seller",
  },
  {
    id: 7,
    name: "Brume Parfumée Oud & Musc",
    category: "Corps & Bain",
    price: 159,
    rating: 4.8,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=700&fit=crop",
    description: "Brume corporelle aux notes orientales d'oud et musc blanc. Tenue longue durée pour un sillage envoûtant.",
    ingredients: "Extrait d'oud, Musc blanc, Ambre, Bois de santal, Vanille de Madagascar.",
    benefits: ["Tenue 12h", "Sillage unique", "Notes orientales", "Flacon rechargeable"],
    badge: "Nouveau",
  },
  {
    id: 8,
    name: "Gommage Corps Sucre & Miel",
    category: "Corps & Bain",
    price: 89,
    rating: 4.7,
    reviews: 68,
    image: "https://images.unsplash.com/photo-1608248543803-ba4a8c60e068?w=600&h=700&fit=crop",
    description: "Gommage corporel aux cristaux de sucre et miel pur. Exfolie en douceur pour une peau soyeuse.",
    ingredients: "Sucre de canne, Miel pur, Huile de coco, Beurre de cacao, Extrait de vanille.",
    benefits: ["Exfoliation douce", "Peau ultra-douce", "Nourrissant", "Parfum gourmand"],
  },
  {
    id: 9,
    name: "Contour des Yeux Anti-Âge",
    category: "Soins Visage",
    price: 169,
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=600&h=700&fit=crop",
    description: "Soin contour des yeux à l'acide hyaluronique et caféine. Réduit cernes, poches et rides.",
    ingredients: "Acide hyaluronique 3%, Caféine, Peptides, Vitamine K, Extrait de concombre.",
    benefits: ["Anti-cernes", "Anti-poches", "Lisse les rides", "Regard reposé"],
  },
  {
    id: 10,
    name: "Coffret Découverte Essentiels",
    category: "Coffrets Cadeaux",
    price: 249,
    rating: 4.8,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=700&fit=crop",
    description: "Coffret de 4 mini-produits essentiels : sérum, crème, huile et gel douche. Format voyage idéal.",
    ingredients: "Formules concentrées en actifs naturels, sans parabènes, sans sulfates.",
    benefits: ["4 produits mini", "Format voyage", "Idée cadeau", "Découvrir la gamme"],
    badge: "100% Bio",
  },
];

const categories = ["Tous", "Soins Visage", "Corps & Bain", "Huiles & Sérums", "Coffrets Cadeaux"];

// ============ MAIN COMPONENT ============
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({ name: "", phone: "", city: "", address: "" });
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  // Show notification
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === "Tous" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart functions
  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showNotification(`${product.name} ajouté au panier`);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal >= 50 ? 0 : 25;

  // WhatsApp order
  const sendWhatsAppOrder = () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.city || !orderForm.address) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }
    let message = `🛍️ *Nouvelle Commande - BOUCHRA Way*\n\n`;
    message += `👤 *Client :* ${orderForm.name}\n`;
    message += `📞 *Téléphone :* ${orderForm.phone}\n`;
    message += `🏙️ *Ville :* ${orderForm.city}\n`;
    message += `📍 *Adresse :* ${orderForm.address}\n\n`;
    message += `📦 *Articles :*\n`;
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} — ${item.price * item.quantity} MAD\n`;
    });
    message += `\n💰 *Sous-total :* ${cartTotal} MAD\n`;
    message += `🚚 *Livraison :* ${shipping === 0 ? "Gratuite" : shipping + " MAD"}\n`;
    message += `✅ *Total :* ${cartTotal + shipping} MAD\n`;
    message += `\n💳 *Paiement :* À la livraison (Cash on Delivery)\n`;
    message += `\nMerci de confirmer ma commande ! 🙏`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/212656815507?text=${encoded}`, "_blank");
    setIsCheckoutOpen(false);
    setCart([]);
    setOrderForm({ name: "", phone: "", city: "", address: "" });
    showNotification("Commande envoyée via WhatsApp !");
  };

  // Star rating component
  const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">({reviews})</span>
    </div>
  );

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isCartOpen || isCheckoutOpen || selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isCartOpen, isCheckoutOpen, selectedProduct]);

  return (
    <div className="min-h-screen bg-stone-50 font-[Inter] text-gray-800">
      {/* ===== NOTIFICATION TOAST ===== */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-[slideIn_0.3s_ease]">
          <Sparkles size={16} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-[Playfair_Display] font-bold text-gray-900 leading-tight">
                  BOUCHRA Way
                </h1>
                <p className="text-[10px] text-rose-500 font-medium tracking-wider uppercase -mt-0.5">
                  Cosmetics & Wellness
                </p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-stone-100 hover:bg-rose-50 rounded-full transition-colors group"
              >
                <ShoppingBag size={20} className="text-gray-700 group-hover:text-rose-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-[bounce_0.5s_ease]">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 bg-stone-100 rounded-full"
              >
                <Menu size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="hidden md:flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-stone-100 text-gray-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Categories */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-rose-500 text-white"
                    : "bg-stone-100 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-1.5 rounded-full mb-6 border border-rose-100">
                <Sparkles size={14} className="text-rose-500" />
                <span className="text-xs font-medium text-rose-700">Nouvelle Collection 2025</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[Playfair_Display] font-bold text-gray-900 leading-tight mb-6">
                Révélez votre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  éclat naturel
                </span>{" "}
                avec BOUCHRA Way
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Des soins cosmétiques naturels et luxueux, formulés avec les meilleurs ingrédients du Maroc pour sublimer votre beauté au quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:-translate-y-0.5"
                >
                  Découvrir la collection
                  <ArrowRight size={18} />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full border border-stone-200 hover:border-rose-200 hover:bg-rose-50 transition-all">
                  Nos best-sellers
                  <Heart size={18} className="text-rose-400" />
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-4 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-30 blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
                  alt="BOUCHRA Way Cosmetics"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Leaf size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">100% Naturel</p>
                      <p className="text-[10px] text-gray-500">Ingrédients bio</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Star size={18} className="text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">4.9/5</p>
                      <p className="text-[10px] text-gray-500">+2000 avis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REASSURANCE BAR ===== */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Truck, title: "Livraison rapide", desc: "24-48h partout au Maroc" },
              { icon: Leaf, title: "100% Naturel", desc: "Ingrédients bio certifiés" },
              { icon: CreditCard, title: "Paiement à la livraison", desc: "Cash on Delivery" },
              { icon: Headphones, title: "Service client 7j/7", desc: "Support WhatsApp" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl lg:text-4xl font-[Playfair_Display] font-bold text-gray-900 mb-3">
            Notre Collection
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto">
            Des soins d'exception formulés avec amour pour révéler votre beauté naturelle
          </p>
        </div>

        {/* Mobile Category Filter */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
            <p className="text-gray-400 text-sm mt-1">Essayez une autre recherche ou catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-rose-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.badge === "Best Seller" ? "bg-amber-400 text-amber-900" :
                      product.badge === "Nouveau" ? "bg-emerald-400 text-emerald-900" :
                      "bg-rose-400 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => { setSelectedProduct(product); setQuickViewQty(1); }}
                      className="bg-white text-gray-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-rose-50 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Aperçu rapide
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-[11px] text-rose-500 font-medium uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-1">
                    {product.name}
                  </h4>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900">{product.price} MAD</span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">{product.oldPrice} MAD</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-9 h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md shadow-rose-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-[Playfair_Display] font-bold">BOUCHRA Way</h4>
                  <p className="text-[10px] text-rose-300 uppercase tracking-wider">Cosmetics & Wellness</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Des soins cosmétiques naturels et luxueux inspirés des traditions marocaines ancestrales.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors">
                  <Share2 size={16} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors">
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h5 className="font-semibold text-sm uppercase tracking-wider mb-4 text-rose-300">Boutique</h5>
              <ul className="space-y-2.5">
                {["Soins Visage", "Corps & Bain", "Huiles & Sérums", "Coffrets Cadeaux"].map((link) => (
                  <li key={link}>
                    <a href="#products" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                      <ChevronRight size={12} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-sm uppercase tracking-wider mb-4 text-rose-300">Informations</h5>
              <ul className="space-y-2.5">
                {["À propos", "Livraison", "Retours", "CGV"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                      <ChevronRight size={12} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold text-sm uppercase tracking-wider mb-4 text-rose-300">Contact</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone size={14} className="text-rose-400" /> +212 6 56 81 55 07
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail size={14} className="text-rose-400" /> contact@bouchraway.ma
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin size={14} className="text-rose-400" /> Casablanca, Maroc
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 BOUCHRA Way. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Shield size={16} className="text-gray-500" />
              <span className="text-gray-500 text-xs">Paiement sécurisé</span>
              <Gift size={16} className="text-gray-500" />
              <span className="text-gray-500 text-xs">Emballage cadeau offert</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== QUICK VIEW MODAL ===== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="aspect-square md:aspect-auto md:h-full bg-stone-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs text-rose-500 font-medium uppercase tracking-wider mb-1">
                  {selectedProduct.category}
                </p>
                <h3 className="text-2xl font-[Playfair_Display] font-bold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h3>
                <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-bold text-gray-900">{selectedProduct.price} MAD</span>
                  {selectedProduct.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">{selectedProduct.oldPrice} MAD</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">{selectedProduct.description}</p>

                {/* Ingredients */}
                <div className="mt-5">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Ingrédients</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.ingredients}</p>
                </div>

                {/* Benefits */}
                <div className="mt-4">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Bienfaits</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.benefits.map((b, i) => (
                      <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 text-xs rounded-full font-medium">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border border-stone-200 rounded-full">
                    <button
                      onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 rounded-l-full transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-semibold text-sm">{quickViewQty}</span>
                    <button
                      onClick={() => setQuickViewQty(quickViewQty + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 rounded-r-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => { addToCart(selectedProduct, quickViewQty); setSelectedProduct(null); }}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CART DRAWER ===== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setIsCartOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-rose-500" />
                <h3 className="text-lg font-semibold">Mon Panier</h3>
                <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Votre panier est vide</p>
                  <p className="text-gray-400 text-sm mt-1">Ajoutez des produits pour commencer</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-stone-50 rounded-xl p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                      <p className="text-sm font-bold text-rose-600 mt-1">{item.price} MAD</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-full bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 rounded-l-full"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 rounded-r-full"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-stone-100 p-5 space-y-3 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="font-semibold">{cartTotal} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-emerald-600" : ""}`}>
                    {shipping === 0 ? "Gratuite" : `${shipping} MAD`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full text-center">
                    Plus que {50 - cartTotal} MAD pour la livraison gratuite !
                  </p>
                )}
                <div className="flex justify-between text-base font-bold border-t border-stone-100 pt-3">
                  <span>Total</span>
                  <span className="text-rose-600">{cartTotal + shipping} MAD</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Commander
                </button>
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Commander via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== CHECKOUT MODAL ===== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setIsCheckoutOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard size={24} className="text-rose-500" />
                </div>
                <h3 className="text-xl font-[Playfair_Display] font-bold">Finaliser la commande</h3>
                <p className="text-gray-500 text-sm mt-1">Paiement à la livraison (Cash on Delivery)</p>
              </div>

              {/* Order Summary */}
              <div className="bg-stone-50 rounded-xl p-4 mb-6">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Récapitulatif</h5>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1.5">
                    <span className="text-sm text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="text-sm font-semibold">{item.price * item.quantity} MAD</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 mt-2 pt-2 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-rose-600">{cartTotal + shipping} MAD</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nom complet *</label>
                  <input
                    type="text"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="Votre nom et prénom"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Téléphone *</label>
                  <input
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Ville *</label>
                  <input
                    type="text"
                    value={orderForm.city}
                    onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                    placeholder="Casablanca, Rabat, Marrakech..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Adresse de livraison *</label>
                  <textarea
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    placeholder="Adresse complète, quartier, code postal..."
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={sendWhatsAppOrder}
                className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={20} />
                Confirmer & Envoyer via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Votre commande sera confirmée par WhatsApp sous 30 min
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href="https://wa.me/212656815507"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 hover:scale-110 transition-all"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
