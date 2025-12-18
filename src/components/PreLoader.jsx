import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const centerTextRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const roles = [
    "REAL-TIME CHAT",
    "VIDEO CALLING", 
    "VOICE MESSAGES",
    "GROUP CHATS",
    "END-TO-END ENCRYPTED",
    "SECURE MESSAGING"
  ]

  const centerText = "ChatApp"

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circles = containerRef.current.querySelectorAll('.orbit-circle')
      const centerLetters = centerTextRef.current.querySelectorAll('.center-letter')
      const percentageEl = containerRef.current.querySelector('.percentage')

      gsap.set(centerLetters, { 
        opacity: 0, 
        y: 100,
        rotateX: -90 
      })

      gsap.set(circles, { 
        scale: 0.3, 
        opacity: 0 
      })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              setIsComplete(true)
              onComplete?.()
            }
          })
        }
      })

      tl.to(circles, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      })

      tl.to(circles[0], {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none"
      }, "<")

      tl.to(circles[1], {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "none"
      }, "<")

      tl.to(circles[2], {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: "none"
      }, "<")

      tl.to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function() {
          setPercentage(Math.round(this.targets()[0].val))
        }
      }, "<")

      const expandContract = gsap.timeline({ repeat: 2, yoyo: true })
      expandContract.to(circles, {
        scale: 1.3,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut"
      })
      expandContract.to(circles, {
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.inOut"
      })

      tl.add(expandContract, 0.5)

      tl.to(centerLetters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, 0.8)

      tl.to({}, { duration: 0.5 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  const createCircularText = (text, radius, index) => {
    const chars = text.split('')
    const angleStep = 360 / chars.length

    return chars.map((char, i) => {
      const angle = i * angleStep
      const rad = (angle * Math.PI) / 180
      const x = Math.cos(rad) * radius
      const y = Math.sin(rad) * radius

      return (
        <span
          key={`${index}-${i}`}
          className="absolute text-xs sm:text-sm font-medium tracking-widest"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
            color: index === 0 ? 'rgba(59, 130, 246, 0.9)' : 
                   index === 1 ? 'rgba(139, 92, 246, 0.8)' : 
                   'rgba(236, 72, 153, 0.7)',
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712] overflow-hidden ${
        isComplete ? 'pointer-events-none' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-violet-950/20" />
      
      <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px]">
        <div 
          className="orbit-circle absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: 'center center' }}
        >
          <div className="relative w-full h-full">
            {createCircularText(roles[0] + " • " + roles[1] + " • ", 220, 0)}
          </div>
        </div>

        <div 
          className="orbit-circle absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: 'center center' }}
        >
          <div className="relative w-full h-full">
            {createCircularText(roles[2] + " • " + roles[3] + " • ", 170, 1)}
          </div>
        </div>

        <div 
          className="orbit-circle absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: 'center center' }}
        >
          <div className="relative w-full h-full">
            {createCircularText(roles[4] + " • " + roles[5] + " • ", 120, 2)}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              ref={centerTextRef}
              className="flex justify-center mb-4"
              style={{ perspective: '1000px' }}
            >
              {centerText.split('').map((char, index) => (
                <span
                  key={index}
                  className="center-letter inline-block text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            
            <div className="percentage text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/30"
            style={{
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}

export default PreLoader
