-- FashionKas Supabase Schema v1.2
-- Run this via Supabase SQL Editor or REST API

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  city TEXT DEFAULT '',
  description TEXT DEFAULT '',
  subscription_tier TEXT DEFAULT 'beta',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'lainnya',
  price INTEGER NOT NULL DEFAULT 0,
  cost_price INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  sizes JSONB DEFAULT '[]',
  colors JSONB DEFAULT '[]',
  image_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  total_sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  customer_name TEXT DEFAULT 'Walk-in Customer',
  customer_phone TEXT DEFAULT '',
  total_amount INTEGER DEFAULT 0,
  total_profit INTEGER DEFAULT 0,
  discount INTEGER DEFAULT 0,
  shipping_cost INTEGER DEFAULT 0,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  shipping_status TEXT DEFAULT 'pending',
  tracking_number TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price INTEGER DEFAULT 0,
  cost_price INTEGER DEFAULT 0,
  size TEXT DEFAULT '',
  color TEXT DEFAULT '',
  subtotal INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_orders INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  segment TEXT DEFAULT 'new',
  last_order_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WhatsApp Messages log table (NEW v1.2)
CREATE TABLE IF NOT EXISTS wa_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  phone TEXT NOT NULL DEFAULT '',
  message_type TEXT NOT NULL DEFAULT 'receipt',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  fonnte_response JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_customers_store_id ON customers(store_id);
CREATE INDEX IF NOT EXISTS idx_stores_slug ON stores(slug);
CREATE INDEX IF NOT EXISTS idx_stores_phone ON stores(owner_phone);
CREATE INDEX IF NOT EXISTS idx_wa_messages_store_id ON wa_messages(store_id);
CREATE INDEX IF NOT EXISTS idx_wa_messages_created ON wa_messages(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE wa_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for service_role access (our API uses service_role key)
CREATE POLICY "Service role access stores" ON stores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access wa_messages" ON wa_messages FOR ALL USING (true) WITH CHECK (true);
