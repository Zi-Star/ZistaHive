import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-indigo-dark flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-9xl mb-4">🐝</div>
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Oops! This page flew away
        </h2>
        
        <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">
          Looks like this bee got lost from the hive. Let&apos;s get you back to safety!
        </p>
        
        <Link href="/">
          <button className="px-8 py-4 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
            Return to Hive 🏠
          </button>
        </Link>
      </div>
    </div>
  )
}
