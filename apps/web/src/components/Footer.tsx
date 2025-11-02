import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-indigo border-t border-deep-indigo-light/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-golden-honey rounded-full flex items-center justify-center text-2xl">
                🐝
              </div>
              <span className="text-xl font-display font-bold text-white">Zista</span>
            </div>
            <p className="text-white/60 text-sm">
              Your all-in-one productivity hive. Stay busy, stay smart.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Bee Tools</Link></li>
              <li><Link href="/learn" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Learning Hub</Link></li>
              <li><Link href="/games" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Games</Link></li>
              <li><Link href="/marketplace" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/60 hover:text-golden-honey text-sm transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-white/60 hover:text-golden-honey text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-deep-indigo-light/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            Built with 💛 by <span className="font-semibold text-golden-honey">Ziramzis</span> | Z-Star | Life in Motion
          </p>
          <p className="text-white/50 text-sm">
            © {currentYear} Zista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
