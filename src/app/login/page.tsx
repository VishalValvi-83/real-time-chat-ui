"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password })
    router.push("/chats")
  }

  const handleRegisterClick = () => {
    router.push("/register")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-blue-500 transition-colors">
          <MessageCircle className="h-6 w-6" />
          <span className="font-bold text-xl">ChatApp</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl border border-border/50 p-8">
          <LoginForm onSubmit={handleLogin} onRegisterClick={handleRegisterClick} />
        </div>
      </div>
    </div>
  )
}
