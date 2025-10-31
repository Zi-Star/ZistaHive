import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-2xl">
                🐝
              </div>
              <span className="text-xl font-display font-bold">Zista</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your all-in-one productivity hive. Stay busy, stay smart.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-gray-600 hover:text-primary-600 text-sm">Bee Tools</Link></li>
              <li><Link href="/learn" className="text-gray-600 hover:text-primary-600 text-sm">Learning Hub</Link></li>
              <li><Link href="/games" className="text-gray-600 hover:text-primary-600 text-sm">Games</Link></li>
              <li><Link href="/marketplace" className="text-gray-600 hover:text-primary-600 text-sm">Marketplace</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-primary-600 text-sm">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-primary-600 text-sm">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-primary-600 text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-primary-600 text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            Built with 💛 by <span className="font-semibold text-gray-900">Ziramzis</span> | Z-Star | Life in Motion
          </p>
          <p className="text-gray-500 text-sm">
            © {currentYear} Zista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
