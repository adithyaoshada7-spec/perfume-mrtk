/**
 * LUXURY PERFUME SHOWCASE - APP ENGINE
 * Features:
 * - Dynamic 50ml / 100ml reactive price switcher
 * - WhatsApp 1-Click Smart Message Generation with Product Name, Size & Price
 * - Quick Category & Search Filter
 * - Fragrance Detail Modal with Top/Heart/Base pyramid notes
 * - Instant zero-latency UI
 */

// Client WhatsApp number from chat: +94 71 712 2081
let currentWhatsAppNumber = "94717122081";

// Perfume Catalog Curated for Sri Lankan "Inspired & Authentic" Market
const PERFUME_CATALOG = [
  {
    id: "aventus-imp",
    name: "Imperial Aventus",
    brand: "Inspired by Creed Aventus",
    type: "inspired", // 'inspired' or 'authentic'
    category: "men",
    badge: "Bestseller Inspired",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
    accords: ["Fruity", "Smoky Birch", "Rich Musk"],
    topNotes: "Pineapple, Bergamot, Blackcurrant, Apple",
    heartNotes: "Birch, Patchouli, Moroccan Jasmine, Rose",
    baseNotes: "Musk, Oakmoss, Ambergris, Vanille",
    longevity: "14h+ Long Lasting",
    sillage: "Strong (Enormous)",
    description: "The ultimate king of masculine prestige. Crisp smoky pineapple blended with birch and rich ambergris. Our highest oil concentration formulation.",
    sizes: {
      "50ml": { priceLkr: 4850, label: "Rs. 4,850" },
      "100ml": { priceLkr: 7450, label: "Rs. 7,450" }
    },
    defaultSize: "100ml"
  },
  {
    id: "rouge-540",
    name: "Rouge Crystal 540",
    brand: "Inspired by Baccarat Rouge 540",
    type: "inspired",
    category: "unisex",
    badge: "Ultra Luxury Inspired",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80",
    accords: ["Warm Amber", "Sweet Saffron", "Cedarwood"],
    topNotes: "Saffron, Jasmine Sambac",
    heartNotes: "Amberwood, Ambergris",
    baseNotes: "Fir Resin, Cedar",
    longevity: "16h+ Beast Mode",
    sillage: "Hypnotic Trail",
    description: "An intoxicating airy sweetness that fills any room. Saffron and warm amberwood radiating pure wealth and elegance.",
    sizes: {
      "50ml": { priceLkr: 5200, label: "Rs. 5,200" },
      "100ml": { priceLkr: 7900, label: "Rs. 7,900" }
    },
    defaultSize: "100ml"
  },
  {
    id: "sauvage-elixir",
    name: "Sauvage Noir Elixir",
    brand: "Inspired by Dior Sauvage Elixir",
    type: "inspired",
    category: "men",
    badge: "Night Magnet",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80",
    accords: ["Warm Spicy", "Lavender", "Licorice Wood"],
    topNotes: "Cinnamon, Nutmeg, Cardamom, Grapefruit",
    heartNotes: "Lavender of Nyons",
    baseNotes: "Licorice, Sandalwood, Amber, Patchouli, Vetiver",
    longevity: "18h+ Extreme Longevity",
    sillage: "Potent Projection",
    description: "Ultra-concentrated blend of nocturnal spices and intoxicating French lavender. Commands attention instantly.",
    sizes: {
      "50ml": { priceLkr: 4950, label: "Rs. 4,950" },
      "100ml": { priceLkr: 7650, label: "Rs. 7,650" }
    },
    defaultSize: "100ml"
  },
  {
    id: "libre-femme",
    name: "Golden Libre Intense",
    brand: "Inspired by YSL Libre Intense",
    type: "inspired",
    category: "women",
    badge: "Feminine Power",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80",
    accords: ["Orange Blossom", "Vanilla Orchid", "Lavender"],
    topNotes: "Mandarin Oil, Lavender Essence, Bergamot",
    heartNotes: "Orange Blossom, Jasmine Sambac, Orchid",
    baseNotes: "Madagascar Vanilla, Tonka Bean, Ambergris",
    longevity: "12h+ Lasting",
    sillage: "Elegant & Seductive",
    description: "The essence of feminine freedom and supreme confidence. Golden floral heart with warm Madagascar vanilla.",
    sizes: {
      "50ml": { priceLkr: 4750, label: "Rs. 4,750" },
      "100ml": { priceLkr: 7200, label: "Rs. 7,200" }
    },
    defaultSize: "50ml"
  },
  {
    id: "auth-bleu-chanel",
    name: "Bleu de Chanel Parfum",
    brand: "Chanel Paris (Authentic)",
    type: "authentic",
    category: "men",
    badge: "100% Authentic Original",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
    accords: ["Woody Aromatic", "Citrus", "New Caledonian Sandalwood"],
    topNotes: "Lemon Zest, Bergamot, Mint, Artemisia",
    heartNotes: "Lavender, Geranium, Green Notes, Pineapple",
    baseNotes: "Sandalwood, Cedar, Amberwood, Iso E Super, Tonka",
    longevity: "14h+ Authentic Longevity",
    sillage: "Subtle Luxury",
    description: "Direct import authentic original sealed box with batch code verification. The timeless aromatic signature.",
    sizes: {
      "50ml": { priceLkr: 42000, label: "Rs. 42,000" },
      "100ml": { priceLkr: 58500, label: "Rs. 58,500" }
    },
    defaultSize: "100ml"
  },
  {
    id: "auth-black-orchid",
    name: "Black Orchid Eau de Parfum",
    brand: "Tom Ford (Authentic)",
    type: "authentic",
    category: "unisex",
    badge: "100% Authentic Original",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80",
    accords: ["Black Truffle", "Dark Florals", "Patchouli"],
    topNotes: "Black Truffle, Ylang-Ylang, Bergamot, Blackcurrant",
    heartNotes: "Black Orchid, Lotus Wood, Floral Accords",
    baseNotes: "Patchouli, Incense, Vetiver, Vanilla, Balsam",
    longevity: "16h+ Authentic Longevity",
    sillage: "Iconic Room-Filler",
    description: "Opulent, dark and daring. Genuine original box with official batch number, verified for discerning collectors.",
    sizes: {
      "50ml": { priceLkr: 46000, label: "Rs. 46,000" },
      "100ml": { priceLkr: 64500, label: "Rs. 64,500" }
    },
    defaultSize: "100ml"
  }
];

// State storage for selected sizes per product card
const productState = {};

/**
 * Initialize product states
 */
function initProductStates() {
  PERFUME_CATALOG.forEach(p => {
    productState[p.id] = {
      selectedSize: p.defaultSize || "100ml"
    };
  });
}

/**
 * Build WhatsApp click URL with encoded custom message
 * Requirements met: Name, Size (50ml/100ml), and Price included automatically
 */
function buildWhatsAppUrl(product, size) {
  const sizeData = product.sizes[size];
  const typeLabel = product.type === "authentic" ? "100% Authentic Original" : "Premium Inspired Edition";
  
  const text = 
`✨ *NEW ORDER ENQUIRY* ✨
-------------------------------------
🧴 *Perfume:* ${product.name}
🏷️ *Brand / Style:* ${product.brand} (${typeLabel})
📦 *Selected Size:* ${size}
💰 *Price:* ${sizeData.label}
-------------------------------------
👋 Hi! I found this on your online catalog and would like to place an order.
📍 Please confirm availability and delivery timeframe to my address.`;

  return `https://wa.me/${currentWhatsAppNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Render the product cards into the grid
 */
function renderCatalog(items) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">සොයන ලද සුවඳ විලවුන් වර්ගය හමු නොවීය.</p>
        <p style="font-size: 0.85rem;">No matching fragrances found. Try a different search term or category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(p => {
    const activeSize = productState[p.id]?.selectedSize || p.defaultSize;
    const sizeData = p.sizes[activeSize];
    const badgeClass = p.type === "authentic" ? "badge-authentic" : "badge-inspired";

    return `
      <div class="product-card" id="card-${p.id}" data-id="${p.id}">
        <div class="card-media" onclick="openProductModal('${p.id}')">
          <span class="type-badge ${badgeClass}">${p.badge}</span>
          <span class="longevity-badge">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>
            ${p.longevity}
          </span>
          <button class="quick-view-btn" title="Quick Notes & Details" onclick="event.stopPropagation(); openProductModal('${p.id}')">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
        </div>

        <div class="card-content">
          <div class="card-brand">${p.brand}</div>
          <h3 class="card-title">${p.name}</h3>
          <p class="card-subtitle">${p.sillage}</p>

          <div class="accords-preview">
            ${p.accords.map(a => `<span class="accord-tag">${a}</span>`).join('')}
          </div>

          <div class="size-selector-label">
            <span>තෝරාගත් ප්රමාණය (Size):</span>
            <span id="selected-label-${p.id}" style="color: var(--accent-gold); font-weight: 600;">${activeSize}</span>
          </div>

          <div class="size-options">
            ${Object.keys(p.sizes).map(sizeKey => `
              <button 
                type="button"
                class="size-btn ${sizeKey === activeSize ? 'active' : ''}"
                onclick="switchCardSize('${p.id}', '${sizeKey}')"
              >
                ${sizeKey}
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
 * Handle size toggle on card
 */
function switchCardSize(productId, sizeKey) {
  const product = PERFUME_CATALOG.find(p => p.id === productId);
  if (!product) return;

  // Update state
  productState[productId].selectedSize = sizeKey;

  // Update DOM elements for this card
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    // Update active button styling
    const sizeBtns = card.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
      if (btn.textContent.trim() === sizeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update label
    const label = document.getElementById(`selected-label-${productId}`);
    if (label) label.textContent = sizeKey;

    // Update price
    const priceVal = document.getElementById(`price-val-${productId}`);
    if (priceVal) priceVal.textContent = product.sizes[sizeKey].label;

    // Update WhatsApp link immediately
    const waBtn = document.getElementById(`wa-btn-${productId}`);
    if (waBtn) waBtn.href = buildWhatsAppUrl(product, sizeKey);
  }
}

/**
 * Open Modal with Fragrance Notes Pyramid & Details
 */
function openProductModal(productId) {
  const product = PERFUME_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const currentSize = productState[productId]?.selectedSize || product.defaultSize;
  const sizeData = product.sizes[currentSize];

  const modalContainer = document.getElementById("modalContainer");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-col">
        <img class="modal-img" src="${product.image}" alt="${product.name}">
        <span class="type-badge ${product.type === 'authentic' ? 'badge-authentic' : 'badge-inspired'}" style="top:1.25rem; left:1.25rem;">
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

        <div style="display: flex; gap: 1rem; margin-bottom: 1.25rem; font-size: 0.8rem;">
          <div><strong style="color: var(--accent-gold);">Longevity:</strong> <span style="color: #fff;">${product.longevity}</span></div>
          <div><strong style="color: var(--accent-gold);">Sillage:</strong> <span style="color: #fff;">${product.sillage}</span></div>
        </div>

        <div class="size-selector-label">
          <span>තෝරාගත හැකි ප්රමාණ (Available Sizes):</span>
        </div>
        <div class="size-options" style="margin-bottom: 1.5rem;">
          ${Object.keys(product.sizes).map(s => `
            <button 
              type="button" 
              class="size-btn ${s === currentSize ? 'active' : ''}" 
              id="modal-size-btn-${s}"
              onclick="switchModalSize('${product.id}', '${s}')"
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

/**
 * Handle size toggle inside modal
 */
function switchModalSize(productId, sizeKey) {
  switchCardSize(productId, sizeKey);
  const product = PERFUME_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const sizeData = product.sizes[sizeKey];

  // Update modal active button
  const modal = document.getElementById("modalBody");
  if (modal) {
    const btns = modal.querySelectorAll('.size-btn');
    btns.forEach(b => {
      if (b.id === `modal-size-btn-${sizeKey}`) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
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

/**
 * Close Modal
 */
function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/**
 * Filter Catalog based on tab and search keyword
 */
let activeCategory = "all";
let currentSearchTerm = "";

function filterCatalog() {
  let filtered = PERFUME_CATALOG;

  // Category filter
  if (activeCategory === "inspired") {
    filtered = filtered.filter(p => p.type === "inspired");
  } else if (activeCategory === "authentic") {
    filtered = filtered.filter(p => p.type === "authentic");
  } else if (activeCategory === "men") {
    filtered = filtered.filter(p => p.category === "men");
  } else if (activeCategory === "women") {
    filtered = filtered.filter(p => p.category === "women");
  } else if (activeCategory === "unisex") {
    filtered = filtered.filter(p => p.category === "unisex");
  }

  // Search filter
  if (currentSearchTerm.trim() !== "") {
    const term = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.topNotes.toLowerCase().includes(term) ||
      p.accords.some(a => a.toLowerCase().includes(term))
    );
  }

  renderCatalog(filtered);
}

/**
 * Setup Event Listeners
 */
document.addEventListener("DOMContentLoaded", () => {
  initProductStates();
  renderCatalog(PERFUME_CATALOG);

  // Category Tab clicks
  const tabButtons = document.querySelectorAll(".filter-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      filterCatalog();
    });
  });

  // Search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      filterCatalog();
    });
  }

  // Modal backdrop click to close
  const modalContainer = document.getElementById("modalContainer");
  if (modalContainer) {
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        closeModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
