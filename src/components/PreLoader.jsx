import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const circleRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)

  const roles = [
    "Frontend Developer",
    "React.js Developer", 
    "MERN Stack Developer",
    "UI/UX Enthusiast",
    "Web Developer"
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameLetters = nameRef.current.querySelectorAll('.name-letter')
      const circleTexts = circleRef.current.querySelectorAll('.circle-text')
      
      gsap.set(nameLetters, {
        opacity: 0,
        y: 100,
        rotateX: -90
      })

      gsap.set(circleTexts, {
        opacity: 0,
        scale: 0
      })

      gsap.set(circleRef.current, {
        rotation: 0,
        scale: 0.3
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

      tl.to(circleRef.current, {
        scale: 1,
        duration: 1,
        ease: "power3.out"
      })
      .to(circleTexts, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)"
      }, "-=0.5")
      
      .to(circleRef.current, {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut"
      }, "-=0.3")
      
      .to(circleRef.current, {
        scale: 0.6,
        duration: 0.5,
        ease: "power2.in"
      }, "-=1.5")
      .to(circleRef.current, {
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out"
      }, "-=1")
      .to(circleRef.current, {
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.5")
      .to(circleRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1")
      
      .to(nameLetters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      }, "-=0.8")
      
      .to(circleRef.current, {
        rotation: 720,
        scale: 1.3,
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=0.3")
      .to(circleRef.current, {
        scale: 0.5,
        duration: 0.6,
        ease: "power2.in"
      }, "-=0.8")
      .to(circleRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      
      .to({}, { duration: 0.3 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  const name = "Vishal Valvi"
  const circleRadius = 140

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] ${
        isComplete ? 'pointer-events-none' : ''
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div 
          ref={circleRef}
          className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {roles.map((role, roleIndex) => {
            const roleChars = role.split('')
            const anglePerChar = 360 / (roles.join(' • ').length + roles.length * 3)
            let startAngle = 0
            
            for (let i = 0; i < roleIndex; i++) {
              startAngle += (roles[i].length + 3) * anglePerChar
            }

            return roleChars.map((char, charIndex) => {
              const angle = startAngle + charIndex * anglePerChar - 90
              const x = Math.cos((angle * Math.PI) / 180) * circleRadius
              const y = Math.sin((angle * Math.PI) / 180) * circleRadius
              
              return (
                <span
                  key={`${roleIndex}-${charIndex}`}
                  className="circle-text absolute text-xs sm:text-sm font-medium text-white/80"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.05em'
                  }}
                >
                  {char}
                </span>
              )
            })
          })}
          
          {roles.map((_, roleIndex) => {
            if (roleIndex === roles.length - 1) return null
            const anglePerChar = 360 / (roles.join(' • ').length + roles.length * 3)
            let startAngle = 0
            for (let i = 0; i <= roleIndex; i++) {
              startAngle += (roles[i].length + (i === roleIndex ? 1.5 : 3)) * anglePerChar
            }
            const angle = startAngle - 90
            const x = Math.cos((angle * Math.PI) / 180) * circleRadius
            const y = Math.sin((angle * Math.PI) / 180) * circleRadius
            
            return (
              <span
                key={`sep-${roleIndex}`}
                className="circle-text absolute text-xs sm:text-sm font-bold text-blue-400"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`
                }}
              >
                •
              </span>
            )
          })}
        </div>

        <div 
          ref={nameRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: '1000px' }}
        >
          <div 
            className="flex"
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            {name.split('').map((char, index) => (
              <span
                key={index}
                className="name-letter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreLoader
