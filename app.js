/**
 * PIYORA | LUXURY PERFUME SHOWCASE & ORDER ENGINE
 * Hybrid Supabase Database + Secret PIN Admin Integration
 * 
 * Capabilities:
 * 1. Dynamic Catalog with Supabase Cloud DB + Local Storage Fallback
 * 2. In-Stock / Out-of-Stock Status Support
 * 3. Dynamic WhatsApp Order Number from Settings
 * 4. Authentic Decants (5ml / 10ml) & Inspired 15ml Packs (Single, 3-Pack, 5-Pack)
 * 5. Interactive Custom Discovery Pack Builder
 */

// Initial Seed Catalog (Fallback when database not connected)
const DEFAULT_SEED_PRODUCTS = [
  {
    id: "auth-aventus",
    name: "Creed Aventus (Authentic Decant)",
    brand: "Creed Paris • 100% Genuine",
    category: "authentic",
    gender: "men",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
    badge: "100% Authentic Decant",
    accords: ["Smoky Pineapple", "Birch", "Ambergris"],
    topNotes: "Bergamot, Blackcurrant, Apple, Pineapple",
    heartNotes: "Birch, Patchouli, Moroccan Jasmine, Rose",
    baseNotes: "Musk, Oakmoss, Ambergris, Vanille",
    longevity: "14h+ Pure Extract",
    description: "Decanted directly from a genuine Creed Aventus flacon with verified batch code. Supplied in a leakproof luxury glass spray atomizer.",
    sizes: {
      "5ml Decant": { price: 3850, label: "Rs. 3,850", sprayCount: "~70 Sprays" },
      "10ml Decant": { price: 6900, label: "Rs. 6,900", sprayCount: "~140 Sprays" }
    },
    defaultSize: "10ml Decant",
    in_stock: true,
    display_order: 1
  },
  {
    id: "auth-sauvage",
    name: "Dior Sauvage Elixir (Authentic Decant)",
    brand: "Dior Paris • 100% Genuine",
    category: "authentic",
    gender: "men",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80",
    badge: "100% Authentic Decant",
    accords: ["Warm Spicy", "Lavender", "Licorice Wood"],
    topNotes: "Cinnamon, Nutmeg, Cardamom, Grapefruit",
    heartNotes: "Lavender of Nyons",
    baseNotes: "Licorice, Sandalwood, Amber, Patchouli, Vetiver",
    longevity: "18h+ Extreme Beast",
    description: "The most potent designer fragrance in modern history. Decanted straight from official sealed Dior retail bottles.",
    sizes: {
      "5ml Decant": { price: 3200, label: "Rs. 3,200", sprayCount: "~70 Sprays" },
      "10ml Decant": { price: 5850, label: "Rs. 5,850", sprayCount: "~140 Sprays" }
    },
    defaultSize: "10ml Decant",
    in_stock: true,
    display_order: 2
  },
  {
    id: "auth-bleu",
    name: "Bleu de Chanel Parfum (Authentic Decant)",
    brand: "Chanel Paris • 100% Genuine",
    category: "authentic",
    gender: "men",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
    badge: "100% Authentic Decant",
    accords: ["Woody Aromatic", "Cedar", "Sandalwood"],
    topNotes: "Lemon Zest, Bergamot, Mint, Artemisia",
    heartNotes: "Lavender, Geranium, Green Notes, Pineapple",
    baseNotes: "New Caledonian Sandalwood, Cedar, Amberwood",
    longevity: "12h+ Elegant Trail",
    description: "The gold standard of masculine sophistication. Genuine Chanel Parfum extract decanted into premium pocket travel sprayers.",
    sizes: {
      "5ml Decant": { price: 2950, label: "Rs. 2,950", sprayCount: "~70 Sprays" },
      "10ml Decant": { price: 5400, label: "Rs. 5,400", sprayCount: "~140 Sprays" }
    },
    defaultSize: "10ml Decant",
    in_stock: true,
    display_order: 3
  },
  {
    id: "auth-tf-orchid",
    name: "Tom Ford Black Orchid (Authentic Decant)",
    brand: "Tom Ford • 100% Genuine",
    category: "authentic",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80",
    badge: "100% Authentic Decant",
    accords: ["Dark Florals", "Black Truffle", "Rich Patchouli"],
    topNotes: "Truffle, Gardenia, Blackcurrant, Ylang-Ylang",
    heartNotes: "Orchid, Spicy Notes, Fruity Notes, Lotus",
    baseNotes: "Mexican Chocolate, Patchouli, Vanille, Incense, Amber",
    longevity: "16h+ Iconic Sillage",
    description: "Opulent and sensual dark classic. Batch verified original Tom Ford EDP in glass decant format.",
    sizes: {
      "5ml Decant": { price: 3400, label: "Rs. 3,400", sprayCount: "~70 Sprays" },
      "10ml Decant": { price: 6200, label: "Rs. 6,200", sprayCount: "~140 Sprays" }
    },
    defaultSize: "10ml Decant",
    in_stock: true,
    display_order: 4
  },
  {
    id: "insp-aventus",
    name: "Imperial Aventus 15ml",
    brand: "Inspired by Creed Aventus",
    category: "inspired",
    gender: "men",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80",
    badge: "Inspired • 15ml Luxury",
    accords: ["Smoky Pineapple", "Rich Birch", "Clean Musk"],
    topNotes: "Pineapple, Bergamot, Apple",
    heartNotes: "Birch, Patchouli, Jasmine",
    baseNotes: "Musk, Ambergris, Oakmoss",
    longevity: "12h-14h Lasting",
    description: "Our signature French oil recreation of Creed Aventus in convenient 15ml luxury pocket sprayer. Available as single or in multi-packs with Free Delivery.",
    sizes: {
      "Single 15ml": { price: 1250, label: "Rs. 1,250", freeDelivery: false, desc: "1x 15ml Bottle" },
      "3-Pack (3x15ml)": { price: 3450, label: "Rs. 3,450", freeDelivery: true, desc: "3x 15ml Set (Save Rs. 300 + Free Delivery)" },
      "5-Pack (5x15ml)": { price: 5250, label: "Rs. 5,250", freeDelivery: true, desc: "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)" }
    },
    defaultSize: "3-Pack (3x15ml)",
    in_stock: true,
    display_order: 5
  },
  {
    id: "insp-rouge540",
    name: "Rouge Crystal 540 15ml",
    brand: "Inspired by Baccarat Rouge 540",
    category: "inspired",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80",
    badge: "Inspired • 15ml Luxury",
    accords: ["Saffron Sweetness", "Warm Amber", "Cedarwood"],
    topNotes: "Saffron, Jasmine Sambac",
    heartNotes: "Amberwood, Ambergris",
    baseNotes: "Fir Resin, Cedar",
    longevity: "16h+ Beast Mode",
    description: "The viral scent of sweet amber and saffron. High French oil concentration in 15ml atomizer.",
    sizes: {
      "Single 15ml": { price: 1250, label: "Rs. 1,250", freeDelivery: false, desc: "1x 15ml Bottle" },
      "3-Pack (3x15ml)": { price: 3450, label: "Rs. 3,450", freeDelivery: true, desc: "3x 15ml Set (Save Rs. 300 + Free Delivery)" },
      "5-Pack (5x15ml)": { price: 5250, label: "Rs. 5,250", freeDelivery: true, desc: "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)" }
    },
    defaultSize: "3-Pack (3x15ml)",
    in_stock: true,
    display_order: 6
  },
  {
    id: "insp-sauvage",
    name: "Sauvage Noir Elixir 15ml",
    brand: "Inspired by Dior Sauvage Elixir",
    category: "inspired",
    gender: "men",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80",
    badge: "Inspired • 15ml Luxury",
    accords: ["Nutmeg & Cinnamon", "Lavender", "Dark Woods"],
    topNotes: "Cinnamon, Nutmeg, Cardamom",
    heartNotes: "French Lavender",
    baseNotes: "Sandalwood, Amber, Licorice",
    longevity: "16h+ Extreme Longevity",
    description: "Deep spicy nocturnal formulation. Intense compliment puller in travel-friendly 15ml bottle.",
    sizes: {
      "Single 15ml": { price: 1250, label: "Rs. 1,250", freeDelivery: false, desc: "1x 15ml Bottle" },
      "3-Pack (3x15ml)": { price: 3450, label: "Rs. 3,450", freeDelivery: true, desc: "3x 15ml Set (Save Rs. 300 + Free Delivery)" },
      "5-Pack (5x15ml)": { price: 5250, label: "Rs. 5,250", freeDelivery: true, desc: "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)" }
    },
    defaultSize: "5-Pack (5x15ml)",
    in_stock: true,
    display_order: 7
  },
  {
    id: "insp-libre",
    name: "Golden Libre Intense 15ml",
    brand: "Inspired by YSL Libre Intense",
    category: "inspired",
    gender: "women",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
    badge: "Inspired • 15ml Luxury",
    accords: ["Orange Blossom", "Vanilla Orchid", "Lavender"],
    topNotes: "Mandarin, Bergamot, Lavender",
    heartNotes: "Orange Blossom, Jasmine Sambac",
    baseNotes: "Madagascar Vanilla, Ambergris, Tonka",
    longevity: "14h+ Lasting",
    description: "Seductive warm floral vanilla for independent women. Perfect for handbags or 3-pack gifting sets.",
    sizes: {
      "Single 15ml": { price: 1250, label: "Rs. 1,250", freeDelivery: false, desc: "1x 15ml Bottle" },
      "3-Pack (3x15ml)": { price: 3450, label: "Rs. 3,450", freeDelivery: true, desc: "3x 15ml Set (Save Rs. 300 + Free Delivery)" },
      "5-Pack (5x15ml)": { price: 5250, label: "Rs. 5,250", freeDelivery: true, desc: "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)" }
    },
    defaultSize: "Single 15ml",
    in_stock: true,
    display_order: 8
  },
  {
    id: "insp-tobacco-vanille",
    name: "Tobacco & Warm Vanille 15ml",
    brand: "Inspired by Tom Ford Tobacco Vanille",
    category: "inspired",
    gender: "unisex",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80",
    badge: "Inspired • 15ml Luxury",
    accords: ["Warm Tobacco", "Rich Vanilla", "Spicy Cacao"],
    topNotes: "Tobacco Leaf, Spicy Notes",
    heartNotes: "Tonka Bean, Tobacco Blossom, Vanilla, Cacao",
    baseNotes: "Dry Fruit Accord, Woody Notes",
    longevity: "16h+ Rich Scent",
    description: "Opulent and warm holiday sensation. Cozy sweet tobacco and vanilla aroma in sleek 15ml sprayer.",
    sizes: {
      "Single 15ml": { price: 1250, label: "Rs. 1,250", freeDelivery: false, desc: "1x 15ml Bottle" },
      "3-Pack (3x15ml)": { price: 3450, label: "Rs. 3,450", freeDelivery: true, desc: "3x 15ml Set (Save Rs. 300 + Free Delivery)" },
      "5-Pack (5x15ml)": { price: 5250, label: "Rs. 5,250", freeDelivery: true, desc: "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)" }
    },
    defaultSize: "3-Pack (3x15ml)",
    in_stock: true,
    display_order: 9
  }
];

// Runtime catalog
let RUNTIME_CATALOG = [];
const cardStates = {};

// ========================================================
// 1. CONFIGURATION & DATABASE LAYER (SUPABASE + LOCAL)
// ========================================================

// Default Supabase Cloud Credentials for Piyora
const DEFAULT_SUPABASE_URL = "https://ikwtymxlygxeucizsewn.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_CHawQcBT4YBD-iAAD8X_wQ_TcRCVpwQ";

function sanitizeSupabaseUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function getStoreConfig() {
  try {
    const raw = localStorage.getItem("piyora_settings");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.supabase_url) parsed.supabase_url = DEFAULT_SUPABASE_URL;
      if (!parsed.supabase_key) parsed.supabase_key = DEFAULT_SUPABASE_KEY;
      return parsed;
    }
  } catch (e) {}
  return {
    whatsapp_number: "94786623081",
    admin_pin: "7120",
    supabase_url: DEFAULT_SUPABASE_URL,
    supabase_key: DEFAULT_SUPABASE_KEY
  };
}

function saveStoreConfig(cfg) {
  const current = getStoreConfig();
  if (cfg.supabase_url) cfg.supabase_url = sanitizeSupabaseUrl(cfg.supabase_url);
  const updated = { ...current, ...cfg };
  localStorage.setItem("piyora_settings", JSON.stringify(updated));
}

function getWhatsAppNumber() {
  return getStoreConfig().whatsapp_number || "94786623081";
}

function getAdminPin() {
  return getStoreConfig().admin_pin || "7120";
}

function getSupabaseCredentials() {
  const cfg = getStoreConfig();
  return { 
    url: sanitizeSupabaseUrl(cfg.supabase_url) || DEFAULT_SUPABASE_URL, 
    key: cfg.supabase_key || DEFAULT_SUPABASE_KEY 
  };
}

function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (url && key && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      return window.supabase.createClient(url, key);
    } catch (e) {
      console.warn("Supabase init error:", e);
    }
  }
  return null;
}

/**
 * Load Catalog Data from Supabase if connected, else localStorage, else default seed
 */
async function loadCatalogData() {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      const { data, error } = await client
        .from('perfumes')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        RUNTIME_CATALOG = data.map(row => {
          let imagesArr = [];
          if (Array.isArray(row.images) && row.images.length > 0) {
            imagesArr = row.images;
          } else if (typeof row.images === 'string' && row.images.trim().startsWith('[')) {
            try { imagesArr = JSON.parse(row.images); } catch(e) { imagesArr = []; }
          }
          if (!imagesArr.length && row.image) {
            imagesArr = [row.image];
          }

          return {
            id: row.id,
            name: row.name,
            brand: row.brand,
            category: row.category,
            gender: row.gender,
            image: imagesArr[0] || row.image || 'logo.jpg',
            images: imagesArr,
            badge: row.badge,
            accords: typeof row.accords === 'string' ? JSON.parse(row.accords) : (row.accords || []),
            topNotes: row.top_notes || "",
            heartNotes: row.heart_notes || "",
            baseNotes: row.base_notes || "",
            longevity: row.longevity || "14h+ Lasting",
            description: row.description || "",
            sizes: typeof row.sizes === 'string' ? JSON.parse(row.sizes) : row.sizes,
            defaultSize: row.category === 'authentic' ? '10ml Decant' : '3-Pack (3x15ml)',
            in_stock: row.in_stock !== false,
            display_order: row.display_order || 0
          };
        });

        // Cache locally
        localStorage.setItem("piyora_catalog", JSON.stringify(RUNTIME_CATALOG));
        return RUNTIME_CATALOG;
      }
    } catch (e) {
      console.warn("Error fetching from Supabase, falling back to local:", e);
    }
  }

  // Fallback to local storage
  try {
    const cached = localStorage.getItem("piyora_catalog");
    if (cached) {
      RUNTIME_CATALOG = JSON.parse(cached);
      // Ensure images array exists on all cached items
      RUNTIME_CATALOG = RUNTIME_CATALOG.map(p => ({
        ...p,
        images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
      }));
      return RUNTIME_CATALOG;
    }
  } catch (e) {}

  // Fallback to initial seeds
  RUNTIME_CATALOG = JSON.parse(JSON.stringify(DEFAULT_SEED_PRODUCTS));
  localStorage.setItem("piyora_catalog", JSON.stringify(RUNTIME_CATALOG));
  return RUNTIME_CATALOG;
}

function getActiveCatalog() {
  if (!RUNTIME_CATALOG || RUNTIME_CATALOG.length === 0) {
    RUNTIME_CATALOG = JSON.parse(JSON.stringify(DEFAULT_SEED_PRODUCTS));
  }
  return RUNTIME_CATALOG;
}

/**
 * Sync updates to Supabase and LocalStorage
 */
async function syncProductUpdate(product) {
  // Ensure images array and primary image match
  if (!Array.isArray(product.images) || product.images.length === 0) {
    product.images = product.image ? [product.image] : ['logo.jpg'];
  }
  product.image = product.images[0];

  // Update local runtime
  const idx = RUNTIME_CATALOG.findIndex(p => p.id === product.id);
  if (idx !== -1) RUNTIME_CATALOG[idx] = product;
  localStorage.setItem("piyora_catalog", JSON.stringify(RUNTIME_CATALOG));

  // Sync to Supabase
  const client = getSupabaseClient();
  if (client) {
    try {
      await client
        .from('perfumes')
        .update({
          name: product.name,
          brand: product.brand,
          category: product.category,
          gender: product.gender,
          image: product.image,
          images: product.images,
          badge: product.badge,
          sizes: product.sizes,
          top_notes: product.topNotes,
          heart_notes: product.heartNotes,
          base_notes: product.baseNotes,
          longevity: product.longevity,
          description: product.description,
          in_stock: product.in_stock !== false
        })
        .eq('id', product.id);
    } catch (e) {
      console.error("Supabase update error:", e);
    }
  }
}

async function syncProductInsert(product) {
  if (!Array.isArray(product.images) || product.images.length === 0) {
    product.images = product.image ? [product.image] : ['logo.jpg'];
  }
  product.image = product.images[0];

  RUNTIME_CATALOG.unshift(product);
  localStorage.setItem("piyora_catalog", JSON.stringify(RUNTIME_CATALOG));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client
        .from('perfumes')
        .insert({
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          gender: product.gender,
          image: product.image,
          images: product.images,
          badge: product.badge,
          accords: product.accords,
          top_notes: product.topNotes,
          heart_notes: product.heartNotes,
          base_notes: product.baseNotes,
          longevity: product.longevity,
          description: product.description,
          sizes: product.sizes,
          in_stock: product.in_stock !== false,
          display_order: 0
        });
    } catch (e) {
      console.error("Supabase insert error:", e);
    }
  }
}

async function syncProductDelete(productId) {
  RUNTIME_CATALOG = RUNTIME_CATALOG.filter(p => p.id !== productId);
  localStorage.setItem("piyora_catalog", JSON.stringify(RUNTIME_CATALOG));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('perfumes').delete().eq('id', productId);
    } catch (e) {
      console.error("Supabase delete error:", e);
    }
  }
}

// ========================================================
// ORDERS DATA MANAGEMENT LAYER (SUPABASE + LOCAL STORAGE)
// ========================================================
let RUNTIME_ORDERS = [];

async function loadOrdersData() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        RUNTIME_ORDERS = data.map(o => ({
          ...o,
          items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items
        }));
        localStorage.setItem("piyora_orders", JSON.stringify(RUNTIME_ORDERS));
        return RUNTIME_ORDERS;
      }
    } catch (e) {
      console.warn("Supabase load orders error:", e);
    }
  }

  const saved = localStorage.getItem("piyora_orders");
  if (saved) {
    try {
      RUNTIME_ORDERS = JSON.parse(saved);
    } catch (e) {
      RUNTIME_ORDERS = [];
    }
  } else {
    RUNTIME_ORDERS = [];
  }
  return RUNTIME_ORDERS;
}

function getActiveOrders() {
  return RUNTIME_ORDERS;
}

async function syncOrderInsert(order) {
  RUNTIME_ORDERS.unshift(order);
  localStorage.setItem("piyora_orders", JSON.stringify(RUNTIME_ORDERS));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').insert({
        id: order.id,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_address: order.customer_address,
        customer_city: order.customer_city,
        customer_note: order.customer_note || "",
        items: order.items,
        total_price: order.total_price,
        status: order.status || 'pending',
        payment_method: order.payment_method || 'Cash on Delivery',
        created_at: order.created_at || new Date().toISOString()
      });
    } catch (e) {
      console.warn("Supabase insert order error:", e);
    }
  }
}

async function syncOrderStatusUpdate(orderId, newStatus) {
  const order = RUNTIME_ORDERS.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem("piyora_orders", JSON.stringify(RUNTIME_ORDERS));
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').update({ status: newStatus }).eq('id', orderId);
    } catch (e) {
      console.warn("Supabase update order status error:", e);
    }
  }
}

async function syncOrderDelete(orderId) {
  RUNTIME_ORDERS = RUNTIME_ORDERS.filter(o => o.id !== orderId);
  localStorage.setItem("piyora_orders", JSON.stringify(RUNTIME_ORDERS));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('orders').delete().eq('id', orderId);
    } catch (e) {
      console.warn("Supabase delete order error:", e);
    }
  }
}

// ========================================================
// 3. REVIEWS & SCREENSHOTS MANAGEMENT LAYER (SUPABASE + LOCAL)
// ========================================================
const DEFAULT_SEED_REVIEWS = [
  {
    id: "rev-1",
    customer_name: "Kasun Jayawardena",
    city: "Colombo 07",
    perfume_name: "Creed Aventus (Authentic Decant)",
    rating: 5,
    comment: "Original Creed decant ekakma thama. Scent eka 14 hours+ thiyenawa. Leakproof glass spray atomizer eka mara luxury. Highly recommended!",
    screenshot_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    is_verified: true,
    status: "approved",
    created_at: "2026-11-04T14:20:00Z"
  },
  {
    id: "rev-2",
    customer_name: "Dinuka Madushanka",
    city: "Kandy",
    perfume_name: "Rouge Crystal 540 15ml (Inspired)",
    rating: 5,
    comment: "Baccarat Rouge 540 smell ekama thiyenawa. Office ekedi okkoma ahuwa mokakda perfume eka kiyala. Fast delivery within 2 days to Kandy!",
    screenshot_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    is_verified: true,
    status: "approved",
    created_at: "2026-11-05T09:15:00Z"
  },
  {
    id: "rev-3",
    customer_name: "Sachini Dissanayake",
    city: "Kurunegala",
    perfume_name: "3-Pack Inspired Bundle (Libre + Rouge + Sauvage)",
    rating: 5,
    comment: "Ordered 3-pack set. Delivery took only 2 days to Kurunegala. Long lasting sweet vanilla notes & free delivery was super convenient!",
    screenshot_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    is_verified: true,
    status: "approved",
    created_at: "2026-11-06T18:40:00Z"
  },
  {
    id: "rev-4",
    customer_name: "Ravindu Alwis",
    city: "Galle",
    perfume_name: "Dior Sauvage Elixir (Authentic Decant)",
    rating: 5,
    comment: "Elixir decant eka beast mode lasting! 100% genuine batch verified. Trustworthy seller with cash on delivery. Definitely buying again.",
    screenshot_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    is_verified: true,
    status: "approved",
    created_at: "2026-11-07T11:05:00Z"
  }
];

let RUNTIME_REVIEWS = [];

async function loadReviewsData() {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        RUNTIME_REVIEWS = data;
        localStorage.setItem("piyora_reviews", JSON.stringify(RUNTIME_REVIEWS));
        return RUNTIME_REVIEWS;
      }
    } catch (e) {
      console.warn("Supabase load reviews error:", e);
    }
  }

  const saved = localStorage.getItem("piyora_reviews");
  if (saved) {
    try {
      RUNTIME_REVIEWS = JSON.parse(saved);
      if (Array.isArray(RUNTIME_REVIEWS) && RUNTIME_REVIEWS.length > 0) {
        return RUNTIME_REVIEWS;
      }
    } catch (e) {}
  }

  RUNTIME_REVIEWS = JSON.parse(JSON.stringify(DEFAULT_SEED_REVIEWS));
  localStorage.setItem("piyora_reviews", JSON.stringify(RUNTIME_REVIEWS));
  return RUNTIME_REVIEWS;
}

function getActiveReviews() {
  if (!RUNTIME_REVIEWS || RUNTIME_REVIEWS.length === 0) {
    RUNTIME_REVIEWS = JSON.parse(JSON.stringify(DEFAULT_SEED_REVIEWS));
  }
  return RUNTIME_REVIEWS;
}

async function syncReviewInsert(review) {
  RUNTIME_REVIEWS.unshift(review);
  localStorage.setItem("piyora_reviews", JSON.stringify(RUNTIME_REVIEWS));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('reviews').insert({
        id: review.id,
        customer_name: review.customer_name,
        city: review.city || "",
        perfume_name: review.perfume_name,
        rating: review.rating || 5,
        comment: review.comment,
        screenshot_url: review.screenshot_url || "",
        is_verified: review.is_verified !== false,
        status: review.status || 'approved',
        created_at: review.created_at || new Date().toISOString()
      });
    } catch (e) {
      console.warn("Supabase insert review error:", e);
    }
  }
}

async function syncReviewDelete(reviewId) {
  RUNTIME_REVIEWS = RUNTIME_REVIEWS.filter(r => r.id !== reviewId);
  localStorage.setItem("piyora_reviews", JSON.stringify(RUNTIME_REVIEWS));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('reviews').delete().eq('id', reviewId);
    } catch (e) {
      console.warn("Supabase delete review error:", e);
    }
  }
}

// Storefront Reviews Lightbox & Render
let storefrontReviewFilter = "all";

function setStorefrontReviewFilter(filter, btn) {
  storefrontReviewFilter = filter;
  document.querySelectorAll(".review-filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderStorefrontReviews();
}

function renderStorefrontReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  let reviews = getActiveReviews().filter(r => r.status !== 'hidden');

  if (storefrontReviewFilter === "screenshots") {
    reviews = reviews.filter(r => r.screenshot_url && r.screenshot_url.trim().length > 0);
  } else if (storefrontReviewFilter === "authentic") {
    reviews = reviews.filter(r => r.perfume_name.toLowerCase().includes("authentic") || r.perfume_name.toLowerCase().includes("decant"));
  } else if (storefrontReviewFilter === "inspired") {
    reviews = reviews.filter(r => r.perfume_name.toLowerCase().includes("inspired") || r.perfume_name.toLowerCase().includes("15ml") || r.perfume_name.toLowerCase().includes("pack"));
  }

  if (reviews.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem; color:var(--text-muted);">
        <div style="font-size:2rem; margin-bottom:0.5rem;">💌</div>
        <div>No reviews found in this filter. Be the first to add one!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = reviews.map(rev => {
    const stars = "★".repeat(rev.rating || 5) + "☆".repeat(Math.max(0, 5 - (rev.rating || 5)));
    const dateObj = new Date(rev.created_at);
    const dateStr = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently";
    const hasScreenshot = rev.screenshot_url && rev.screenshot_url.trim().length > 5;

    return `
      <div class="review-card ${hasScreenshot ? 'has-screenshot' : ''}">
        <div class="review-card-top">
          <div class="review-stars-wrap">
            <span class="review-stars">${stars}</span>
            <span class="review-rating-score">${(rev.rating || 5)}.0</span>
          </div>
          ${rev.is_verified ? `
            <span class="review-verified-tag">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span>Verified Purchase</span>
            </span>
          ` : ''}
        </div>

        <div class="review-perfume-badge">
          🧴 ${rev.perfume_name}
        </div>

        <p class="review-comment-text">
          "${rev.comment}"
        </p>

        ${hasScreenshot ? `
          <div class="review-screenshot-box" onclick="openScreenshotLightbox('${rev.screenshot_url}', '${rev.customer_name}', '${rev.perfume_name}', '${encodeURIComponent(rev.comment)}')">
            <img src="${rev.screenshot_url}" alt="Customer Review Screenshot" onerror="this.parentElement.style.display='none'">
            <div class="review-screenshot-overlay">
              <span class="screenshot-zoom-pill">
                🔍 <span>View Full Screenshot</span>
              </span>
            </div>
            <span class="screenshot-badge-pill">📸 WhatsApp / Proof</span>
          </div>
        ` : ''}

        <div class="review-card-footer">
          <div class="review-avatar-wrap">
            <div class="review-avatar">${(rev.customer_name || 'C').charAt(0).toUpperCase()}</div>
            <div>
              <div class="review-author-name">${rev.customer_name}</div>
              <div class="review-author-city">${rev.city ? '📍 ' + rev.city : 'Sri Lanka'} • <span style="color:var(--text-muted); font-size:0.7rem;">${dateStr}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Lightbox for reviewing screenshots
function openScreenshotLightbox(imgUrl, author, perfume, encodedComment) {
  const modal = document.getElementById("screenshotLightboxModal");
  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const commentEl = document.getElementById("lightboxComment");

  if (!modal || !imgEl) return;
  imgEl.src = imgUrl;
  if (titleEl) titleEl.textContent = `${author} • ${perfume}`;
  if (commentEl) commentEl.textContent = `"${decodeURIComponent(encodedComment || '')}"`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeScreenshotLightbox() {
  const modal = document.getElementById("screenshotLightboxModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "auto";
}

// Add Review Modal (Storefront)
function openAddReviewModal() {
  const modal = document.getElementById("addReviewModal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeAddReviewModal() {
  const modal = document.getElementById("addReviewModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
    const form = document.getElementById("customerReviewForm");
    if (form) form.reset();
    const preview = document.getElementById("reviewScreenshotPreview");
    if (preview) preview.style.display = "none";
  }
}

async function handleStorefrontReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("revCustName").value.trim();
  const city = document.getElementById("revCustCity").value.trim() || "Sri Lanka";
  const perfume = document.getElementById("revPerfume").value.trim();
  const rating = parseInt(document.getElementById("revRating").value) || 5;
  const comment = document.getElementById("revComment").value.trim();
  const screenshot = document.getElementById("revScreenshotBase64").value.trim();

  if (!name || !perfume || !comment) {
    alert("කරුණාකර සියලුම අවශ්‍ය විස්තර පුරවන්න. (Please fill all required fields)");
    return;
  }

  const newReview = {
    id: "rev-" + Date.now(),
    customer_name: name,
    city: city,
    perfume_name: perfume,
    rating: rating,
    comment: comment,
    screenshot_url: screenshot,
    is_verified: true,
    status: "approved",
    created_at: new Date().toISOString()
  };

  await syncReviewInsert(newReview);
  closeAddReviewModal();
  alert("ඔබගේ Review එක සාර්ථකව ඇතුළත් කරන ලදී! Piyora තෝරාගැනීම පිළිබඳව ස්තූතියි! ✨");
  renderStorefrontReviews();
}

// Client-side screenshot preview for customer review form
async function handleCustomerReviewImage(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  try {
    const base64 = await processImageFile(file, 800, 0.85);
    document.getElementById("revScreenshotBase64").value = base64;
    const preview = document.getElementById("reviewScreenshotPreview");
    if (preview) {
      preview.src = base64;
      preview.style.display = "block";
    }
  } catch (err) {
    console.error("Error processing screenshot:", err);
  }
}

// ========================================================
// ON-SITE CASH ON DELIVERY CHECKOUT ENGINE
// ========================================================
let currentCheckoutItem = null;

function openCheckoutModal(productId, sizeKey) {
  const product = getActiveCatalog().find(p => p.id === productId);
  if (!product) return;

  const chosenSize = sizeKey || cardStates[productId]?.selectedSize || Object.keys(product.sizes)[0];
  const sizeData = product.sizes[chosenSize] || Object.values(product.sizes)[0];
  if (!sizeData) return;

  currentCheckoutItem = {
    type: "single",
    productId: product.id,
    name: product.name,
    brand: product.brand,
    image: product.image,
    size: chosenSize,
    price: sizeData.price,
    priceLabel: sizeData.label,
    freeDelivery: !!sizeData.freeDelivery
  };

  renderCheckoutPreview();
  const formView = document.getElementById("checkoutFormView");
  const successView = document.getElementById("checkoutSuccessView");
  const form = document.getElementById("orderCheckoutForm");
  if (formView) formView.style.display = "block";
  if (successView) successView.style.display = "none";
  if (form) form.reset();

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openPackCheckoutModal() {
  const maxAllowed = selectedPackTier === "3-pack" ? 3 : 5;
  if (selectedScents.size < maxAllowed) {
    alert(`කරුණාකර මෙම පැක් එක සඳහා Perfumes ${maxAllowed}ක් තෝරාගන්න.`);
    return;
  }

  const catalog = getActiveCatalog();
  const chosenList = Array.from(selectedScents).map(id => {
    const p = catalog.find(item => item.id === id);
    return { id, name: p ? p.name : id, brand: p ? p.brand : "" };
  });

  const packTitle = selectedPackTier === "3-pack" ? "3-Bottle Discovery Pack (15ml x 3)" : "5-Bottle Collector's Pack (15ml x 5)";
  const price = selectedPackTier === "3-pack" ? 3450 : 5250;

  currentCheckoutItem = {
    type: "pack",
    packTitle,
    tier: selectedPackTier,
    price: price,
    priceLabel: `Rs. ${price.toLocaleString()}`,
    scents: chosenList,
    freeDelivery: true
  };

  renderCheckoutPreview();
  const formView = document.getElementById("checkoutFormView");
  const successView = document.getElementById("checkoutSuccessView");
  const form = document.getElementById("orderCheckoutForm");
  if (formView) formView.style.display = "block";
  if (successView) successView.style.display = "none";
  if (form) form.reset();

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function renderCheckoutPreview() {
  const container = document.getElementById("checkoutItemPreview");
  if (!container || !currentCheckoutItem) return;

  if (currentCheckoutItem.type === "single") {
    container.innerHTML = `
      <div class="summary-thumb-box">
        <img src="${currentCheckoutItem.image}" alt="${currentCheckoutItem.name}" class="summary-thumb-img" onerror="this.src='logo.jpg'">
      </div>
      <div class="summary-details">
        <div class="summary-brand">${currentCheckoutItem.brand}</div>
        <div class="summary-name">${currentCheckoutItem.name}</div>
        <div class="summary-size">Selected: <strong>${currentCheckoutItem.size}</strong></div>
        <div class="summary-price-row">
          <span class="summary-price">${currentCheckoutItem.priceLabel}</span>
          <span class="summary-tag-free">🚚 ${currentCheckoutItem.freeDelivery ? 'FREE DELIVERY' : 'Islandwide Delivery Available'}</span>
        </div>
      </div>
    `;
  } else {
    const scentsHtml = currentCheckoutItem.scents.map((s, i) => `<li>${i + 1}. <strong>${s.name}</strong></li>`).join('');
    container.innerHTML = `
      <div class="summary-thumb-box pack-thumb-box">
        <span style="font-size:1.8rem;">🎁</span>
      </div>
      <div class="summary-details">
        <div class="summary-brand">PIYORA 15ML DISCOVERY SET</div>
        <div class="summary-name">${currentCheckoutItem.packTitle}</div>
        <ul class="summary-pack-list">
          ${scentsHtml}
        </ul>
        <div class="summary-price-row">
          <span class="summary-price">${currentCheckoutItem.priceLabel}</span>
          <span class="summary-tag-free">🚚 FREE ISLANDWIDE DELIVERY</span>
        </div>
      </div>
    `;
  }
}

async function handleOrderSubmit(e) {
  e.preventDefault();
  if (!currentCheckoutItem) return;

  const btn = document.getElementById("btnSubmitOrder");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Processing Order...</span>`;
  }

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const note = document.getElementById("custNote").value.trim();

  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = "PIO-" + randSuffix;
  const now = new Date().toISOString();

  const newOrder = {
    id: orderId,
    customer_name: name,
    customer_phone: phone,
    customer_address: address,
    customer_city: city,
    customer_note: note,
    items: currentCheckoutItem,
    total_price: currentCheckoutItem.price,
    status: 'pending',
    payment_method: 'Cash on Delivery',
    created_at: now
  };

  await syncOrderInsert(newOrder);

  // Show success view
  const formView = document.getElementById("checkoutFormView");
  const successView = document.getElementById("checkoutSuccessView");
  if (formView) formView.style.display = "none";
  if (successView) successView.style.display = "block";

  const orderIdEl = document.getElementById("successOrderId");
  if (orderIdEl) orderIdEl.textContent = `#${orderId}`;

  const summaryEl = document.getElementById("successOrderDetails");
  if (summaryEl) {
    const itemTitle = currentCheckoutItem.type === "single" 
      ? `${currentCheckoutItem.name} (${currentCheckoutItem.size})`
      : `${currentCheckoutItem.packTitle}`;

    summaryEl.innerHTML = `
      <div style="font-size:0.9rem; color:#fff; font-weight:600; margin-bottom:0.35rem;">${itemTitle}</div>
      <div style="color:var(--accent-gold); font-weight:700; font-size:1.15rem;">${currentCheckoutItem.priceLabel} (Cash on Delivery)</div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">
        Deliver to: <strong>${name}</strong>, ${address}, ${city} (📞 ${phone})
      </div>
    `;
  }

  // Pre-fill optional WhatsApp receipt button
  const waReceiptBtn = document.getElementById("successWaReceiptBtn");
  if (waReceiptBtn) {
    const waText = 
`🛍️ *PIYORA ORDER RECEIPT - #${orderId}*
----------------------------------------
👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}, ${city}
${note ? `📝 *Note:* ${note}\n` : ''}----------------------------------------
📦 *Item:* ${currentCheckoutItem.type === "single" ? `${currentCheckoutItem.name} (${currentCheckoutItem.size})` : `${currentCheckoutItem.packTitle}`}
💰 *Total (COD):* ${currentCheckoutItem.priceLabel}
🚚 *Delivery:* FREE Islandwide Delivery Included
----------------------------------------
Hi Piyora! I placed order #${orderId} on your site. Please confirm dispatch!`;

    waReceiptBtn.href = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(waText)}`;
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<span>🛍️ ඇණවුම තහවුරු කරන්න (Confirm Order)</span>`;
  }
}

// ========================================================
// 2. STOREFRONT WHATSAPP & ORDER LOGIC
// ========================================================

function initStates() {
  getActiveCatalog().forEach(p => {
    cardStates[p.id] = {
      selectedSize: p.defaultSize || Object.keys(p.sizes)[0]
    };
  });
}

function buildWhatsAppUrl(product, sizeKey) {
  const currentWhatsApp = getWhatsAppNumber();
  const sizeData = product.sizes[sizeKey] || Object.values(product.sizes)[0];
  const isAuthentic = product.category === "authentic";

  let text = "";
  if (isAuthentic) {
    text = 
`💎 *PIYORA - AUTHENTIC DECANT ORDER* 💎
------------------------------------------
🧴 *Perfume:* ${product.name}
🏷️ *Brand:* ${product.brand}
🔬 *Selected Decant Size:* ${sizeKey} (${sizeData.sprayCount || ''})
💰 *Price:* ${sizeData.label}
------------------------------------------
👋 Hi Piyora! I would like to order this 100% Authentic Original Decant.
📍 Please confirm availability and cash-on-delivery details to my address.`;
  } else {
    const freeDeliveryNotice = sizeData.freeDelivery ? "✅ FREE ISLANDWIDE DELIVERY INCLUDED!" : "Standard islandwide delivery";
    text = 
`👑 *PIYORA - 15ML PERFUME ORDER* 👑
------------------------------------------
🧴 *Perfume / Scent:* ${product.name}
🏷️ *Inspired By:* ${product.brand}
📦 *Selection:* ${sizeKey} (${sizeData.desc || '15ml Bottle'})
🚚 *Delivery:* ${freeDeliveryNotice}
💰 *Total Price:* ${sizeData.label}
------------------------------------------
👋 Hi Piyora! I would like to order this 15ml Inspired perfume selection.
📍 Please confirm dispatch & delivery timeframe!`;
  }

  return `https://wa.me/${currentWhatsApp}?text=${encodeURIComponent(text)}`;
}

/**
 * Render Storefront Products
 */
function renderProducts(items) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">ගැළපෙන Perfumes කිසිවක් හමු නොවීය.</p>
        <p style="font-size: 0.85rem;">No matching fragrances found. Try a different search term or category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(p => {
    const activeSize = cardStates[p.id]?.selectedSize || p.defaultSize || Object.keys(p.sizes)[0];
    const sizeData = p.sizes[activeSize] || Object.values(p.sizes)[0];
    const isAuthentic = p.category === "authentic";
    const badgeClass = isAuthentic ? "badge-authentic" : "badge-inspired";
    const isInStock = p.in_stock !== false;
    const hasFreeDelivery = sizeData.freeDelivery === true;

    return `
      <div class="product-card ${!isInStock ? 'card-out-of-stock' : ''}" id="card-${p.id}">
        <div class="card-media" onclick="openDetailsModal('${p.id}')">
          <span class="type-badge ${badgeClass}">${p.badge}</span>
          ${hasFreeDelivery && isInStock ? '<span class="free-shipping-tag">🚚 FREE DELIVERY</span>' : ''}
          ${!isInStock ? '<span class="badge-out-stock-tag">⚠️ OUT OF STOCK</span>' : ''}
          <span class="longevity-badge">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>
            ${p.longevity}
          </span>
          <button class="quick-view-btn" title="Fragrance Notes" onclick="event.stopPropagation(); openDetailsModal('${p.id}')">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
        </div>

        <div class="card-content">
          <div class="card-brand">${p.brand}</div>
          <h3 class="card-title">${p.name}</h3>

          <div class="accords-preview">
            ${(p.accords || []).map(a => `<span class="accord-tag">${a}</span>`).join('')}
          </div>

          <div class="size-selector-label">
            <span>${isAuthentic ? 'Decant Size (Atomizer):' : 'Package / Quantity:'}</span>
            <span id="label-size-${p.id}" style="color: var(--accent-gold); font-weight: 600;">${activeSize}</span>
          </div>

          <div class="size-options">
            ${Object.keys(p.sizes).map(sKey => `
              <button 
                type="button" 
                class="size-btn ${sKey === activeSize ? 'active' : ''}" 
                onclick="changeCardSize('${p.id}', '${sKey}')"
              >
                ${sKey}
              </button>
            `).join('')}
          </div>

          <div class="card-footer">
            <div class="price-row">
              <div class="price-display">
                <span class="price-label">Price (${activeSize})</span>
                <span class="current-price" id="price-val-${p.id}">${sizeData.label}</span>
              </div>
              <div class="stock-indicator">
                <span class="stock-dot ${!isInStock ? 'stock-dot-red' : ''}"></span>
                <span style="${!isInStock ? 'color:#ef4444;' : ''}">${isInStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            ${isInStock ? `
              <div class="card-btn-stack">
                <a 
                  href="${buildWhatsAppUrl(p, activeSize)}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-whatsapp-order btn-card-wa" 
                  id="wa-btn-${p.id}"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
                  <span>Order via WhatsApp</span>
                </a>
                <button 
                  type="button" 
                  class="btn-whatsapp-order btn-order-now" 
                  id="order-btn-${p.id}"
                  onclick="openCheckoutModal('${p.id}')"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  <span>Order Now (Cash on Delivery)</span>
                </button>
              </div>
            ` : `
              <a 
                href="https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(`Hi Piyora! Please notify me when ${product.name} is back in stock.`)}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-whatsapp-order btn-out-stock-cta"
              >
                <span>Notify When in Stock</span>
              </a>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function changeCardSize(productId, sizeKey) {
  const product = getActiveCatalog().find(p => p.id === productId);
  if (!product) return;

  cardStates[productId].selectedSize = sizeKey;

  const card = document.getElementById(`card-${productId}`);
  if (card) {
    const btns = card.querySelectorAll('.size-btn');
    btns.forEach(b => {
      if (b.textContent.trim() === sizeKey) b.classList.add('active');
      else b.classList.remove('active');
    });

    const labelSize = document.getElementById(`label-size-${productId}`);
    if (labelSize) labelSize.textContent = sizeKey;

    const sizeData = product.sizes[sizeKey] || Object.values(product.sizes)[0];
    const priceVal = document.getElementById(`price-val-${productId}`);
    if (priceVal) priceVal.textContent = sizeData.label;

    const waBtn = document.getElementById(`wa-btn-${productId}`);
    if (waBtn && product.in_stock !== false) waBtn.href = buildWhatsAppUrl(product, sizeKey);
  }
}

/**
 * Details Modal Gallery State & Controls
 */
let currentModalImages = [];
let currentModalImageIndex = 0;

function selectModalGalleryImage(index) {
  if (!currentModalImages || index < 0 || index >= currentModalImages.length) return;
  currentModalImageIndex = index;
  const mainImg = document.getElementById("modalMainImg");
  const counter = document.getElementById("modalGalleryCounter");
  if (mainImg) mainImg.src = currentModalImages[index];
  if (counter) counter.textContent = `${index + 1} / ${currentModalImages.length}`;

  const thumbs = document.querySelectorAll(".modal-thumb-btn");
  thumbs.forEach((t, i) => {
    if (i === index) t.classList.add("active");
    else t.classList.remove("active");
  });
}

function navModalGallery(direction) {
  if (!currentModalImages || currentModalImages.length <= 1) return;
  let nextIndex = currentModalImageIndex + direction;
  if (nextIndex < 0) nextIndex = currentModalImages.length - 1;
  else if (nextIndex >= currentModalImages.length) nextIndex = 0;
  selectModalGalleryImage(nextIndex);
}

/**
 * Details Modal
 */
function openDetailsModal(productId) {
  const product = getActiveCatalog().find(p => p.id === productId);
  if (!product) return;

  const currentSize = cardStates[productId]?.selectedSize || product.defaultSize || Object.keys(product.sizes)[0];
  const sizeData = product.sizes[currentSize] || Object.values(product.sizes)[0];
  const isAuthentic = product.category === "authentic";
  const isInStock = product.in_stock !== false;

  currentModalImages = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image || 'logo.jpg'];
  currentModalImageIndex = 0;

  const modalContainer = document.getElementById("modalContainer");
  const modalBody = document.getElementById("modalBody");
  if (!modalContainer || !modalBody) return;

  const hasMultipleImages = currentModalImages.length > 1;

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-col">
        <div class="modal-gallery-wrap">
          <div class="modal-main-img-box">
            <img id="modalMainImg" class="modal-img" src="${currentModalImages[0]}" alt="${product.name}">
            <span class="type-badge ${isAuthentic ? 'badge-authentic' : 'badge-inspired'}" style="top:1.25rem; left:1.25rem; z-index:3;">
              ${product.badge}
            </span>
            ${hasMultipleImages ? `
              <div class="modal-gallery-counter" id="modalGalleryCounter">1 / ${currentModalImages.length}</div>
              <button type="button" class="modal-gallery-nav modal-gallery-prev" onclick="navModalGallery(-1)" aria-label="Previous photo">‹</button>
              <button type="button" class="modal-gallery-nav modal-gallery-next" onclick="navModalGallery(1)" aria-label="Next photo">›</button>
            ` : ''}
          </div>

          ${hasMultipleImages ? `
            <div class="modal-thumb-strip">
              ${currentModalImages.map((img, i) => `
                <button type="button" class="modal-thumb-btn ${i === 0 ? 'active' : ''}" onclick="selectModalGalleryImage(${i})" title="Photo ${i+1}">
                  <img src="${img}" alt="Thumbnail ${i+1}" onerror="this.src='logo.jpg'">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>

      <div class="modal-details-col">
        <span style="font-size: 0.72rem; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
          ${product.brand}
        </span>
        <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: #fff; margin: 0.2rem 0 0.5rem;">
          ${product.name}
        </h2>
        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem;">
          ${product.description}
        </p>

        <!-- Fragrance Pyramid Notes -->
        <div class="pyramid-box">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #fff; font-weight: 700; margin-bottom: 0.6rem;">
            Fragrance Pyramid (සුවඳ සටහන)
          </div>
          <div class="pyramid-row">
            <span class="pyramid-label">Top Notes:</span>
            <span class="pyramid-notes">${product.topNotes}</span>
          </div>
          <div class="pyramid-row">
            <span class="pyramid-label">Heart:</span>
            <span class="pyramid-notes">${product.heartNotes}</span>
          </div>
          <div class="pyramid-row">
            <span class="pyramid-label">Base Notes:</span>
            <span class="pyramid-notes">${product.baseNotes}</span>
          </div>
        </div>

        <div class="size-selector-label">
          <span>${isAuthentic ? 'Select Decant Size (Original Bottle Sprays):' : 'Select Package Option (Free Delivery on Packs):'}</span>
        </div>
        <div class="size-options" style="margin-bottom: 1.5rem;">
          ${Object.keys(product.sizes).map(s => `
            <button 
              type="button" 
              class="size-btn ${s === currentSize ? 'active' : ''}" 
              id="modal-btn-${s}"
              onclick="changeModalSize('${product.id}', '${s}')"
            >
              ${s} - ${product.sizes[s].label}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1rem; border-top: 1px solid var(--border-glass); padding-top: 1rem;">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Total Price (<span id="modal-size-tag">${currentSize}</span>)</div>
            <div style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: #fff;" id="modal-price-val">
              ${sizeData.label}
            </div>
            ${sizeData.freeDelivery && isInStock ? '<div style="font-size:0.75rem; color:#4ade80; font-weight:600; margin-top:2px;">✨ Free Islandwide Delivery Included!</div>' : ''}
          </div>
          <div class="stock-indicator">
            <span class="stock-dot ${!isInStock ? 'stock-dot-red' : ''}"></span> 
            <span style="${!isInStock ? 'color:#ef4444;' : ''}">${isInStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>

        ${isInStock ? `
          <div class="modal-btn-stack" style="display:flex; flex-direction:column; gap:0.6rem; margin-top:0.75rem;">
            <a 
              href="${buildWhatsAppUrl(product, currentSize)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-whatsapp-order" 
              id="modal-wa-btn"
              style="padding: 0.85rem 1.5rem; font-size: 0.92rem;"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
              <span>Order via WhatsApp (${currentSize})</span>
            </a>
            <button 
              type="button" 
              class="btn-whatsapp-order btn-order-now" 
              id="modal-order-now-btn"
              onclick="closeModal(); openCheckoutModal('${product.id}', '${currentSize}');"
              style="padding: 0.85rem 1.5rem; font-size: 0.92rem; cursor: pointer;"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Order Now - Cash on Delivery (${currentSize})</span>
            </button>
          </div>
        ` : `
          <a 
            href="https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(`Hi Piyora! Please notify me when ${product.name} is back in stock.`)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-whatsapp-order btn-out-stock-cta"
            style="padding: 0.9rem 1.5rem; font-size: 0.95rem;"
          >
            <span>Notify When in Stock</span>
          </a>
        `}
      </div>
    </div>
  `;

  modalContainer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeModalSize(productId, sizeKey) {
  changeCardSize(productId, sizeKey);
  const product = getActiveCatalog().find(p => p.id === productId);
  if (!product) return;

  const sizeData = product.sizes[sizeKey] || Object.values(product.sizes)[0];
  const modal = document.getElementById("modalBody");
  if (modal) {
    const btns = modal.querySelectorAll('.size-btn');
    btns.forEach(b => {
      if (b.id === `modal-btn-${sizeKey}`) b.classList.add('active');
      else b.classList.remove('active');
    });

    const sizeTag = document.getElementById("modal-size-tag");
    if (sizeTag) sizeTag.textContent = sizeKey;

    const priceVal = document.getElementById("modal-price-val");
    if (priceVal) priceVal.textContent = sizeData.label;

    const waBtn = document.getElementById("modal-wa-btn");
    if (waBtn && product.in_stock !== false) {
      waBtn.href = buildWhatsAppUrl(product, sizeKey);
      const span = waBtn.querySelector('span');
      if (span) span.textContent = `Order via WhatsApp (${sizeKey})`;
    }
    const orderBtn = document.getElementById("modal-order-now-btn");
    if (orderBtn && product.in_stock !== false) {
      orderBtn.onclick = () => {
        closeModal();
        openCheckoutModal(product.id, sizeKey);
      };
      const span = orderBtn.querySelector('span');
      if (span) span.textContent = `Order Now - Cash on Delivery (${sizeKey})`;
    }
  }
}

function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ========================================================
// 3. STOREFRONT FILTERING & PACK BUILDER
// ========================================================

let currentCategory = "all";
let searchKeyword = "";

function applyFilters() {
  let list = getActiveCatalog();

  if (currentCategory === "authentic") {
    list = list.filter(p => p.category === "authentic");
  } else if (currentCategory === "inspired") {
    list = list.filter(p => p.category === "inspired");
  } else if (currentCategory === "packs") {
    list = list.filter(p => p.category === "inspired");
  } else if (currentCategory === "men") {
    list = list.filter(p => p.gender === "men");
  } else if (currentCategory === "women") {
    list = list.filter(p => p.gender === "women");
  } else if (currentCategory === "unisex") {
    list = list.filter(p => p.gender === "unisex");
  }

  if (searchKeyword.trim() !== "") {
    const term = searchKeyword.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      (p.accords && p.accords.some(a => a.toLowerCase().includes(term)))
    );
  }

  renderProducts(list);
}

// Discovery Pack Builder
let selectedPackTier = "3-pack";
const selectedScents = new Set();

function initPackBuilder() {
  const container = document.getElementById("packScentList");
  if (!container) return;

  const inspiredOnly = getActiveCatalog().filter(p => p.category === "inspired" && p.in_stock !== false);

  container.innerHTML = inspiredOnly.map(p => `
    <div class="pack-scent-item" id="scent-choice-${p.id}" onclick="toggleScentSelection('${p.id}')">
      <input type="checkbox" id="chk-${p.id}" style="pointer-events:none;">
      <div style="flex:1;">
        <div style="font-weight:600; color:#fff; font-size:0.85rem;">${p.name}</div>
        <div style="font-size:0.7rem; color:var(--text-muted);">${p.brand}</div>
      </div>
      <span class="pack-pill">15ml Spray</span>
    </div>
  `).join('');

  updatePackBuilderUI();
}

function selectPackTier(tier) {
  selectedPackTier = tier;
  const maxAllowed = tier === "3-pack" ? 3 : 5;
  
  if (selectedScents.size > maxAllowed) {
    selectedScents.clear();
  }

  const btn3 = document.getElementById("btnTier3");
  const btn5 = document.getElementById("btnTier5");
  if (tier === "3-pack") {
    btn3?.classList.add("active");
    btn5?.classList.remove("active");
  } else {
    btn5?.classList.add("active");
    btn3?.classList.remove("active");
  }

  updatePackBuilderUI();
}

function toggleScentSelection(productId) {
  const maxAllowed = selectedPackTier === "3-pack" ? 3 : 5;
  if (selectedScents.has(productId)) {
    selectedScents.delete(productId);
  } else {
    if (selectedScents.size >= maxAllowed) {
      alert(`ඔබ තෝරාගත් පැක් එකට උපරිම තෝරාගත හැක්කේ Perfumes ${maxAllowed}ක් පමණි. (Max ${maxAllowed} scents allowed)`);
      return;
    }
    selectedScents.add(productId);
  }

  updatePackBuilderUI();
}

function updatePackBuilderUI() {
  const maxAllowed = selectedPackTier === "3-pack" ? 3 : 5;
  const price = selectedPackTier === "3-pack" ? "Rs. 3,450" : "Rs. 5,250";
  const countSpan = document.getElementById("packCountLabel");
  const priceSpan = document.getElementById("packPriceLabel");
  const orderBtn = document.getElementById("btnOrderPack");

  if (countSpan) countSpan.textContent = `${selectedScents.size} / ${maxAllowed}`;
  if (priceSpan) priceSpan.textContent = price;

  const catalog = getActiveCatalog();
  catalog.filter(p => p.category === "inspired").forEach(p => {
    const itemEl = document.getElementById(`scent-choice-${p.id}`);
    const chk = document.getElementById(`chk-${p.id}`);
    if (itemEl && chk) {
      if (selectedScents.has(p.id)) {
        itemEl.classList.add("selected");
        chk.checked = true;
      } else {
        itemEl.classList.remove("selected");
        chk.checked = false;
      }
    }
  });

  if (orderBtn) {
    const chosenList = Array.from(selectedScents).map(id => {
      const p = catalog.find(item => item.id === id);
      return p ? p.name : id;
    });

    const isReady = selectedScents.size === maxAllowed;
    orderBtn.disabled = !isReady;
    
    if (isReady) {
      const packTitle = selectedPackTier === "3-pack" ? "3-Bottle Discovery Pack (15ml x 3)" : "5-Bottle Collector's Pack (15ml x 5)";
      const formattedList = chosenList.map((name, idx) => `  ${idx + 1}. ${name}`).join('\n');
      
      const msg = 
`🎁 *PIYORA - CUSTOM 15ML DISCOVERY PACK* 🎁
------------------------------------------
📦 *Selected Pack:* ${packTitle}
🚚 *Delivery:* ✅ FREE ISLANDWIDE DELIVERY
💰 *Special Pack Price:* ${price}
------------------------------------------
🧴 *My Selected Scents (15ml each):*
${formattedList}
------------------------------------------
👋 Hi Piyora! Here is my custom discovery set. Please confirm and dispatch via Cash on Delivery!`;

      const orderBtnWa = document.getElementById("btnOrderPackWa");
      if (orderBtnWa) {
        orderBtnWa.style.display = "flex";
        orderBtnWa.href = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(msg)}`;
        orderBtnWa.innerHTML = `
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
          <span>Order Pack via WhatsApp (${price} • Free Delivery)</span>
        `;
      }

      orderBtn.onclick = (e) => {
        e.preventDefault();
        openPackCheckoutModal();
      };
      orderBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <span>Order Now - Cash on Delivery (${price})</span>
      `;
      orderBtn.style.opacity = "1";
      orderBtn.style.pointerEvents = "auto";
    } else {
      const orderBtnWa = document.getElementById("btnOrderPackWa");
      if (orderBtnWa) orderBtnWa.style.display = "none";
      orderBtn.innerHTML = `<span>Select ${maxAllowed - selectedScents.size} more scent(s) to complete pack</span>`;
      orderBtn.style.opacity = "0.5";
      orderBtn.style.pointerEvents = "none";
    }
  }
}

// ========================================================
// 4. STOREFRONT DOM INITIALIZATION
// ========================================================

document.addEventListener("DOMContentLoaded", async () => {
  // If we are on index.html (storefront), initialize
  const grid = document.getElementById("productGrid");
  if (grid) {
    await loadCatalogData();
    await loadReviewsData();
    initStates();
    renderProducts(getActiveCatalog());
    initPackBuilder();
    renderStorefrontReviews();

    // Update WhatsApp links on page to match settings
    const currentNumber = getWhatsAppNumber();
    const chatBtns = document.querySelectorAll(".header-contact-btn, .hero-social-pill.wa");
    chatBtns.forEach(btn => {
      btn.href = `https://wa.me/${currentNumber}?text=${encodeURIComponent("Hi Piyora! I would like to inquire about your Decants and 15ml Perfume Packs.")}`;
    });
    const indicatorText = document.querySelector(".client-preview-badge strong");
    if (indicatorText) {
      indicatorText.textContent = `+${currentNumber.slice(0, 2)} ${currentNumber.slice(2, 4)} ${currentNumber.slice(4, 7)} ${currentNumber.slice(7)}`;
    }

    // Category Tabs
    const tabs = document.querySelectorAll(".filter-btn");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category");
        applyFilters();
      });
    });

    // Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchKeyword = e.target.value;
        applyFilters();
      });
    }

    // Modals
    const modalContainer = document.getElementById("modalContainer");
    if (modalContainer) {
      modalContainer.addEventListener("click", (e) => {
        if (e.target === modalContainer) closeModal();
      });
    }
    const checkoutModal = document.getElementById("checkoutModal");
    if (checkoutModal) {
      checkoutModal.addEventListener("click", (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        closeCheckoutModal();
      }
    });
  }
});
