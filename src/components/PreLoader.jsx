import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll('.letter')
      
      // Set initial state - letters hidden below mask
      gsap.set(letters, {
        yPercent: 120,
        opacity: 0
      })

      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out preloader
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

      // Animate letters sliding up with stagger
      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04
      })
      // Hold for a moment
      .to({}, { duration: 0.6 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  const text = "Vishal Valvi"

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] ${
        isComplete ? 'pointer-events-none' : ''
      }`}
    >
      <div 
        ref={textRef}
        className="overflow-hidden"
      >
        <div 
          className="flex"
          style={{ 
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            letterSpacing: '-0.02em'
          }}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="letter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreLoader
