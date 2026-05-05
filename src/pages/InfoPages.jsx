import React from 'react';

const PageLayout = ({ title, children }) => (
  <div className="page-transition-enter-active" style={{ minHeight: '60vh', padding: '6rem 0' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>{title}</h1>
      <div style={{ lineHeight: '1.8', color: 'var(--secondary)' }}>
        {children}
      </div>
    </div>
  </div>
);

export const Contact = () => (
  <PageLayout title="Contact Us">
    <p style={{ marginBottom: '1.5rem' }}>We're here to help. Send us a message and we'll respond as soon as possible.</p>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
        <input type="text" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="FullName" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
        <input type="email" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="your@email.com" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
        <textarea style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '150px' }} placeholder="How can we help?"></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Send Message</button>
    </form>
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Customer Support</h3>
      <p>Email: support@aurafashion.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Hours: Mon - Fri, 9am - 6pm EST</p>
    </div>
  </PageLayout>
);

export const Shipping = () => (
  <PageLayout title="Shipping & Returns">
    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', marginTop: '2rem' }}>Shipping Policy</h3>
    <p style={{ marginBottom: '1rem' }}>We offer complimentary standard shipping on all orders over $150. Orders are processed within 1-2 business days.</p>
    <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '2rem' }}>
      <li>Standard Shipping (3-5 business days): $15.00</li>
      <li>Express Shipping (1-2 business days): $25.00</li>
      <li>International Shipping (7-14 business days): $35.00</li>
    </ul>

    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Return Policy</h3>
    <p style={{ marginBottom: '1rem' }}>We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and have original tags attached.</p>
    <p>To initiate a return, please visit our returns portal or contact customer support. A $5 restocking fee applies to all returns.</p>
  </PageLayout>
);

export const FAQ = () => (
  <PageLayout title="Frequently Asked Questions">
    <div style={{ marginBottom: '2rem' }}>
      <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>How can I track my order?</h4>
      <p>Once your order ships, you will receive an email with a tracking number and link to track your package.</p>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Do you ship internationally?</h4>
      <p>Yes, we ship to over 50 countries worldwide. Shipping costs will apply and be added at checkout.</p>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Can I change or cancel my order?</h4>
      <p>We process orders quickly, but we will do our best to accommodate changes if you contact us within 1 hour of placing your order.</p>
    </div>
  </PageLayout>
);

export const SizeGuide = () => (
  <PageLayout title="Size Guide">
    <p style={{ marginBottom: '2rem' }}>Our garments are designed for a relaxed, modern fit. If you are between sizes, we recommend sizing down for a tailored look or sizing up for a more oversized silhouette.</p>
    
    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>General Size Chart</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #eaeaea', textAlign: 'left' }}>
          <th style={{ padding: '1rem' }}>Size</th>
          <th style={{ padding: '1rem' }}>US</th>
          <th style={{ padding: '1rem' }}>Chest (in)</th>
          <th style={{ padding: '1rem' }}>Waist (in)</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #eaeaea' }}>
          <td style={{ padding: '1rem' }}>XS</td>
          <td style={{ padding: '1rem' }}>0-2</td>
          <td style={{ padding: '1rem' }}>31-32</td>
          <td style={{ padding: '1rem' }}>24-25</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #eaeaea' }}>
          <td style={{ padding: '1rem' }}>S</td>
          <td style={{ padding: '1rem' }}>4-6</td>
          <td style={{ padding: '1rem' }}>33-35</td>
          <td style={{ padding: '1rem' }}>26-28</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #eaeaea' }}>
          <td style={{ padding: '1rem' }}>M</td>
          <td style={{ padding: '1rem' }}>8-10</td>
          <td style={{ padding: '1rem' }}>36-38</td>
          <td style={{ padding: '1rem' }}>29-31</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #eaeaea' }}>
          <td style={{ padding: '1rem' }}>L</td>
          <td style={{ padding: '1rem' }}>12-14</td>
          <td style={{ padding: '1rem' }}>39-41</td>
          <td style={{ padding: '1rem' }}>32-34</td>
        </tr>
        <tr>
          <td style={{ padding: '1rem' }}>XL</td>
          <td style={{ padding: '1rem' }}>16</td>
          <td style={{ padding: '1rem' }}>42-44</td>
          <td style={{ padding: '1rem' }}>35-37</td>
        </tr>
      </tbody>
    </table>
  </PageLayout>
);

export const Terms = () => (
  <PageLayout title="Terms of Service">
    <p style={{ marginBottom: '1rem' }}>Last updated: October 2026</p>
    <p style={{ marginBottom: '1rem' }}>Please read these terms and conditions carefully before using our website.</p>
    <h3 style={{ color: 'var(--primary)', margin: '1.5rem 0 1rem 0' }}>1. Introduction</h3>
    <p style={{ marginBottom: '1rem' }}>By accessing and placing an order with AURA Fashion, you confirm that you are in agreement with and bound by the terms of service contained below.</p>
    <h3 style={{ color: 'var(--primary)', margin: '1.5rem 0 1rem 0' }}>2. Products and Pricing</h3>
    <p style={{ marginBottom: '1rem' }}>All products are subject to availability. We reserve the right to modify prices without prior notice.</p>
  </PageLayout>
);

export const Privacy = () => (
  <PageLayout title="Privacy Policy">
    <p style={{ marginBottom: '1rem' }}>Last updated: October 2026</p>
    <p style={{ marginBottom: '1rem' }}>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from AURA Fashion.</p>
    <h3 style={{ color: 'var(--primary)', margin: '1.5rem 0 1rem 0' }}>Information We Collect</h3>
    <p style={{ marginBottom: '1rem' }}>When you make a purchase, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>
    <h3 style={{ color: 'var(--primary)', margin: '1.5rem 0 1rem 0' }}>How We Use Your Information</h3>
    <p style={{ marginBottom: '1rem' }}>We use this order information to fulfill any orders placed through the site, screen for potential risk or fraud, and provide you with information or advertising relating to our products.</p>
  </PageLayout>
);
