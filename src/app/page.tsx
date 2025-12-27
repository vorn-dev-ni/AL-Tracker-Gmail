import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Bot } from "lucide-react"

export default async function Home() {
  const session = await auth()
  
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-20 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-md">
            {/* <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <Bot className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">TOVTRIP AL TRACKER</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-black">Features</a>
          <a href="/contact" className="hover:text-black">Contact</a>
        </nav>
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors">
            Login
          </button>
        </form>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-6 pt-16 lg:px-20 lg:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-black mb-6">
                Track Staff<br />
                <span className="text-[#1a73e8]">Annual Leave</span> from Gmail
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                <span className="font-bold text-gray-900">TOVTRIP AL TRACKER</span> brings automation to your HR workflow. 
                Seamlessly track employee leave requests directly from your Gmail inbox. 
                No more manual entry, just streamlined leave management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <form
                  action={async () => {
                    "use server"
                    await signIn("google")
                  }}
                >
                  <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm min-w-[240px]">
                     <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" fillRule="evenodd" />
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18L12.049 13.56c-.806.54-1.836.86-3.049.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" fillRule="evenodd" />
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" fillRule="evenodd" />
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.159 6.656 3.58 9 3.58z" fill="#EA4335" fillRule="evenodd" />
                    </svg>
                    Continue with Google
                  </button>
                </form>

              
              </div>
              <p className="mt-4 text-xs text-gray-400 font-medium">Internal Tool • Secure Access • Tovtrip Staff Only</p>
            </div>

            <div className="relative">
               {/* Decorative Gradient Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-cyan-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              
               {/* Main Card */}
              <div className="relative bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 aspect-square max-h-[500px]">
                 {/* Internal Gradient Mesh */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
                 
                 {/* Glowing Center */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>

                 {/* Geometric Graphic Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        <div className="w-48 h-48 border border-blue-500/30 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite_reverse]">
                            <div className="w-32 h-32 bg-cyan-400/10 rounded-full backdrop-blur-sm border border-cyan-300/20"></div>
                        </div>
                    </div>
                 </div>

                 {/* Floating Label */}
                 <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold tracking-wider text-gray-800 uppercase">System Active • Monitoring Gmail</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="mt-32 text-center">
             <h2 className="text-3xl font-bold mb-4">Why Choose TOVTRIP AL TRACKER?</h2>
             <p className="text-gray-500 max-w-2xl mx-auto mb-16">The smartest way to manage staff holidays and time off used by Tovtrip.</p>

             <div className="grid md:grid-cols-3 gap-8 text-left">
                {[
                  { title: "Gmail Integration", desc: "Automatically syncs leave requests and approvals from your company Gmail.", icon: "bg-blue-100/50 text-blue-600" },
                  { title: "Automated Tracking", desc: "Calculates remaining annual leave balances instantly for every staff member.", icon: "bg-cyan-100/50 text-cyan-600" },
                  { title: "Tovtrip Specific", desc: "Customized specifically for Tovtrip's internal HR and leaving policies.", icon: "bg-indigo-100/50 text-indigo-600" }
                ].map((feature, i) => (
                  <div key={i} className="p-8 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-md transition-shadow">
                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${feature.icon}`}>
                        <div className="w-5 h-5 bg-current rounded-sm opacity-50"></div>
                     </div>
                     <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </main>

       {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
             <div className="flex items-center justify-center gap-2 mb-8">

                <Bot className="text-primary w-5 h-5" />
                <span className="text-sm font-bold tracking-tight">TOVTRIP AL TRACKER</span>
            </div>
            <div className="flex justify-center gap-8 text-xs text-gray-500 mb-8">
               <a href="#" className="hover:text-gray-900">Privacy Policy</a>
               <a href="#" className="hover:text-gray-900">Terms of Service</a>
               <a href="#" className="hover:text-gray-900">Contact Support</a>
               <a href="/contact" className="hover:text-gray-900">Documentation</a>
            </div>
            <p className="text-[10px] text-gray-400">2025 @ copyroght by Siv sovanpanhavorn</p>
        </div>
      </footer>
    </div>
  )
}
