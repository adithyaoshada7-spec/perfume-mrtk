-- ==============================================================
-- PIYORA PERFUMES - COMPLETE SUPABASE DATABASE SCHEMA
-- Compatible with multiple executions (Re-run safe / Idempotent)
-- ==============================================================

-- 1. Create perfumes table
CREATE TABLE IF NOT EXISTS public.perfumes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('authentic', 'inspired')),
  gender TEXT NOT NULL CHECK (gender IN ('men', 'women', 'unisex')),
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  badge TEXT NOT NULL,
  accords JSONB DEFAULT '[]'::jsonb,
  top_notes TEXT,
  heart_notes TEXT,
  base_notes TEXT,
  longevity TEXT,
  description TEXT,
  sizes JSONB NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure 'images' column exists if perfumes table was created earlier
ALTER TABLE public.perfumes ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- 2. Create site_settings table (for WhatsApp number & Admin PIN)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create orders table (Cash on Delivery orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_note TEXT,
  items JSONB NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'dispatched', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create reviews table (Customer feedback with attached screenshots)
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  city TEXT,
  perfume_name TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  screenshot_url TEXT,
  is_verified BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'hidden')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.perfumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies before creating them to avoid 42710 "already exists" errors
DROP POLICY IF EXISTS "Public Read Access on perfumes" ON public.perfumes;
DROP POLICY IF EXISTS "Public Write Access on perfumes" ON public.perfumes;

DROP POLICY IF EXISTS "Public Read Access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public Write Access on site_settings" ON public.site_settings;

DROP POLICY IF EXISTS "Public Insert Access on orders" ON public.orders;
DROP POLICY IF EXISTS "Public Read Access on orders" ON public.orders;
DROP POLICY IF EXISTS "Public Update Access on orders" ON public.orders;
DROP POLICY IF EXISTS "Public Delete Access on orders" ON public.orders;

DROP POLICY IF EXISTS "Public Read Access on reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public Insert Access on reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public Write Access on reviews" ON public.reviews;

-- 7. Create clean idempotent policies
-- Perfumes: Public Read and Full Write (via Admin PIN)
CREATE POLICY "Public Read Access on perfumes" 
  ON public.perfumes FOR SELECT 
  USING (true);

CREATE POLICY "Public Write Access on perfumes" 
  ON public.perfumes FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Site Settings: Public Read and Full Write
CREATE POLICY "Public Read Access on site_settings" 
  ON public.site_settings FOR SELECT 
  USING (true);

CREATE POLICY "Public Write Access on site_settings" 
  ON public.site_settings FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Orders: Customers can insert orders; Store Admin can read, update status, and manage orders
CREATE POLICY "Public Insert Access on orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public Read Access on orders" 
  ON public.orders FOR SELECT 
  USING (true);

CREATE POLICY "Public Update Access on orders" 
  ON public.orders FOR UPDATE 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public Delete Access on orders" 
  ON public.orders FOR DELETE 
  USING (true);

-- Reviews: Customers can read and submit; Admin can manage all
CREATE POLICY "Public Read Access on reviews" 
  ON public.reviews FOR SELECT 
  USING (true);

CREATE POLICY "Public Insert Access on reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public Write Access on reviews" 
  ON public.reviews FOR ALL 
  USING (true)
  WITH CHECK (true);

-- 7. Seed Initial Settings
INSERT INTO public.site_settings (key, value) VALUES
  ('whatsapp_number', '94786623081'),
  ('admin_pin', '7120')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 8. Seed Initial Perfume Catalog (with multi-image support)
INSERT INTO public.perfumes 
  (id, name, brand, category, gender, image, images, badge, accords, top_notes, heart_notes, base_notes, longevity, description, sizes, in_stock, display_order)
VALUES
  (
    'auth-aventus',
    'Creed Aventus (Authentic Decant)',
    'Creed Paris • 100% Genuine',
    'authentic',
    'men',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    '100% Authentic Decant',
    '["Smoky Pineapple", "Birch", "Ambergris"]'::jsonb,
    'Bergamot, Blackcurrant, Apple, Pineapple',
    'Birch, Patchouli, Moroccan Jasmine, Rose',
    'Musk, Oakmoss, Ambergris, Vanille',
    '14h+ Pure Extract',
    'Decanted directly from a genuine Creed Aventus flacon with verified batch code. Supplied in a leakproof luxury glass spray atomizer.',
    '{"5ml Decant": {"price": 3850, "label": "Rs. 3,850", "sprayCount": "~70 Sprays"}, "10ml Decant": {"price": 6900, "label": "Rs. 6,900", "sprayCount": "~140 Sprays"}}'::jsonb,
    true,
    1
  ),
  (
    'auth-sauvage',
    'Dior Sauvage Elixir (Authentic Decant)',
    'Dior Paris • 100% Genuine',
    'authentic',
    'men',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    '100% Authentic Decant',
    '["Warm Spicy", "Lavender", "Licorice Wood"]'::jsonb,
    'Cinnamon, Nutmeg, Cardamom, Grapefruit',
    'Lavender of Nyons',
    'Licorice, Sandalwood, Amber, Patchouli, Vetiver',
    '18h+ Extreme Beast',
    'The most potent designer fragrance in modern history. Decanted straight from official sealed Dior retail bottles.',
    '{"5ml Decant": {"price": 3200, "label": "Rs. 3,200", "sprayCount": "~70 Sprays"}, "10ml Decant": {"price": 5850, "label": "Rs. 5,850", "sprayCount": "~140 Sprays"}}'::jsonb,
    true,
    2
  ),
  (
    'auth-bleu',
    'Bleu de Chanel Parfum (Authentic Decant)',
    'Chanel Paris • 100% Genuine',
    'authentic',
    'men',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    '100% Authentic Decant',
    '["Woody Aromatic", "Cedar", "Sandalwood"]'::jsonb,
    'Lemon Zest, Bergamot, Mint, Artemisia',
    'Lavender, Geranium, Green Notes, Pineapple',
    'New Caledonian Sandalwood, Cedar, Amberwood',
    '12h+ Elegant Trail',
    'The gold standard of masculine sophistication. Genuine Chanel Parfum extract decanted into premium pocket travel sprayers.',
    '{"5ml Decant": {"price": 2950, "label": "Rs. 2,950", "sprayCount": "~70 Sprays"}, "10ml Decant": {"price": 5400, "label": "Rs. 5,400", "sprayCount": "~140 Sprays"}}'::jsonb,
    true,
    3
  ),
  (
    'auth-tf-orchid',
    'Tom Ford Black Orchid (Authentic Decant)',
    'Tom Ford • 100% Genuine',
    'authentic',
    'unisex',
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    '100% Authentic Decant',
    '["Dark Florals", "Black Truffle", "Rich Patchouli"]'::jsonb,
    'Truffle, Gardenia, Blackcurrant, Ylang-Ylang',
    'Orchid, Spicy Notes, Fruity Notes, Lotus',
    'Mexican Chocolate, Patchouli, Vanille, Incense, Amber',
    '16h+ Iconic Sillage',
    'Opulent and sensual dark classic. Batch verified original Tom Ford EDP in glass decant format.',
    '{"5ml Decant": {"price": 3400, "label": "Rs. 3,400", "sprayCount": "~70 Sprays"}, "10ml Decant": {"price": 6200, "label": "Rs. 6,200", "sprayCount": "~140 Sprays"}}'::jsonb,
    true,
    4
  ),
  (
    'insp-aventus',
    'Imperial Aventus 15ml',
    'Inspired by Creed Aventus',
    'inspired',
    'men',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    'Inspired • 15ml Luxury',
    '["Smoky Pineapple", "Rich Birch", "Clean Musk"]'::jsonb,
    'Pineapple, Bergamot, Apple',
    'Birch, Patchouli, Jasmine',
    'Musk, Ambergris, Oakmoss',
    '12h-14h Lasting',
    'Our signature French oil recreation of Creed Aventus in convenient 15ml luxury pocket sprayer. Available as single or in multi-packs with Free Delivery.',
    '{"Single 15ml": {"desc": "1x 15ml Bottle", "label": "Rs. 1,250", "price": 1250, "freeDelivery": false}, "3-Pack (3x15ml)": {"desc": "3x 15ml Set (Save Rs. 300 + Free Delivery)", "label": "Rs. 3,450", "price": 3450, "freeDelivery": true}, "5-Pack (5x15ml)": {"desc": "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)", "label": "Rs. 5,250", "price": 5250, "freeDelivery": true}}'::jsonb,
    true,
    5
  ),
  (
    'insp-rouge540',
    'Rouge Crystal 540 15ml',
    'Inspired by Baccarat Rouge 540',
    'inspired',
    'unisex',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    'Inspired • 15ml Luxury',
    '["Saffron Sweetness", "Warm Amber", "Cedarwood"]'::jsonb,
    'Saffron, Jasmine Sambac',
    'Amberwood, Ambergris',
    'Fir Resin, Cedar',
    '16h+ Beast Mode',
    'The viral scent of sweet amber and saffron. High French oil concentration in 15ml atomizer.',
    '{"Single 15ml": {"desc": "1x 15ml Bottle", "label": "Rs. 1,250", "price": 1250, "freeDelivery": false}, "3-Pack (3x15ml)": {"desc": "3x 15ml Set (Save Rs. 300 + Free Delivery)", "label": "Rs. 3,450", "price": 3450, "freeDelivery": true}, "5-Pack (5x15ml)": {"desc": "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)", "label": "Rs. 5,250", "price": 5250, "freeDelivery": true}}'::jsonb,
    true,
    6
  ),
  (
    'insp-sauvage',
    'Sauvage Noir Elixir 15ml',
    'Inspired by Dior Sauvage Elixir',
    'inspired',
    'men',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    'Inspired • 15ml Luxury',
    '["Nutmeg & Cinnamon", "Lavender", "Dark Woods"]'::jsonb,
    'Cinnamon, Nutmeg, Cardamom',
    'French Lavender',
    'Sandalwood, Amber, Licorice',
    '16h+ Extreme Longevity',
    'Deep spicy nocturnal formulation. Intense compliment puller in travel-friendly 15ml bottle.',
    '{"Single 15ml": {"desc": "1x 15ml Bottle", "label": "Rs. 1,250", "price": 1250, "freeDelivery": false}, "3-Pack (3x15ml)": {"desc": "3x 15ml Set (Save Rs. 300 + Free Delivery)", "label": "Rs. 3,450", "price": 3450, "freeDelivery": true}, "5-Pack (5x15ml)": {"desc": "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)", "label": "Rs. 5,250", "price": 5250, "freeDelivery": true}}'::jsonb,
    true,
    7
  ),
  (
    'insp-libre',
    'Golden Libre Intense 15ml',
    'Inspired by YSL Libre Intense',
    'inspired',
    'women',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    'Inspired • 15ml Luxury',
    '["Orange Blossom", "Vanilla Orchid", "Lavender"]'::jsonb,
    'Mandarin, Bergamot, Lavender',
    'Orange Blossom, Jasmine Sambac',
    'Madagascar Vanilla, Ambergris, Tonka',
    '14h+ Lasting',
    'Seductive warm floral vanilla for independent women. Perfect for handbags or 3-pack gifting sets.',
    '{"Single 15ml": {"desc": "1x 15ml Bottle", "label": "Rs. 1,250", "price": 1250, "freeDelivery": false}, "3-Pack (3x15ml)": {"desc": "3x 15ml Set (Save Rs. 300 + Free Delivery)", "label": "Rs. 3,450", "price": 3450, "freeDelivery": true}, "5-Pack (5x15ml)": {"desc": "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)", "label": "Rs. 5,250", "price": 5250, "freeDelivery": true}}'::jsonb,
    true,
    8
  ),
  (
    'insp-tobacco-vanille',
    'Tobacco & Warm Vanille 15ml',
    'Inspired by Tom Ford Tobacco Vanille',
    'inspired',
    'unisex',
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80',
    '["https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=700&q=80", "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80"]'::jsonb,
    'Inspired • 15ml Luxury',
    '["Warm Tobacco", "Rich Vanilla", "Spicy Cacao"]'::jsonb,
    'Tobacco Leaf, Spicy Notes',
    'Tonka Bean, Tobacco Blossom, Vanilla, Cacao',
    'Dry Fruit Accord, Woody Notes',
    '16h+ Rich Scent',
    'Opulent and warm holiday sensation. Cozy sweet tobacco and vanilla aroma in sleek 15ml sprayer.',
    '{"Single 15ml": {"desc": "1x 15ml Bottle", "label": "Rs. 1,250", "price": 1250, "freeDelivery": false}, "3-Pack (3x15ml)": {"desc": "3x 15ml Set (Save Rs. 300 + Free Delivery)", "label": "Rs. 3,450", "price": 3450, "freeDelivery": true}, "5-Pack (5x15ml)": {"desc": "5x 15ml Full Set (Save Rs. 1,000 + Free Delivery)", "label": "Rs. 5,250", "price": 5250, "freeDelivery": true}}'::jsonb,
    true,
    9
  )
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image,
  images = COALESCE(EXCLUDED.images, public.perfumes.images);
