import { Footer } from "@/components/footer"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header - Reused for consistency */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-20 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <Bot className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">TOVTRIP AL TRACKER</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/#features" className="hover:text-black">Features</Link>
          <Link href="/contact" className="text-black font-semibold">Contact</Link>
        </nav>
        <div className="w-[88px]"> {/* Spacer to balance layout if needed, or login button */}
             <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Back to Home
             </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Contact Support</h1>
            <p className="text-gray-500 mb-8">Need help? Reach out to our internal support team.</p>

            <div className="space-y-6 text-left">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">📧</div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email Support</p>
                        <a href="mailto:Nightpp19@gmail.com" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">Nightpp19@gmail.com</a>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">📞</div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone Support</p>
                        <a href="tel:0965689895" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">0965689895</a>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
