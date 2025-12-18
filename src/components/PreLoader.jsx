import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)

  const text = "ChatApp"

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll('.reveal-letter')
      
      gsap.set(letters, { 
        y: '100%',
        opacity: 0
      })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsComplete(true)
              onComplete?.()
            }
          })
        }
      })

      tl.to(letters, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out"
      })

      tl.to({}, { duration: 0.6 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden ${
        isComplete ? 'pointer-events-none' : ''
      }`}
    >
      <div 
        ref={textRef}
        className="flex overflow-hidden"
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="reveal-letter inline-block text-6xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PreLoader
