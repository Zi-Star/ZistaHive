import Link from 'next/link'
import { 
  Zap, Wrench, BookOpen, Gamepad2, ShoppingBag, 
  Mail, Phone, MapPin, 
  Twitter, Instagram, Youtube, Facebook,
  Crown, Flame, Star, Droplets
} from 'lucide-react'
import { HoneyPot as HoneyPotComponent } from '@zistahive/ui'

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Product links
  const productLinks = [
    { name: 'All Tools', href: '/tools', icon: Wrench },
    { name: 'Learning Hub', href: '/learn', icon: BookOpen },
    { name: 'Games Arena', href: '/games', icon: Gamepad2 },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Honey Rewards', href: '/rewards', icon: Droplets },
  ]

  // Company links
  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
  ]

  // Legal links
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Community Guidelines', href: '/guidelines' },
  ]

  // Social links
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
    { name: 'Facebook', href: '#', icon: Facebook },
  ]

  return (
    <footer className="bg-deep-indigo border-t border-deep-indigo-light/20 mt-auto">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-deep-indigo-dark" />
              </div>
              <span className="text-2xl font-display font-bold text-white">Zista</span>
            </div>
            
            <p className="text-white/70 mb-6 max-w-md">
              Your all-in-one productivity hive for Kenyan youth. Stay busy, stay smart, and earn rewards while you work.
            </p>
            
            {/* Honey Stats */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-lg border border-golden-honey/30">
                <span className="text-2xl">&#127853;</span>
                <div>
                  <div className="text-sm font-bold text-golden-honey">10K+</div>
                  <div className="text-xs text-golden-honey/70">Users</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-lg border border-golden-honey/30">
                <Flame className="w-5 h-5 text-golden-honey" />
                <div>
                  <div className="text-sm font-bold text-golden-honey">200+</div>
                  <div className="text-xs text-golden-honey/70">Days Streak</div>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-golden-honey" />
                <span>hello@zista.app</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-golden-honey" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-golden-honey" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
          
          {/* Product Column */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <Wrench className="w-5 h-5 text-golden-honey" />
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 text-white/60 hover:text-golden-honey text-sm transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-golden-honey text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal & Social Column */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-golden-honey text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-bold text-white mb-4 text-lg">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="w-10 h-10 rounded-lg bg-deep-indigo-light/30 flex items-center justify-center text-white/60 hover:text-golden-honey hover:bg-deep-indigo-light/50 transition-colors border border-deep-indigo-light/20"
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-deep-indigo-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
            <p className="text-white/50">
              Built with 💛 by <span className="font-semibold text-golden-honey">Ziramzis</span> | Z-Star | Life in Motion
            </p>
            <p className="text-white/50">
              © {currentYear} Zista. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-white/50">Powered by</div>
            <div className="flex items-center gap-1 bg-deep-indigo-light/30 px-2 py-1 rounded border border-deep-indigo-light/20">
              <Zap className="w-3 h-3 text-golden-honey" />
              <span className="text-xs font-semibold text-golden-honey">Honey Economy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}