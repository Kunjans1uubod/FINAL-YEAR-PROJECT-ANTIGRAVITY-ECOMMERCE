import React, { createContext, useContext, useState, useEffect } from 'react';
import { insforge } from '../insforge';

export const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const setup = async () => {
      const { data: { session } } = await insforge.auth.getSession();
      setUser(session?.user || null);

      insforge.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      // Fetch products
      const { data: productsData, error } = await insforge.database
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && productsData) {
        // Map database keys to frontend keys if needed
        const mappedProducts = productsData.map(p => ({
          ...p,
          isNew: p.is_new,
          isTrending: p.is_trending
        }));
        setProducts(mappedProducts);
      }
      setLoading(false);
    };

    setup();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData(user.id);
    } else {
      setProfile(null);
      setOrders([]);
      // Load local cart if no user
      const localCart = localStorage.getItem('cart');
      if (localCart) setCartItems(JSON.parse(localCart));
      else setCartItems([]);
    }
  }, [user]);

  const loadUserData = async (userId) => {
    // Fetch profile
    const { data: profileData } = await insforge.database
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (profileData) setProfile(profileData);

    // Fetch orders
    const { data: ordersData } = await insforge.database
      .from('orders')
      .select('*, order_items(*, product:products(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (ordersData) setOrders(ordersData);

    // Fetch cart
    const { data: cartData } = await insforge.database
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', userId);
      
    if (cartData) {
      const mappedCart = cartData.map(item => ({
        ...item.product,
        quantity: item.quantity,
        selectedSize: item.size,
        cartItemId: item.id
      }));
      setCartItems(mappedCart);
    }
  };

  const addToCart = async (product, quantity, size) => {
    if (!user) {
      const newItems = [...cartItems];
      const existing = newItems.find(i => i.id === product.id && i.selectedSize === size);
      if (existing) existing.quantity += quantity;
      else newItems.push({ ...product, quantity, selectedSize: size });
      setCartItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return;
    }

    // Server-side cart
    // check if exists
    const existing = cartItems.find(i => i.id === product.id && i.selectedSize === size);
    if (existing) {
      await insforge.database.from('cart_items').update({ quantity: existing.quantity + quantity }).eq('id', existing.cartItemId);
    } else {
      await insforge.database.from('cart_items').insert([{
        user_id: user.id,
        product_id: product.id,
        quantity,
        size
      }]);
    }
    loadUserData(user.id); // refresh
  };

  const updateCartItemQuantity = async (productId, size, num) => {
    if (!user) {
      const newItems = cartItems.map(item => {
        if (item.id === productId && item.selectedSize === size) {
          return { ...item, quantity: num };
        }
        return item;
      });
      setCartItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return;
    }

    const existing = cartItems.find(i => i.id === productId && i.selectedSize === size);
    if (existing) {
      await insforge.database.from('cart_items').update({ quantity: num }).eq('id', existing.cartItemId);
      loadUserData(user.id);
    }
  };

  const removeFromCart = async (productId, size) => {
    if (!user) {
      const newItems = cartItems.filter(i => !(i.id === productId && i.selectedSize === size));
      setCartItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return;
    }
    const existing = cartItems.find(i => i.id === productId && i.selectedSize === size);
    if (existing) {
      await insforge.database.from('cart_items').delete().eq('id', existing.cartItemId);
      loadUserData(user.id);
    }
  };

  const placeOrder = async (address, paymentReceiptUrl = null) => {
    if (!user) throw new Error("Must be logged in to place an order");
    if (cartItems.length === 0) return;

    let total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 1. Create order
    const { data: orderData, error: orderErr } = await insforge.database.from('orders').insert([{
      user_id: user.id,
      total_amount: total,
      shipping_address: address,
      payment_receipt_url: paymentReceiptUrl,
      status: 'pending'
    }]).select();

    if (orderErr) throw orderErr;
    const orderId = orderData[0].id;

    // 2. Insert items
    const oItems = cartItems.map(item => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      size: item.selectedSize,
      price_at_time: item.price
    }));

    await insforge.database.from('order_items').insert(oItems);

    // 3. Clear cart
    await insforge.database.from('cart_items').delete().eq('user_id', user.id);
    
    // Refresh
    loadUserData(user.id);
  };

  const signIn = async (email, password) => {
    const { error } = await insforge.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email, password, fullName) => {
    const { error } = await insforge.auth.signUp({
      email, password, options: { data: { full_name: fullName } }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await insforge.auth.signOut();
  };

  return (
    <ShopContext.Provider value={{
      user, profile, products, cartItems, orders, loading,
      addToCart, removeFromCart, updateCartItemQuantity, placeOrder,
      signIn, signUp, signOut
    }}>
      {children}
    </ShopContext.Provider>
  );
};
