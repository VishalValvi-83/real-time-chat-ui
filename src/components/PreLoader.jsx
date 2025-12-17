import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => onComplete?.(), 500)
          }, 300)
        }
      })

      const nameLetters = nameRef.current.querySelectorAll('.letter')
      const titleLetters = titleRef.current.querySelectorAll('.letter')

      gsap.set(nameLetters, {
        opacity: 0,
        y: 30,
      })

      gsap.set(titleLetters, {
        opacity: 0,
        y: 20,
      })

      tl.to(nameLetters, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05
      })
      .to(titleLetters, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.03
      }, "-=0.2")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.6")

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="letter inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 transition-opacity duration-500 ${
        isComplete ? 'pointer-events-none' : ''
      }`}
    >
      <div className="relative text-center px-8">
        <div 
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.2 }}
        >
          {splitText('VISHAL VALVI')}
        </div>
        
        <div 
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-slate-300"
        >
          {splitText('CREATIVE SOFTWARE DEVELOPER')}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse pointer-events-none" />
        
        <div className="absolute -inset-20 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl opacity-50 pointer-events-none animate-pulse" />
      </div>
    </div>
  )
}

export default PreLoader
