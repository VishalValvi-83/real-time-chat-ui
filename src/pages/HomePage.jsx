import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { MessageCircle, Shield, Zap, Users, Lock, Check, Video, Phone, Mic, Globe, Send, Sparkles, ArrowRight, Play, Star, Quote, Heart, Image, Paperclip, Smile } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { usePreloader } from "@/App"

export default function HomePage() {
  const { preloaderComplete } = usePreloader()
  const containerRef = useRef(null)
  const featureRef = useRef(null)
  const heroRef = useRef(null)
  const communicationRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const bgX = useSpring(mouseX, { damping: 50, stiffness: 100 })
  const bgY = useSpring(mouseY, { damping: 50, stiffness: 100 })
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setCursorPos({ x: e.clientX, y: e.clientY })
      
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        mouseX.set(x * 50)
        mouseY.set(y * 50)
      }
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY, mouseX, mouseY])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: featureScrollProgress } = useScroll({
    target: featureRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: communicationScrollProgress } = useScroll({
    target: communicationRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your messages are secured with military-grade encryption. Nobody can read your conversations except you and your recipients.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Real-time messaging with zero lag. Messages are delivered instantly, keeping conversations flowing naturally.",
    },
    {
      icon: Users,
      title: "Group Chats",
      description: "Create groups with up to 1000 members. Perfect for teams, communities, and staying connected with everyone.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data stays yours. We don't sell your information or track your activities. Complete privacy guaranteed.",
    },
  ]

  const communicationFeatures = [
    {
      icon: Video,
      title: "Crystal Clear Video Calls",
      description: "HD video calling with up to 50 participants. Screen sharing, virtual backgrounds, and real-time reactions make every call memorable.",
      color: "from-blue-500 to-cyan-500",
      stats: "50+ participants",
      image: "video"
    },
    {
      icon: Phone,
      title: "Voice Calls That Connect",
      description: "Crystal clear audio quality for one-on-one or group voice calls. Stay connected even on low bandwidth with adaptive audio technology.",
      color: "from-violet-500 to-purple-500",
      stats: "HD Audio Quality",
      image: "voice"
    },
    {
      icon: Mic,
      title: "Voice Messages",
      description: "Send voice messages when typing isn't convenient. Perfect for quick updates, personal touches, or when you're on the go.",
      color: "from-pink-500 to-rose-500",
      stats: "Up to 15 min",
      image: "mic"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with anyone, anywhere in the world. Automatic translation, low latency servers across continents.",
      color: "from-emerald-500 to-teal-500",
      stats: "100+ Countries",
      image: "globe"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      avatar: "SC",
      content: "ChatApp has completely transformed how our remote team communicates. The video quality is incredible and the interface is so intuitive.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Startup Founder",
      avatar: "MJ",
      content: "We switched from three different apps to just ChatApp. Voice messages and instant translations have been game-changers for our global team.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      avatar: "ER",
      content: "The security features give me peace of mind when discussing sensitive campaigns. Plus, the group video calls never lag, even with 30+ people.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Software Engineer",
      avatar: "DK",
      content: "Finally, a chat app that respects privacy. End-to-end encryption, no data selling, and it's blazing fast. What more could you want?",
      rating: 5
    }
  ]

  const liveConversation = [
    { sender: "Alex", message: "Hey team! Just pushed the new feature", time: "2:34 PM", avatar: "A" },
    { sender: "Sarah", message: "Amazing work! Let me test it out", time: "2:35 PM", avatar: "S" },
    { sender: "Mike", message: "The video call quality is incredible now", time: "2:36 PM", avatar: "M" },
    { sender: "Alex", message: "Thanks! We optimized the compression", time: "2:37 PM", avatar: "A" },
  ]

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Unlimited 1-on-1 chats",
        "Group chats (up to 50)",
        "Voice messages",
        "File sharing (10MB)",
        "Voice calls",
      ],
    },
    {
      name: "Pro",
      price: "$9",
      popular: true,
      features: [
        "Everything in Free",
        "Group chats (up to 500)",
        "File sharing (100MB)",
        "HD Video calls",
        "Screen sharing",
        "Custom themes",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Unlimited groups",
        "Advanced admin controls",
        "SSO integration",
        "Dedicated support",
        "Custom branding",
        "API access",
      ],
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030712] cursor-none overflow-x-hidden">
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-blue-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ChatApp</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/60 hover:text-white transition-colors text-sm">Features</a>
              <a href="#communication" className="text-white/60 hover:text-white transition-colors text-sm">Communication</a>
              <a href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px]"
            style={{ x: bgX, y: bgY }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px]"
            style={{ x: useTransform(bgX, v => -v), y: useTransform(bgY, v => -v) }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={preloaderComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/80">Now with HD Video Calling</span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Connect with{" "}
              <span className="relative">
                <motion.span 
                  className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 100%' }}
                >
                  everyone
                </motion.span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20 blur-xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={preloaderComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/90"
              >
                securely & instantly
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Chat, call, and video conference with anyone around the world. 
              End-to-end encrypted, blazing fast, and beautifully designed.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link to="/register">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Button size="lg" className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg">
                    Start Chatting Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
<Link to="/demo">
                  <motion.div
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <span className="text-white/80">Watch Demo</span>
                  </motion.div>
                </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "2M+", label: "Active Users" },
                { value: "500M+", label: "Messages Sent" },
                { value: "99.9%", label: "Uptime" },
                { value: "150+", label: "Countries" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white/40 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      <section id="communication" ref={communicationRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628] to-[#030712]" />
        
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: useTransform(communicationScrollProgress, [0, 1], [100, -100])
          }}
        >
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/70">Multiple ways to connect</span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              More Than Just{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                Messaging
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Video calls, voice calls, voice messages - communicate the way that works best for you
            </p>
          </motion.div>

          <div className="space-y-24">
            {communicationFeatures.map((feature, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                >
                  <motion.div 
                    className="flex-1 relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 rounded-3xl blur-3xl group-hover:opacity-30 transition-opacity`} />
                    
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                        <div className="w-3 h-3 rounded-full bg-green-400/50" />
                      </div>
                      
                      <motion.div 
                        className={`h-64 flex items-center justify-center bg-gradient-to-br ${feature.color} opacity-10 rounded-2xl`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <feature.icon className={`h-24 w-24 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: 'currentColor', opacity: 0.8 }} strokeWidth={1.5} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="flex-1 space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className={`inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} items-center justify-center shadow-lg`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20 text-xs font-medium text-white/80 mb-3`}>
                        {feature.stats}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {feature.title}
                      </h3>
                      <p className="text-lg text-white/50 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <motion.button
                      className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      Learn more 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="features" ref={featureRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        
        <motion.div 
          style={{ y: useTransform(featureScrollProgress, [0, 1], [150, -150]) }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Why choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                ChatApp?
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Built with security, speed, and simplicity in mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index === 0 ? 'from-blue-500/20 to-cyan-500/20' :
                  index === 1 ? 'from-violet-500/20 to-purple-500/20' :
                  index === 2 ? 'from-emerald-500/20 to-teal-500/20' :
                  'from-pink-500/20 to-rose-500/20'
                } rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`inline-flex h-14 w-14 rounded-2xl ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                      index === 1 ? 'bg-gradient-to-br from-violet-500 to-purple-500' :
                      index === 2 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
                      'bg-gradient-to-br from-pink-500 to-rose-500'
                    } items-center justify-center shadow-lg mb-6`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628] to-[#030712]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How it{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Get started in seconds, connect in moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", description: "Sign up with your email or phone number in seconds", icon: Users },
              { step: "02", title: "Add Contacts", description: "Find friends or share your unique link to connect", icon: Send },
              { step: "03", title: "Start Chatting", description: "Send messages, make calls, or start video chats instantly", icon: MessageCircle }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent transform translate-x-1/2 -translate-y-1/2" />
                )}
                
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
                  <div className="text-6xl font-bold text-white/10 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.step}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 items-center justify-center shadow-lg mb-4"
                  >
                    <item.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/50">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                transparent
              </span>
              {" "}pricing
            </h2>
            <p className="text-xl text-white/50">
              Choose the plan that works for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: plan.popular ? 1 : 1.02 }}
                className={`relative ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border ${
                  plan.popular ? 'border-blue-500/50 shadow-xl shadow-blue-500/10' : 'border-white/10'
                }`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-white/50">/month</span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] to-[#0a1628]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl p-12 text-center overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to get started?
              </h2>
              <p className="text-xl mb-8 text-white/90 relative z-10">
                Join millions of users already chatting on ChatApp
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8">
                      Create Free Account
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/chats">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                      Try Demo
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#030712]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span className="font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ChatApp</span>
              </div>
              <p className="text-white/40 text-sm">Connect with everyone, securely and instantly.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li className="hover:text-white/70 cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li className="hover:text-white/70 cursor-pointer transition-colors">About</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li className="hover:text-white/70 cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-white/70 cursor-pointer transition-colors">Security</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-white/40 text-sm">
            © 2024 ChatApp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
