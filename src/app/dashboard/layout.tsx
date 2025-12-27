import { auth, signOut } from "@/auth"
import { Bot, LogOut, User } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 h-16 px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">TOVTRIP AL TRACKER</span>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3">
                 <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md">
                    {session?.user?.name || "User"}
                 </span>
                 <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md">
                    {session?.user?.email || "user@example.com"}
                 </span>
            </div>

            {/* Logout Action */}
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
               <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Sign Out">
                 <LogOut className="w-5 h-5" />
               </button>
            </form>

            {/* Avatar */}
             <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                {session?.user?.image ? (
                   <Image 
                      src={session.user.image} 
                      alt="Profile" 
                      width={36} 
                      height={36} 
                      className="object-cover"
                    />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                      <User className="w-5 h-5" />
                   </div>
                )}
             </div>
        </div>
      </nav>

      <main className="w-full mx-auto p-6 md:p-8 flex-1">
         {children}
      </main>
      <Footer />
    </div>
  )
}
