import Link from 'next/link'
import { Youtube, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything on the server
  if (!isClient) {
    return (
      <footer className="bg-deep-indigo border-t border-deep-indigo-light/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-deep-indigo-light/20 rounded w-32 mb-4"></div>
              <div className="h-4 bg-deep-indigo-light/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-deep-indigo-light/20 rounded w-2/3 mb-4"></div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-deep-indigo-light/20"></div>
                <div className="w-10 h-10 rounded-full bg-deep-indigo-light/20"></div>
                <div className="w-10 h-10 rounded-full bg-deep-indigo-light/20"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-deep-indigo border-t border-deep-indigo-light/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/Logo.png" 
                alt="Zista Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">Zista</span>
            </div>
            <p className="text-white/70 mb-4">
              Your all-in-one productivity hive for tools, learning, games & rewards.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-white/70 hover:text-golden-honey transition-colors">Tools</Link></li>
              <li><Link href="/learn" className="text-white/70 hover:text-golden-honey transition-colors">Learning</Link></li>
              <li><Link href="/games" className="text-white/70 hover:text-golden-honey transition-colors">Games</Link></li>
              <li><Link href="/marketplace" className="text-white/70 hover:text-golden-honey transition-colors">Marketplace</Link></li>
              <li><Link href="/pricing" className="text-white/70 hover:text-golden-honey transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/70 hover:text-golden-honey transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-golden-honey transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-white/70 hover:text-golden-honey transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-golden-honey transition-colors">Contact</Link></li>
              <li><Link href="/partners" className="text-white/70 hover:text-golden-honey transition-colors">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-white/70 hover:text-golden-honey transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-golden-honey transition-colors">Privacy</Link></li>
              <li><Link href="/cookies" className="text-white/70 hover:text-golden-honey transition-colors">Cookies</Link></li>
              <li><Link href="/security" className="text-white/70 hover:text-golden-honey transition-colors">Security</Link></li>
              <li><Link href="/compliance" className="text-white/70 hover:text-golden-honey transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-deep-indigo-light/20 mt-8 pt-8 text-center">
          <p className="text-white/50">
            &copy; {new Date().getFullYear()} Z-Star | Life in Motion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
