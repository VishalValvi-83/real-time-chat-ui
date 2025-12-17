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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-slate-100"
          style={{ lineHeight: 1.3, letterSpacing: '0.02em' }}
        >
          {splitText('Vishal Valvi')}
        </div>
        
        <div 
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl font-light tracking-wider text-slate-400"
        >
          {splitText('Creative Software Developer')}
        </div>
      </div>
    </div>
  )
}

export default PreLoader
