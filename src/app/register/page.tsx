"use client"

import { useRouter } from "next/navigation"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = (data: {
    fullName: string
    username: string
    email: string
    phone: string
    password: string
  }) => {
    console.log("Register:", data)
    router.push("/chats")
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-4 py-12">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-blue-500 transition-colors">
          <MessageCircle className="h-6 w-6" />
          <span className="font-bold text-xl">ChatApp</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl border border-border/50 p-8">
          <RegisterForm onSubmit={handleRegister} onLoginClick={handleLoginClick} />
        </div>
      </div>
    </div>
  )
}
