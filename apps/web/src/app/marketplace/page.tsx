'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Search, Package, Briefcase, Smartphone, Shirt, Sparkles, BookOpen, Headphones, Monitor, Code, Megaphone, Share2, Star, Bell, ShoppingCart, Zap, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'
import Image from 'next/image'

type Tab = 'Products' | 'Services'
type ProductCategory = 'All' | 'Tech' | 'Fashion' | 'Beauty' | 'Books'
type ServiceCategory = 'All' | 'Digital Marketing' | 'Web Development' | 'Design'

interface Product {
  id: number
  name: string
  description: string
  category: Exclude<ProductCategory, 'All'>
  price: number
  honeyDiscount?: number
  image?: string
  rating: number
  reviews: number
  seller: string
  icon: any
  color: string
  inStock: boolean
}

interface Service {
  id: number
  name: string
  description: string
  category: Exclude<ServiceCategory, 'All'>
  price: number
  honeyDiscount?: number
  duration: string
  provider: string
  rating: number
  reviews: number
  featured?: boolean
  icon: any
  color: string
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Products')
  const [searchQuery, setSearchQuery] = useState('')
  const [productCategory, setProductCategory] = useState<ProductCategory>('All')
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('All')
  const pathname = usePathname()

  const products: Product[] = [
    // Tech
    { id: 1, name: 'Wireless Earbuds Pro', description: 'Premium sound quality, 24hr battery', category: 'Tech', price: 3500, honeyDiscount: 10, rating: 4.5, reviews: 128, seller: 'TechHub KE', icon: Headphones, color: 'from-blue-500 to-cyan-500', inStock: true },
    { id: 2, name: 'Smartphone Stand', description: 'Adjustable phone holder for desk', category: 'Tech', price: 800, honeyDiscount: 5, rating: 4.2, reviews: 64, seller: 'Gadget Store', icon: Smartphone, color: 'from-indigo-500 to-purple-500', inStock: true },
    { id: 3, name: 'USB-C Cable 2M', description: 'Fast charging, durable braided cable', category: 'Tech', price: 450, rating: 4.7, reviews: 203, seller: 'TechHub KE', icon: Zap, color: 'from-yellow-500 to-orange-500', inStock: true },
    { id: 4, name: 'Laptop Sleeve 15"', description: 'Protective padded laptop case', category: 'Tech', price: 1200, honeyDiscount: 8, rating: 4.4, reviews: 89, seller: 'Gadget Store', icon: Monitor, color: 'from-gray-500 to-slate-500', inStock: true },
    { id: 5, name: 'Power Bank 20000mAh', description: 'Fast charge, dual USB ports', category: 'Tech', price: 2500, honeyDiscount: 15, rating: 4.6, reviews: 156, seller: 'TechHub KE', icon: Zap, color: 'from-green-500 to-emerald-500', inStock: false },

    // Fashion
    { id: 6, name: 'Unisex Hoodie', description: 'Comfortable cotton blend, multiple colors', category: 'Fashion', price: 1800, honeyDiscount: 10, rating: 4.3, reviews: 92, seller: 'Urban Styles', icon: Shirt, color: 'from-purple-500 to-pink-500', inStock: true },
    { id: 7, name: 'Canvas Sneakers', description: 'Classic design, all sizes available', category: 'Fashion', price: 2200, honeyDiscount: 12, rating: 4.5, reviews: 178, seller: 'Kicks Kenya', icon: TrendingUp, color: 'from-red-500 to-orange-500', inStock: true },
    { id: 8, name: 'Denim Backpack', description: 'Stylish and functional daily bag', category: 'Fashion', price: 1500, rating: 4.1, reviews: 45, seller: 'Urban Styles', icon: Package, color: 'from-blue-500 to-indigo-500', inStock: true },

    // Beauty
    { id: 9, name: 'Natural Face Cream', description: 'Organic ingredients, all skin types', category: 'Beauty', price: 1200, honeyDiscount: 8, rating: 4.6, reviews: 234, seller: 'Glow Beauty', icon: Sparkles, color: 'from-pink-500 to-rose-500', inStock: true },
    { id: 10, name: 'Hair Growth Oil', description: 'Natural oils for healthy hair', category: 'Beauty', price: 900, rating: 4.4, reviews: 167, seller: 'Glow Beauty', icon: Sparkles, color: 'from-green-500 to-teal-500', inStock: true },

    // Books
    { id: 11, name: 'Atomic Habits', description: 'James Clear - Build better habits', category: 'Books', price: 1500, honeyDiscount: 10, rating: 4.9, reviews: 421, seller: 'Book Worms', icon: BookOpen, color: 'from-yellow-500 to-orange-500', inStock: true },
    { id: 12, name: 'Rich Dad Poor Dad', description: 'Robert Kiyosaki - Financial literacy', category: 'Books', price: 1300, honeyDiscount: 10, rating: 4.8, reviews: 389, seller: 'Book Worms', icon: BookOpen, color: 'from-green-500 to-emerald-500', inStock: true },
    { id: 13, name: 'The 48 Laws of Power', description: 'Robert Greene - Strategy & influence', category: 'Books', price: 1800, rating: 4.7, reviews: 298, seller: 'Book Worms', icon: BookOpen, color: 'from-red-500 to-pink-500', inStock: true },
  ]

  const services: Service[] = [
    // Digital Marketing (Zista Services)
    { id: 1, name: 'Instagram Growth Package', description: '1000 followers + engagement boost', category: 'Digital Marketing', price: 5000, honeyDiscount: 20, duration: '7 days', provider: 'Zista SMML', rating: 4.8, reviews: 156, featured: true, icon: Share2, color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'Social Media Management', description: 'Daily posts + engagement for 1 month', category: 'Digital Marketing', price: 15000, honeyDiscount: 30, duration: '30 days', provider: 'Zista SMML', rating: 4.9, reviews: 89, featured: true, icon: Megaphone, color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Facebook Ads Campaign', description: 'Targeted ads setup + optimization', category: 'Digital Marketing', price: 8000, honeyDiscount: 25, duration: '14 days', provider: 'Zista SMML', rating: 4.7, reviews: 67, icon: Megaphone, color: 'from-blue-600 to-indigo-600' },
    { id: 4, name: 'YouTube Channel Setup', description: 'Full channel optimization + branding', category: 'Digital Marketing', price: 6000, honeyDiscount: 15, duration: '5 days', provider: 'Zista SMML', rating: 4.6, reviews: 43, icon: Share2, color: 'from-red-500 to-pink-500' },

    // Web Development (Zista Services)
    { id: 5, name: 'Landing Page Design', description: 'Professional single-page website', category: 'Web Development', price: 12000, honeyDiscount: 25, duration: '7 days', provider: 'Zista Dev', rating: 5.0, reviews: 34, featured: true, icon: Code, color: 'from-green-500 to-emerald-500' },
    { id: 6, name: 'Full Website Package', description: 'Multi-page website with CMS', category: 'Web Development', price: 35000, honeyDiscount: 40, duration: '21 days', provider: 'Zista Dev', rating: 4.9, reviews: 28, featured: true, icon: Monitor, color: 'from-indigo-500 to-purple-500' },
    { id: 7, name: 'E-commerce Store', description: 'Online store with payment integration', category: 'Web Development', price: 50000, honeyDiscount: 50, duration: '30 days', provider: 'Zista Dev', rating: 5.0, reviews: 19, icon: ShoppingCart, color: 'from-yellow-500 to-orange-500' },

    // Design (Zista Services)
    { id: 8, name: 'Logo Design', description: '3 concepts + unlimited revisions', category: 'Design', price: 4000, honeyDiscount: 15, duration: '3 days', provider: 'Zista Creative', rating: 4.8, reviews: 112, icon: Sparkles, color: 'from-pink-500 to-rose-500' },
    { id: 9, name: 'Social Media Graphics Pack', description: '20 custom posts + story templates', category: 'Design', price: 6000, honeyDiscount: 20, duration: '5 days', provider: 'Zista Creative', rating: 4.7, reviews: 78, icon: Share2, color: 'from-cyan-500 to-blue-500' },
    { id: 10, name: 'Brand Identity Package', description: 'Logo + color palette + typography', category: 'Design', price: 15000, honeyDiscount: 30, duration: '14 days', provider: 'Zista Creative', rating: 4.9, reviews: 45, featured: true, icon: Award, color: 'from-purple-500 to-violet-500' },
  ]

  const productCategories: { id: ProductCategory; label: string; icon: any }[] = [
    { id: 'All', label: 'All Products', icon: Package },
    { id: 'Tech', label: 'Tech', icon: Smartphone },
    { id: 'Fashion', label: 'Fashion', icon: Shirt },
    { id: 'Beauty', label: 'Beauty', icon: Sparkles },
    { id: 'Books', label: 'Books', icon: BookOpen },
  ]

  const serviceCategories: { id: ServiceCategory; label: string; icon: any }[] = [
    { id: 'All', label: 'All Services', icon: Briefcase },
    { id: 'Digital Marketing', label: 'Marketing', icon: Megaphone },
    { id: 'Web Development', label: 'Web Dev', icon: Code },
    { id: 'Design', label: 'Design', icon: Sparkles },
  ]

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = productCategory === 'All' || product.category === productCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, productCategory, products])

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = serviceCategory === 'All' || service.category === serviceCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, serviceCategory, services])

  const featuredServices = services.filter(s => s.featured)

  return (
    <div className="flex flex-col h-screen bg-deep-indigo-dark">
      {/* Top Bar */}
      <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/Logo.png" 
            alt="Zista Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-white">Zista</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
            <div className="text-2xl">🍯</div>
            <div>
              <div className="text-sm font-bold text-golden-honey">1250</div>
              <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
            </div>
          </div>

          <button className="relative p-2 hover:bg-deep-indigo-light/30 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Link href="/profile">
            <div className="flex items-center gap-2 hover:bg-deep-indigo-light/30 rounded-xl p-2 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-deep-indigo" />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-white leading-tight">Ziramzis</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <PageTransition>
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Shop & Services</h1>
              <p className="text-white/70">Quality products & professional services. Use Honey for discounts!</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('Products')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'Products'
                    ? 'bg-golden-honey text-deep-indigo'
                    : 'bg-deep-indigo/50 border border-deep-indigo-light/20 text-white/70 hover:text-white'
                }`}
              >
                <Package className="w-5 h-5" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('Services')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'Services'
                    ? 'bg-golden-honey text-deep-indigo'
                    : 'bg-deep-indigo/50 border border-deep-indigo-light/20 text-white/70 hover:text-white'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                Services
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-deep-indigo/50 border border-deep-indigo-light/20 rounded-xl pl-12 pr-4 py-3 lg:py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-golden-honey/50 focus:border-golden-honey/50 transition-all"
                />
              </div>
            </div>

            {activeTab === 'Products' ? (
              <>
                {/* Product Categories */}
                <div className="mb-6">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {productCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setProductCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                          productCategory === category.id
                            ? 'bg-golden-honey text-deep-indigo'
                            : 'bg-deep-indigo/50 border border-deep-indigo-light/20 text-white/70 hover:text-white hover:border-golden-honey/30'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Count */}
                <div className="mb-4">
                  <p className="text-sm text-white/60">
                    Showing <span className="text-golden-honey font-semibold">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 rounded-xl p-4 hover:border-golden-honey/50 hover:bg-deep-indigo/70 transition-all duration-300 cursor-pointer"
                      >
                        {/* Icon */}
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <product.icon className="w-7 h-7 text-white" />
                          </div>
                          {!product.inStock && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-medium">Out of Stock</span>
                          )}
                        </div>

                        {/* Product Info */}
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-golden-honey transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-white/60 mb-2 line-clamp-2">{product.description}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-3 h-3 text-golden-honey fill-golden-honey" />
                          <span className="text-xs text-white font-medium">{product.rating}</span>
                          <span className="text-xs text-white/40">({product.reviews})</span>
                        </div>

                        {/* Price & Seller */}
                        <div className="pt-3 border-t border-deep-indigo-light/10">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-lg font-bold text-white">KSh {product.price.toLocaleString()}</div>
                              {product.honeyDiscount && (
                                <div className="text-xs text-golden-honey">Save {product.honeyDiscount}% with Honey</div>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-white/40">by {product.seller}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No products found</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Featured Services */}
                {featuredServices.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-golden-honey fill-golden-honey" />
                      Featured Services by Zista
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {featuredServices.map((service) => (
                        <div
                          key={service.id}
                          className="relative bg-gradient-to-br from-golden-honey/10 to-deep-indigo/50 border-2 border-golden-honey/30 rounded-xl p-5 hover:border-golden-honey/60 transition-all cursor-pointer"
                        >
                          <div className="absolute top-3 right-3">
                            <Star className="w-4 h-4 text-golden-honey fill-golden-honey" />
                          </div>
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-3`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-sm font-bold text-white mb-1">{service.name}</h3>
                          <p className="text-xs text-white/60 mb-2">{service.description}</p>
                          <div className="text-base font-bold text-golden-honey">KSh {service.price.toLocaleString()}</div>
                          {service.honeyDiscount && (
                            <div className="text-xs text-green-400">Save {service.honeyDiscount}% with Honey</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Categories */}
                <div className="mb-6">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {serviceCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setServiceCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                          serviceCategory === category.id
                            ? 'bg-golden-honey text-deep-indigo'
                            : 'bg-deep-indigo/50 border border-deep-indigo-light/20 text-white/70 hover:text-white hover:border-golden-honey/30'
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services Count */}
                <div className="mb-4">
                  <p className="text-sm text-white/60">
                    Showing <span className="text-golden-honey font-semibold">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className="group bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 rounded-xl p-5 hover:border-golden-honey/50 hover:bg-deep-indigo/70 transition-all duration-300 cursor-pointer"
                      >
                        {/* Icon & Provider */}
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-xs bg-golden-honey/10 text-golden-honey px-2 py-1 rounded font-medium">
                            {service.provider}
                          </div>
                        </div>

                        {/* Service Info */}
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-golden-honey transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-xs text-white/60 mb-3 line-clamp-2">{service.description}</p>
                        
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-golden-honey fill-golden-honey" />
                            <span className="text-white font-medium">{service.rating}</span>
                            <span>({service.reviews})</span>
                          </div>
                          <div>⏱ {service.duration}</div>
                        </div>

                        {/* Price */}
                        <div className="pt-3 border-t border-deep-indigo-light/10">
                          <div className="text-lg font-bold text-white">KSh {service.price.toLocaleString()}</div>
                          {service.honeyDiscount && (
                            <div className="text-xs text-green-400">Save {service.honeyDiscount}% with Honey</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No services found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </PageTransition>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-deep-indigo border-t border-deep-indigo-light/20 px-2 py-2 z-50 shadow-lg backdrop-blur-sm bg-deep-indigo/95">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <Link 
            href="/dashboard" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/dashboard' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <Home className="w-6 h-6" strokeWidth={pathname === '/dashboard' ? 2.5 : 2} />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link 
            href="/tools" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/tools' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <Wrench className="w-6 h-6" strokeWidth={pathname === '/tools' ? 2.5 : 2} />
            <span className="text-xs font-medium">Tools</span>
          </Link>
          <Link 
            href="/learn" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/learn' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <GraduationCap className="w-6 h-6" strokeWidth={pathname === '/learn' ? 2.5 : 2} />
            <span className="text-xs font-medium">Learn</span>
          </Link>
          <Link 
            href="/games" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/games' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <Gamepad2 className="w-6 h-6" strokeWidth={pathname === '/games' ? 2.5 : 2} />
            <span className="text-xs font-medium">Play</span>
          </Link>
          <Link 
            href="/marketplace" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/marketplace' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={pathname === '/marketplace' ? 2.5 : 2} />
            <span className="text-xs font-medium">Shop</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
