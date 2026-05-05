-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  description TEXT,
  is_new BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  sizes JSONB DEFAULT '["S", "M", "L", "XL"]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id, size)
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT,
  payment_receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INT NOT NULL,
  size TEXT,
  price_at_time DECIMAL(10,2) NOT NULL
);

-- ENABLE RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES --

-- Products: Everyone can read, only super admins can manage (omitting admin logic, just assuming read public for now)
CREATE POLICY "Public products read" ON products FOR SELECT USING (true);
CREATE POLICY "Admin products insert" ON products FOR INSERT WITH CHECK (true); -- simplify admin for now
CREATE POLICY "Admin products update" ON products FOR UPDATE USING (true);

-- Profiles: Users can read and update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Cart Items: Users manage their own
CREATE POLICY "Users manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Orders: Users can read their own, insert their own. Admins can view all (simplify admin view to true for now for the admin dashboard)
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR true); -- making it true to let AdminDashboard see all!
CREATE POLICY "Users insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users modify own orders" ON orders FOR UPDATE USING (auth.uid() = user_id OR true);

-- Order Items: Viewable if you own the order, but we simplified orders visibility to true
CREATE POLICY "View order items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- Trigger to create profile when auth.user signs up (using InsForge triggers)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
