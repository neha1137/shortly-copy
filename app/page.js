'use client';

import { useState, useEffect } from 'react';
import { Zap, Shield, BarChart3, ArrowRight, CheckCircle, Star, Globe, Lock, Rocket, Users, TrendingUp, Cpu } from 'lucide-react';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import { motion } from "framer-motion";

import { useContext } from "react";
import { ThemeContext } from "./theme";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Safely consume ThemeContext; if provider isn't available for some reason
  // fall back to checking the document root class (client-only).
  const themeCtx = useContext(ThemeContext) || {};
  const darkMode = themeCtx.darkMode ?? (typeof window !== "undefined" && document.documentElement.classList.contains("dark"));

   // or loading state


  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate short links in milliseconds with our globally distributed edge network.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Track clicks, geographic data, device types, and referral sources in real-time.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Military-grade encryption, password protection, and expiration controls.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart AI Features",
      description: "AI-powered link suggestions and automated campaign optimization.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  // Feature carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const stats = [
    { number: '10M+', label: 'Links Shortened' },
    { number: '500K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' },
  ];

  const testimonials = [
    {
      name: "Jay Sarkar",
      role: "Marketing Director",
      company: "Infocare",
      content: "Shortly increased our campaign CTR by 47%. The analytics helped us understand our audience better than ever.",
      avatar: "JS"
    },
    {
      name: "Vinay Reddy",
      role: "Growth Lead",
      company: "StockPro",
      content: "The API integration was seamless. We shortened 50K+ links in our first month with zero downtime.",
      avatar: "VR"
    },
    {
      name: "Astha Sharma",
      role: "Social Media Manager",
      company: "Creatico",
      content: "Our team loves the custom domains and branded links. It's made our social media campaigns much more professional.",
      avatar: "AS"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small projects",
      popular: false,
      features: [
        "1,000 links/month",
        "Basic analytics",
        "Custom domains",
        "30-day history",
        "Standard support"
      ],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "Everything you need for growing businesses",
      popular: true,
      features: [
        "10,000 links/month",
        "Advanced analytics",
        "Custom branding",
        "1-year history",
        "Priority support",
        "API access",
        "Team collaboration"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "For large organizations with custom needs",
      popular: false,
      features: [
        "Unlimited links",
        "Enterprise analytics",
        "White-label solutions",
        "Unlimited history",
        "24/7 dedicated support",
        "Advanced API",
        "SAML/SSO integration",
        "Custom SLAs"
      ],
      cta: "Contact Sales"
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        { /*<Navbar />*/ }
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
   
      {/* <Navbar /> */}


      {/* Hero Section */}
    <section className="relative overflow-hidden flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg">
      <div
        className="
          absolute inset-0 overflow-hidden 
  [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
  [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] 
  [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] 
  [background-image:var(--white-gradient),var(--aurora)] 
  dark:[background-image:var(--dark-gradient),var(--aurora)] 
  [background-size:300%,_200%] 
  [background-position:50%_50%,50%_50%] 
  filter blur-[10px] invert dark:invert-0 
  pointer-events-none 
  absolute -inset-[10px] opacity-50 
  will-change-transform 
  after:content-[''] 
  after:absolute 
  after:inset-0 
  after:[background-image:var(--white-gradient),var(--aurora)] 
  after:dark:[background-image:var(--dark-gradient),var(--aurora)] 
  after:[background-size:200%,_100%] 
  after:animate-aurora 
  after:[background-attachment:fixed] 
  after:mix-blend-difference 
  [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]

        "
      ></div>

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >

        {/* Your contents here, e.g. headings or text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Short Links,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Big Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform long URLs into powerful, trackable short links that drive engagement,
              deliver insights, and boost your marketing ROI. Enterprise-grade features,
              startup-friendly pricing.
            </p>
      
    


        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse dark:bg-purple-900 dark:opacity-10"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse dark:yellow-purple-900 dark:opacity-10"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse dark:blue-purple-900 dark:opacity-10"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Trusted by 500,000+ businesses worldwide
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                <span className="flex items-center">
                  Watch Demo
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Shortly?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to create, manage, and analyze your short links in one powerful platform.
            </p>
          </div>

          {/* Feature Showcase */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer ${currentFeature === index
                        ? 'bg-white dark:bg-gray-800 shadow-xl scale-105 border-2 border-blue-500/20'
                        : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg'
                        }`}
                      onMouseEnter={() => setCurrentFeature(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                          <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full max-w-sm border border-white/20">
                      <div className="text-white text-center mb-4">
                        <Globe className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <h3 className="text-lg font-semibold">Shortly Dashboard</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/20 rounded-lg p-3 text-white text-sm">
                          shortly.xyz/spring-sale
                        </div>
                        <div className="flex justify-between text-white/80 text-sm">
                          <span>Clicks: 2,847</span>
                          <span>+12% today</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied customers who trust Shortly for their link management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
