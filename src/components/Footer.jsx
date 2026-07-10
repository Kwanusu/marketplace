import React, { useState } from 'react';
import { db } from '@/config/firebase'; 
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const cleanedEmail = email.trim().toLowerCase();

    try {
      const subscribersRef = collection(db, 'newsletter_subscribers');
      
      const dupQuery = query(subscribersRef, where('email', '==', cleanedEmail));
      const querySnapshot = await getDocs(dupQuery);

      if (!querySnapshot.empty) {
        toast.info('You are already subscribed to our newsletter pipeline!');
        setEmail('');
        setIsSubmitting(false);
        return;
      }

      await addDoc(subscribersRef, {
        email: cleanedEmail,
        subscribedAt: serverTimestamp(),
        source: 'footer_newsletter'
      });

      toast.success('Awesome! Welcome to the Zindua dispatch circle.');
      setEmail('');
    } catch (err) {
      console.error('Firestore synchronization fallback failure:', err);
      toast.error('Network handshake failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-600 px-6 py-16 font-sans border-t border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 1: Value Propositions / Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="text-emerald-500 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.25 21.5h3.5A2.25 2.25 0 0016 19.25v-1.5H8v1.5a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <h4 className="text-gray-900 font-semibold text-base dark:text-gray-100">Support East African Makers</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              Shop authentic products directly from local innovators and artisans.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="text-emerald-500 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-gray-900 font-semibold text-base dark:text-gray-100">Secure Payments</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              100% safe transactions via M-Pesa, Airtel Money, and Card payments.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="text-emerald-500 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <h4 className="text-gray-900 font-semibold text-base dark:text-gray-100">Nationwide Delivery</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              Fast, tracked shipping to your doorstep across Kenya and Tanzania.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="text-emerald-500 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h4 className="text-gray-900 font-semibold text-base dark:text-gray-100">Buyer Protection</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              Money-back guarantee if items don't match the description.
            </p>
          </div>

        </div>

        {/* SECTION 2: Mega Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
          
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-3 lg:col-span-2 space-y-5">
            <h3 className="text-gray-900 text-2xl font-bold dark:text-white">
              Zindua<span className="text-emerald-500">.</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
              The ultimate launchpad for East African products, startups, and creative makers.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors duration-200 shrink-0 disabled:opacity-70"
              >
                <span>{isSubmitting ? 'Syncing...' : 'Subscribe'}</span>
                {!isSubmitting && (
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </form>
            
            {/* Social Media Links */}
            <div className="flex gap-4 text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-emerald-500 transition-colors duration-200" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8.02 9.6V15H8v-3h2.02V9.77c0-2 1.19-3.1 3-3.1.87 0 1.79.15 1.79.15v1.97h-1.01c-.99 0-1.3.62-1.3 1.25V12h2.21l-.35 3h-1.86v6.6C18.56 20.87 22 16.84 22 12z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors duration-200" aria-label="X (formerly Twitter)">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors duration-200" aria-label="Instagram">
                <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors duration-200" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop Categories */}
          <div>
            <h4 className="text-gray-900 text-xs font-semibold uppercase tracking-wider mb-4 dark:text-gray-100">Shop Market</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/launches" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">New Product Launches</a></li>
              <li><a href="/tech" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Local Tech & Gadgets</a></li>
              <li><a href="/fashion" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Fashion & Apparel</a></li>
              <li><a href="/home" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Home Essentials</a></li>
              <li><a href="/wholesale" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Wholesale Hub</a></li>
            </ul>
          </div>

          {/* Column 2: For Makers / Creators */}
          <div>
            <h4 className="text-gray-900 text-xs font-semibold uppercase tracking-wider mb-4 dark:text-gray-100">For Makers</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/submit" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Submit Your Product</a></li>
              <li><a href="/seller-dashboard" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Seller Dashboard</a></li>
              <li><a href="/influencers" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Creator Monetization</a></li>
              <li><a href="/success-stories" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Maker Success Stories</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Fees & Packaging</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Support */}
          <div>
            <h4 className="text-gray-900 text-xs font-semibold uppercase tracking-wider mb-4 dark:text-gray-100">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/help" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Help Center / FAQs</a></li>
              <li><a href="/shipping-returns" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Track Your Order</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Contact Support</a></li>
              <li><a href="/zindua-school" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-emerald-500">Zindua Coding School</a></li>
            </ul>
          </div>

        </div>

        {/* SECTION 3: Sub-Footer (Legal, Payments, and Copyright) */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 dark:border-gray-700">
          
          {/* Copyright & Legal */}
          <div className="text-sm text-gray-600 text-center md:text-left space-y-2 md:space-y-0 dark:text-gray-400">
            <span className="block md:inline md:mr-4">&copy; 2026 Zindua Market. All rights reserved.</span>
            <div className="inline-flex gap-4">
              <a href="/privacy" className="hover:text-emerald-600 transition-colors duration-200 dark:hover:text-emerald-500">Privacy Policy</a>
              <a href="/terms" className="hover:text-emerald-600 transition-colors duration-200 dark:hover:text-emerald-500">Terms of Service</a>
              <a href="/dmca" className="hover:text-emerald-600 transition-colors duration-200 dark:hover:text-emerald-500">DMCA Notice</a>
            </div>
          </div>

          {/* Supported Regional Payments */}
{/* Supported Regional Payments Ticker */}
<div className="flex flex-col items-center gap-2 md:items-end w-full overflow-hidden">
  <span className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
    Accepted Payments
  </span>
  
  {/* Carousel Window */}
  <div className="relative w-48 overflow-hidden mask-gradient-edges">
    {/* CSS Inline Ticker Animation Wrapper */}
    <div className="flex gap-3 w-max animate-[marquee_12s_linear_infinite] hover:[animation-play-state:paused]">
      
      {/* --- Track Set 1 --- */}
      {/* M-PESA */}
      <div className="flex h-6 shrink-0 items-center bg-[#005A2B] px-2.5 rounded text-[10px] font-black tracking-tight text-white select-none shadow-sm">
        m-<span className="text-[#BF0112] font-black uppercase text-xs">pesa</span>
      </div>

      {/* AIRTEL MONEY */}
      <div className="flex h-6 shrink-0 items-center bg-[#FF0000] px-2.5 rounded text-[10px] font-black tracking-tighter text-white uppercase select-none shadow-sm">
        airtel <span className="text-gray-200 font-light ml-0.5">money</span>
      </div>

      {/* VISA */}
      <div className="flex h-6 w-10 shrink-0 items-center justify-center bg-[#1A1F71] rounded px-1.5 shadow-sm" title="Visa">
        <svg className="w-full h-auto" viewBox="0 0 24 8" fill="none">
          <path d="M3.7 7.7L5.3 1H7L5.4 7.7H3.7Z" fill="white"/>
          <path d="M10.3 1.2C9.9 1 9.2 0.9 8.5 0.9C6.5 0.9 5.1 1.9 5.1 3.4C5.1 4.5 6.1 5.1 6.9 5.5C7.7 5.9 7.9 6.1 7.9 6.5C7.9 7.1 7.2 7.3 6.6 7.3C5.7 7.3 5.2 7.1 4.8 6.9L4.4 8.2C4.9 8.4 5.7 8.6 6.5 8.6C8.6 8.6 10 7.6 10 6.1C10 5.1 9.4 4.4 8 3.8C7.1 3.4 6.7 3.2 6.7 2.7C6.7 2.3 7.2 1.9 8.1 1.9C8.8 1.9 9.3 2 9.7 2.2L10.3 1.2Z" fill="white"/>
          <path d="M14.1 5C14.1 5 14.5 3.5 14.5 3.4C14.5 3.5 14.8 5 14.8 5H14.1ZM15.7 1H14.1C13.7 1 13.4 1.2 13.2 1.6L10.7 7.7H12.4L12.9 6.3H15.1L15.3 7.7H16.9L15.7 1Z" fill="white"/>
          <path d="M2.3 1H0.1L0 1.2C1.7 1.6 2.8 2.5 3.3 3.8L2.7 1H2.3Z" fill="#F79E1B"/>
          <path d="M23.9 1H22.3C21.9 1 21.6 1.2 21.4 1.7L18.7 7.7H20.4L20.8 6.5H22.9L23.1 7.7H24L23.9 1ZM21.2 5.3L22.1 2.8L22.6 5.3H21.2Z" fill="white"/>
        </svg>
      </div>

      {/* MASTERCARD */}
      <div className="flex h-6 w-10 shrink-0 items-center justify-center bg-white border border-gray-200 rounded px-1 dark:border-gray-800 shadow-sm" title="Mastercard">
        <svg className="w-8 h-auto" viewBox="0 0 24 15" fill="none">
          <circle cx="7" cy="7.5" r="7" fill="#EB001B"/>
          <circle cx="13" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.8"/>
        </svg>
      </div>

      {/* --- Track Set 2 (Cloned for Infinite Loop Illusion) --- */}
      <div className="flex h-6 shrink-0 items-center bg-[#005A2B] px-2.5 rounded text-[10px] font-black tracking-tight text-white select-none shadow-sm">
        m-<span className="text-[#BF0112] font-black uppercase text-xs">pesa</span>
      </div>

      <div className="flex h-6 shrink-0 items-center bg-[#FF0000] px-2.5 rounded text-[10px] font-black tracking-tighter text-white uppercase select-none shadow-sm">
        airtel <span className="text-gray-200 font-light ml-0.5">money</span>
      </div>

      <div className="flex h-6 w-10 shrink-0 items-center justify-center bg-[#1A1F71] rounded px-1.5 shadow-sm">
        <svg className="w-full h-auto" viewBox="0 0 24 8" fill="none">
          <path d="M3.7 7.7L5.3 1H7L5.4 7.7H3.7Z" fill="white"/>
          <path d="M10.3 1.2C9.9 1 9.2 0.9 8.5 0.9C6.5 0.9 5.1 1.9 5.1 3.4C5.1 4.5 6.1 5.1 6.9 5.5C7.7 5.9 7.9 6.1 7.9 6.5C7.9 7.1 7.2 7.3 6.6 7.3C5.7 7.3 5.2 7.1 4.8 6.9L4.4 8.2C4.9 8.4 5.7 8.6 6.5 8.6C8.6 8.6 10 7.6 10 6.1C10 5.1 9.4 4.4 8 3.8C7.1 3.4 6.7 3.2 6.7 2.7C6.7 2.3 7.2 1.9 8.1 1.9C8.8 1.9 9.3 2 9.7 2.2L10.3 1.2Z" fill="white"/>
          <path d="M14.1 5C14.1 5 14.5 3.5 14.5 3.4C14.5 3.5 14.8 5 14.8 5H14.1ZM15.7 1H14.1C13.7 1 13.4 1.2 13.2 1.6L10.7 7.7H12.4L12.9 6.3H15.1L15.3 7.7H16.9L15.7 1Z" fill="white"/>
          <path d="M2.3 1H0.1L0 1.2C1.7 1.6 2.8 2.5 3.3 3.8L2.7 1H2.3Z" fill="#F79E1B"/>
          <path d="M23.9 1H22.3C21.9 1 21.6 1.2 21.4 1.7L18.7 7.7H20.4L20.8 6.5H22.9L23.1 7.7H24L23.9 1ZM21.2 5.3L22.1 2.8L22.6 5.3H21.2Z" fill="white"/>
        </svg>
      </div>

      <div className="flex h-6 w-10 shrink-0 items-center justify-center bg-white border border-gray-200 rounded px-1 dark:border-gray-800 shadow-sm">
        <svg className="w-8 h-auto" viewBox="0 0 24 15" fill="none">
          <circle cx="7" cy="7.5" r="7" fill="#EB001B"/>
          <circle cx="13" cy="7.5" r="7" fill="#F79E1B" fillOpacity="0.8"/>
        </svg>
      </div>

    </div>
  </div>
</div>
          
        </div>

      </div>
    </footer>
  );
}