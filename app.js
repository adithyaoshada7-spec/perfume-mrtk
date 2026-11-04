/**
 * LUXURY PERFUME SHOWCASE & ORDER ENGINE
 * Client Custom Model:
 * 1. Authentic Perfumes -> 5ml & 10ml Decants
 * 2. Inspired Perfumes -> 15ml Luxury Minis (Single, 3-Pack, 5-Pack) with FREE DELIVERY on packs!
 * 3. Interactive Custom Discovery Pack Builder (15ml x 3 / 15ml x 5)
 */

const WHATSAPP_NUMBER = "94786623081";

// 1. AUTHENTIC DECANTS CATALOG (5ml & 10ml)
const AUTHENTIC_DECANTS = [
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
    defaultSize: "10ml Decant"
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
    defaultSize: "10ml Decant"
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
    defaultSize: "10ml Decant"
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
    defaultSize: "10ml Decant"
  }
];

// 2. INSPIRED 15ML PERFUMES & BUNDLES (Single 15ml, 3-Pack, 5-Pack)
const INSPIRED_PERFUMES = [
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
    defaultSize: "3-Pack (3x15ml)"
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
    defaultSize: "3-Pack (3x15ml)"
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
    defaultSize: "5-Pack (5x15ml)"
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
    defaultSize: "Single 15ml"
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
    defaultSize: "3-Pack (3x15ml)"
  }
];

// Unified catalog
const ALL_PRODUCTS = [...AUTHENTIC_DECANTS, ...INSPIRED_PERFUMES];

// State per card
const cardStates = {};

function initStates() {
  ALL_PRODUCTS.forEach(p => {
    cardStates[p.id] = {
      selectedSize: p.defaultSize
    };
  });
}

/**
 * WhatsApp Order URL Builder
 */
function buildWhatsAppUrl(product, sizeKey) {
  const sizeData = product.sizes[sizeKey];
  const isAuthentic = product.category === "authentic";

  let text = "";
  if (isAuthentic) {
    text = 
`💎 *AUTHENTIC DECANT ORDER ENQUIRY* 💎
------------------------------------------
🧴 *Perfume:* ${product.name}
🏷️ *Brand:* ${product.brand}
🔬 *Selected Decant Size:* ${sizeKey} (${sizeData.sprayCount || ''})
💰 *Price:* ${sizeData.label}
------------------------------------------
👋 Hi! I would like to order this 100% Authentic Original Decant.
📍 Please confirm availability and cash-on-delivery details to my address.`;
  } else {
    const freeDeliveryNotice = sizeData.freeDelivery ? "✅ FREE ISLANDWIDE DELIVERY INCLUDED!" : "Standard islandwide delivery";
    text = 
`👑 *INSPIRED 15ML PERFUME ORDER* 👑
------------------------------------------
🧴 *Perfume / Scent:* ${product.name}
🏷️ *Inspired By:* ${product.brand}
📦 *Selection:* ${sizeKey} (${sizeData.desc || '15ml Bottle'})
🚚 *Delivery:* ${freeDeliveryNotice}
💰 *Total Price:* ${sizeData.label}
------------------------------------------
👋 Hi! I would like to order this 15ml Inspired perfume selection.
📍 Please confirm dispatch & delivery timeframe!`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Render Catalog Grid
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
    const activeSize = cardStates[p.id]?.selectedSize || p.defaultSize;
    const sizeData = p.sizes[activeSize];
    const isAuthentic = p.category === "authentic";
    const badgeClass = isAuthentic ? "badge-authentic" : "badge-inspired";

    const hasFreeDelivery = sizeData.freeDelivery === true;

    return `
      <div class="product-card" id="card-${p.id}">
        <div class="card-media" onclick="openDetailsModal('${p.id}')">
          <span class="type-badge ${badgeClass}">${p.badge}</span>
          ${hasFreeDelivery ? '<span class="free-shipping-tag">🚚 FREE DELIVERY</span>' : ''}
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
            ${p.accords.map(a => `<span class="accord-tag">${a}</span>`).join('')}
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
                <span class="stock-dot"></span> In Stock
              </div>
            </div>

            <a 
              href="${buildWhatsAppUrl(p, activeSize)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-whatsapp-order" 
              id="wa-btn-${p.id}"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Handle Card Size Toggle
 */
function changeCardSize(productId, sizeKey) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
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

    const priceVal = document.getElementById(`price-val-${productId}`);
    if (priceVal) priceVal.textContent = product.sizes[sizeKey].label;

    const waBtn = document.getElementById(`wa-btn-${productId}`);
    if (waBtn) waBtn.href = buildWhatsAppUrl(product, sizeKey);
  }
}

/**
 * Modal View
 */
function openDetailsModal(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentSize = cardStates[productId]?.selectedSize || product.defaultSize;
  const sizeData = product.sizes[currentSize];
  const isAuthentic = product.category === "authentic";

  const modalContainer = document.getElementById("modalContainer");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-col">
        <img class="modal-img" src="${product.image}" alt="${product.name}">
        <span class="type-badge ${isAuthentic ? 'badge-authentic' : 'badge-inspired'}" style="top:1.25rem; left:1.25rem;">
          ${product.badge}
        </span>
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
            ${sizeData.freeDelivery ? '<div style="font-size:0.75rem; color:#4ade80; font-weight:600; margin-top:2px;">✨ Free Islandwide Delivery Included!</div>' : ''}
          </div>
          <div class="stock-indicator">
            <span class="stock-dot"></span> Ready to Dispatch
          </div>
        </div>

        <a 
          href="${buildWhatsAppUrl(product, currentSize)}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-whatsapp-order" 
          id="modal-wa-btn"
          style="padding: 0.9rem 1.5rem; font-size: 0.95rem;"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
          <span>Order via WhatsApp (${currentSize})</span>
        </a>
      </div>
    </div>
  `;

  modalContainer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeModalSize(productId, sizeKey) {
  changeCardSize(productId, sizeKey);
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const sizeData = product.sizes[sizeKey];
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
    if (waBtn) {
      waBtn.href = buildWhatsAppUrl(product, sizeKey);
      waBtn.querySelector('span').textContent = `Order via WhatsApp (${sizeKey})`;
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

// Filter logic
let currentCategory = "all";
let searchKeyword = "";

function applyFilters() {
  let list = ALL_PRODUCTS;

  if (currentCategory === "authentic") {
    list = list.filter(p => p.category === "authentic");
  } else if (currentCategory === "inspired") {
    list = list.filter(p => p.category === "inspired");
  } else if (currentCategory === "packs") {
    // Show inspired packs
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
      p.accords.some(a => a.toLowerCase().includes(term))
    );
  }

  renderProducts(list);
}

// 3. INTERACTIVE DISCOVERY PACK BUILDER LOGIC (15ml x 3 or 15ml x 5)
let selectedPackTier = "3-pack"; // "3-pack" (Rs. 3,450) or "5-pack" (Rs. 5,250)
const selectedScents = new Set();

function initPackBuilder() {
  const container = document.getElementById("packScentList");
  if (!container) return;

  container.innerHTML = INSPIRED_PERFUMES.map(p => `
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
  
  // If more selected than allowed, trim
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
      alert(`ඔබ තෝරාගත් පැක් එකට උපරිම තෝරාගත හැක්කේ Perfumes ${maxAllowed}ක් පමණි. (Max ${maxAllowed} scents allowed for this pack)`);
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

  // Highlight items
  INSPIRED_PERFUMES.forEach(p => {
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
      const p = INSPIRED_PERFUMES.find(item => item.id === id);
      return p ? p.name : id;
    });

    const isReady = selectedScents.size === maxAllowed;
    orderBtn.disabled = !isReady;
    
    if (isReady) {
      const packTitle = selectedPackTier === "3-pack" ? "3-Bottle Discovery Pack (15ml x 3)" : "5-Bottle Collector's Pack (15ml x 5)";
      const formattedList = chosenList.map((name, idx) => `  ${idx + 1}. ${name}`).join('\n');
      
      const msg = 
`🎁 *CUSTOM 15ML DISCOVERY PACK ORDER* 🎁
------------------------------------------
📦 *Selected Pack:* ${packTitle}
🚚 *Delivery:* ✅ FREE ISLANDWIDE DELIVERY
💰 *Special Pack Price:* ${price}
------------------------------------------
🧴 *My Selected Scents (15ml each):*
${formattedList}
------------------------------------------
👋 Hi! Here is my custom discovery set. Please confirm and dispatch via Cash on Delivery!`;

      orderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      orderBtn.innerHTML = `
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.585 1.761.884 2.792.884l.006-.001c3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.769-5.766-5.769zm3.375 8.167c-.145.408-.847.785-1.18.835-.327.05-.75.074-2.155-.508-1.796-.745-2.955-2.57-3.044-2.691-.089-.12-1.745-2.324-1.745-4.433 0-2.11 1.104-3.144 1.498-3.555.394-.411.859-.514 1.146-.514.286 0 .573.003.824.015.267.013.626-.101.979.745.367.881 1.254 3.064 1.362 3.285.108.22.18.479.036.768-.144.288-.216.468-.432.72-.216.252-.455.563-.65.755-.216.216-.441.451-.19.882.252.432 1.121 1.849 2.404 2.993 1.65 1.472 3.042 1.928 3.474 2.144.432.216.684.18.936-.108.252-.288 1.077-1.258 1.364-1.69.287-.432.573-.36.967-.216.394.144 2.502 1.179 2.932 1.395.43.216.717.324.824.504.108.18.108 1.044-.216 1.452z"/></svg>
        <span>Order Custom Pack via WhatsApp (${price} • Free Delivery)</span>
      `;
      orderBtn.style.opacity = "1";
      orderBtn.style.pointerEvents = "auto";
    } else {
      orderBtn.href = "#";
      orderBtn.innerHTML = `<span>Select ${maxAllowed - selectedScents.size} more scent(s) to complete pack</span>`;
      orderBtn.style.opacity = "0.5";
      orderBtn.style.pointerEvents = "none";
    }
  }
}

// Setup
document.addEventListener("DOMContentLoaded", () => {
  initStates();
  renderProducts(ALL_PRODUCTS);
  initPackBuilder();

  // Tabs
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

  // Modal
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
