// src/ui/Tier3Demo.tsx - Ultra Premium: Apple-Style SonicHive Website with GSAP
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import type { ViewerHandle, InitOptions } from '../viewer'
import { products, features, companyInfo, contactInfo, benefits } from './sonicHiveData'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

interface Tier3DemoProps {
  onNavigate: (page: string) => void
}

// Map product IDs to their PNG renders (transparent, perfect for blending)
const getProductImage = (productId: string): string => {
  const imageMap: Record<string, string> = {
    'solo': 'compressed_VR-3D-gray-Blue0000.png', // Solo gray render
    'duo': 'compressed_VR-3D-Orange-Blue0000.png', // Duo orange render
    'quad': 'VR-3D-green-Blue0025-1-1024x1024.png', // Quad green render with video
    'team': 'SRPW-XL-e1725016938325-1024x1015.png' // Team green render
  }
  return imageMap[productId] || 'compressed_VR-3D-gray-Blue0000.png'
}

export default function Tier3Demo({ onNavigate }: Tier3DemoProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [handle, setHandle] = useState<ViewerHandle | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [viewMode, setViewMode] = useState<'3d' | 'ar' | 'blueprint'>('3d')
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview')
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Apple-style scroll effect for navbar with parallax
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mountRef.current) return
    let cleanup = () => {}

    ;(async () => {
      const viewerModule = await import('../viewer')
      const initViewer = viewerModule.initViewer as (
        el: HTMLElement,
        opts?: InitOptions
      ) => Promise<ViewerHandle>
      const disposeViewer = viewerModule.disposeViewer as (h: ViewerHandle) => void

      const h = await initViewer(mountRef.current!, {
        showHDRIBackground: false,
        enableShadows: true,
        shadowMapSize: 4096,
        toneMappingExposure: 1.5,
        bloomEnabled: true,
        bloomStrength: 0.6,
        bloomRadius: 1.2,
        bloomThreshold: 0.5,
        scrollScrub: false,
      })

      setHandle(h)
      setLoading(false)
      cleanup = () => disposeViewer(h)
    })()

    return () => cleanup()
  }, [])

  // GSAP: Hero Section Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation with stagger
      gsap.from('.tier3-hero-label', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })

      gsap.from('.tier3-hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
      })

      gsap.from('.tier3-hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.7
      })

      gsap.from('.tier3-hero-ctas button', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 1
      })

      gsap.from('.tier3-stat', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
        delay: 1.2
      })
    })

    return () => ctx.revert()
  }, [])

  // GSAP: Scroll-Triggered Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product cards animation
      gsap.utils.toArray<HTMLElement>('.tier3-product-item, [class*="tier3-product"]').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.1
        })
      })

      // Feature cards with 3D rotation
      gsap.utils.toArray<HTMLElement>('.tier3-feature-card-premium, [style*="background: #f5f5f7"]').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 60,
          rotateX: -15,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.15
        })
      })

      // Section titles
      gsap.utils.toArray<HTMLElement>('h2, h3').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out'
        })
      })

      // Images with parallax effect
      gsap.utils.toArray<HTMLElement>('img[alt*="booth"], img[alt*="Pod"]').forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -50,
          ease: 'none'
        })
      })

      // Fade in paragraphs
      gsap.utils.toArray<HTMLElement>('p').forEach((p) => {
        gsap.from(p, {
          scrollTrigger: {
            trigger: p,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // GSAP: Interactive Button Animations
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>('button, .tier3-btn-primary, .tier3-btn-secondary')
    
    buttons.forEach((btn) => {
      const handleEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(2)'
        })
      }

      const handleLeave = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut'
        })
      }

      const handleClick = () => {
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.in',
          onComplete: () => {
            gsap.to(btn, {
              scale: 1,
              duration: 0.3,
              ease: 'elastic.out(1, 0.3)'
            })
          }
        })
      }

      btn.addEventListener('mouseenter', handleEnter)
      btn.addEventListener('mouseleave', handleLeave)
      btn.addEventListener('click', handleClick)

      return () => {
        btn.removeEventListener('mouseenter', handleEnter)
        btn.removeEventListener('mouseleave', handleLeave)
        btn.removeEventListener('click', handleClick)
      }
    })
  }, [])

  // GSAP: Smooth Parallax Scroll Effects (Desktop Only)
  useEffect(() => {
    // Skip parallax on mobile for better performance
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const ctx = gsap.context(() => {
      // Parallax effect on large images - slow upward movement
      gsap.utils.toArray<HTMLElement>('img[src*="assets/images"]').forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true
          },
          y: -50,
          ease: 'none'
        })
      })

      // Subtle parallax on text content blocks
      gsap.utils.toArray<HTMLElement>('h1, h2, h3').forEach((heading) => {
        gsap.to(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true
          },
          y: -20,
          ease: 'none'
        })
      })

      // Product cards with 3D depth parallax
      gsap.utils.toArray<HTMLElement>('.tier3-product-item').forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true
          },
          y: -30,
          scale: 1.02,
          ease: 'none'
        })
      })

      // Feature cards with subtle rotation
      gsap.utils.toArray<HTMLElement>('.tier3-feature-card-premium').forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true
          },
          y: -25,
          rotateY: i % 2 === 0 ? 1 : -1,
          ease: 'none'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // GSAP: Number Counter Animation
  useEffect(() => {
    const stats = document.querySelectorAll<HTMLElement>('.tier3-stat-value')
    
    stats.forEach((stat) => {
      const text = stat.textContent || '0'
      const number = parseInt(text.replace(/\D/g, ''), 10)
      
      if (number) {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          textContent: 0,
          duration: 2,
          ease: 'power1.inOut',
          snap: { textContent: 1 },
          onUpdate: function() {
            const current = Math.floor(Number(this.targets()[0].textContent))
            stat.textContent = text.includes('+') ? `${current}+` : 
                              text.includes('dB') ? `${current}dB` :
                              text.includes('%') ? `${current}%` : `${current}`
          }
        })
      }
    })
  }, [])

  // GSAP: Magnetic Effect for CTAs
  useEffect(() => {
    const ctas = document.querySelectorAll<HTMLElement>('.tier3-btn-primary')
    
    ctas.forEach((cta) => {
      const handleMove = (e: MouseEvent) => {
        const rect = cta.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(cta, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleLeave = () => {
        gsap.to(cta, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      }

      cta.addEventListener('mousemove', handleMove)
      cta.addEventListener('mouseleave', handleLeave)

      return () => {
        cta.removeEventListener('mousemove', handleMove)
        cta.removeEventListener('mouseleave', handleLeave)
      }
    })
  }, [])

  // GSAP: Infinite Client Logo Carousel
  useEffect(() => {
    const carousel = document.querySelector('.client-carousel')
    if (!carousel) return

    const logos = carousel.querySelectorAll('img')
    const logoWidth = 150 // approximate width including gap
    
    // Clone logos for seamless loop
    logos.forEach(logo => {
      const clone = logo.cloneNode(true) as HTMLElement
      carousel.appendChild(clone)
    })

    // Infinite scroll animation
    const animation = gsap.to(carousel, {
      x: `-${logoWidth * logos.length}px`,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (logoWidth * logos.length))
      }
    })

    // Pause on hover
    carousel.addEventListener('mouseenter', () => animation.pause())
    carousel.addEventListener('mouseleave', () => animation.play())

    return () => {
      animation.kill()
    }
  }, [])

  return (
    <div className="tier3-website">
      {/* Navigation - Premium Header */}
      <nav className={`tier3-nav ${isScrolled ? 'scrolled' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="tier3-nav-content" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 max(24px, env(safe-area-inset-left))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px'
        }}>
          <div className="tier3-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/assets/images/Scnichive-2-300x63.png" 
              alt="SonicHive" 
              style={{ 
                height: '32px', 
                width: 'auto',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div className="tier3-nav-links" style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <a href="#hero" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: isScrolled ? '#f5f5f7' : '#1d1d1f',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            >
              Home
            </a>
            <a href="#products" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: isScrolled ? '#f5f5f7' : '#1d1d1f',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            >
              Products
            </a>
            <a href="#experience" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: isScrolled ? '#f5f5f7' : '#1d1d1f',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            >
              3D View
            </a>
            <a href="#features" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: isScrolled ? '#f5f5f7' : '#1d1d1f',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            >
              Features
            </a>
            <a href="#contact" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: isScrolled ? '#f5f5f7' : '#1d1d1f',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            >
              Contact
            </a>
            <button style={{
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 600,
              background: '#0071e3',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginLeft: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0077ed'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0071e3'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Quote
            </button>
          </div>
          <button style={{
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 500,
            background: 'transparent',
            color: isScrolled ? '#f5f5f7' : '#6e6e73',
            border: `1px solid ${isScrolled ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
          onClick={() => onNavigate('landing')}
          >
            Exit
          </button>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: '60px' }}></div>

      {/* Hero - Apple Style */}
      <section id="hero" className="tier3-hero">
        <div className="tier3-hero-content">
          <span className="tier3-hero-label">New</span>
          <h1 className="tier3-hero-title">
            Silence.
            <br />
            <span className="tier3-gradient-text">Redefined.</span>
          </h1>
          <p className="tier3-hero-description">
            Transform your workspace with acoustic excellence. 30-35dB noise reduction. Premium materials. Available across UAE, Qatar, KSA & New Zealand.
          </p>
          <div className="tier3-hero-ctas">
            <button 
              className="tier3-btn-primary"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View in 3D
            </button>
            <button 
              className="tier3-btn-secondary"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn more
            </button>
          </div>
          
          <div className="tier3-hero-stats">
            {companyInfo.achievements.map((achievement, idx) => (
              <div key={idx} className="tier3-stat">
                <div className="tier3-stat-value">{achievement.value}</div>
                <div className="tier3-stat-label">{achievement.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Line - Apple Style */}
          <div style={{ 
            marginTop: '60px',
            fontSize: '14px',
            color: '#6e6e73',
            fontWeight: 500,
            letterSpacing: '-0.01em'
          }}>
            Trusted by leading organizations worldwide
          </div>
        </div>
        <div className="tier3-hero-visual">
          <div className="tier3-hero-gradient"></div>
        </div>
      </section>

      {/* Step Into Flexibility Section with Video Backdrop */}
      <section style={{ 
        padding: '140px 0',
        position: 'relative',
        textAlign: 'center',
        color: '#f5f5f7',
        overflow: 'hidden',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: 0,
            filter: 'brightness(0.4)'
          }}
        >
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1
        }}></div>
        
        <div className="tier3-container" style={{ 
          maxWidth: '840px', 
          position: 'relative', 
          zIndex: 2,
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(48px, 7vw, 72px)', 
            fontWeight: 800, 
            marginBottom: '24px',
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            Step Into flexibility, creativity,
            <br />
            and silence with our
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f56300 0%, #ffa94d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>eco-friendly office pods</span>
          </h2>
          <p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Various Models of Soundproof Pods for Home & Office
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="tier3-btn-primary"
              style={{ fontSize: '17px', padding: '14px 32px' }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
            </button>
            <button 
              className="tier3-btn-secondary"
              style={{ 
                fontSize: '17px', 
                padding: '14px 32px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View in 3D
            </button>
          </div>
        </div>
      </section>

      {/* Products Overview Cards - Apple Style */}
      <section id="products" className="tier3-products">
        <div className="tier3-container">
          <div className="tier3-section-header-center">
            <h2 className="tier3-section-title">Various Models of Soundproof Pods for Home & Office</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginTop: '60px'
          }}>
            {/* Solo Silence Booth */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
            }}
            onClick={() => document.getElementById('solo-detail')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ padding: '40px 20px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assets/images/compressed_VR-3D-gray-Blue0000.png"
                  alt="Solo silence booth"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '220px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
                  }}
                />
              </div>
              <div style={{ padding: '0 24px 32px' }}>
                <span style={{ fontSize: '13px', color: '#f56300', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Private silence Booth for 1 person
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0 12px', color: '#1d1d1f' }}>Solo silence booth</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '20px' }}>
                  The one person silence booth in our workplace provides a private, sound-insulated space for confidential calls, ensuring comfort and convenience for uninterrupted communication.
                </p>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0071e3',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}>
                  Explore Now →
                </button>
              </div>
            </div>

            {/* Duo Silence Booth */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
            }}
            onClick={() => document.getElementById('duo-detail')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ padding: '40px 20px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assets/images/compressed_VR-3D-Orange-Blue0000.png"
                  alt="Duo silence booth"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '220px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(245,99,0,0.2))'
                  }}
                />
              </div>
              <div style={{ padding: '0 24px 32px' }}>
                <span style={{ fontSize: '13px', color: '#f56300', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Office Pod for 2 person
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0 12px', color: '#1d1d1f' }}>Duo silence booth</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '20px' }}>
                  Designed for maximum comfort and convenience, the two person silence booth is ideal for critical business discussions, confidential meetings, or quiet chats with colleagues.
                </p>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0071e3',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}>
                  Explore Now →
                </button>
              </div>
            </div>

            {/* Quartet Silence Booth */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
            }}
            onClick={() => document.getElementById('quartet-detail')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ padding: '40px 20px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assets/images/VR-3D-green-Blue0025-1-1024x1024.png"
                  alt="Quartet silence booth"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '220px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(0,200,100,0.2))'
                  }}
                />
              </div>
              <div style={{ padding: '0 24px 32px' }}>
                <span style={{ fontSize: '13px', color: '#f56300', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Meeting pod for 4 person
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0 12px', color: '#1d1d1f' }}>Quartet silence booth</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '20px' }}>
                  Equipped for both quick team huddles and extended discussions, the four person silence booth ensures efficiency and productivity, promoting effective collaboration in the workplace.
                </p>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0071e3',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}>
                  Explore Now →
                </button>
              </div>
            </div>

            {/* Hexa Silence Booth */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
            }}
            onClick={() => document.getElementById('hexa-detail')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ padding: '40px 20px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assets/images/SRPW-XL-e1725016938325-1024x1015.png"
                  alt="Hexa silence booth"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '220px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(0,200,100,0.2))'
                  }}
                />
              </div>
              <div style={{ padding: '0 24px 32px' }}>
                <span style={{ fontSize: '13px', color: '#f56300', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Meeting Pods for 6 person
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0 12px', color: '#1d1d1f' }}>Hexa silence booth</h3>
                <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '20px' }}>
                  The six person silence booth promotes teamwork and innovation, making it an ideal space for spontaneous discussions and team meetings in the workplace.
                </p>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0071e3',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}>
                  Explore Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Text Section */}
      <section style={{
        padding: '100px 0',
        background: '#000000'
      }}>
        <div className="tier3-container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#ffffff',
            lineHeight: 1.15
          }}>
            Sonic Hive Introduces Office Pods, Meeting Pods, and Phone Booths, Best of the Pods Dubai
          </h2>
          <p style={{
            fontSize: '19px',
            color: '#d2d2d7',
            lineHeight: 1.6,
            marginBottom: '0'
          }}>
            Looking for the perfect acoustic solution for your office? SonicHive brings you premium pods Dubai has never seen. And, it is designed to enhance privacy and productivity. SonicHive has it all. You can find office pods for focused work, meeting pods for discussions, and soundproof phone booths for calls. Our pods office solutions blend modern design with top acoustic tech. They are the best choice for any workspace. Explore the pod Dubai trusts for innovative and efficient workspaces.
          </p>
        </div>
      </section>


      {/* Explore Our Wide Range of Office Pods */}
      <section style={{
        padding: '100px 0',
        background: '#000000'
      }}>
        <div className="tier3-container">
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: '60px',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            Explore Our Wide Range of Office Pods
          </h2>

          {/* Solo Pod Detail */}
          <div id="solo-detail" style={{
            marginBottom: '100px',
            background: '#1d1d1f',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid #2d2d2f'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '60px',
              padding: '60px'
            }}>
              <div>
                <span style={{ 
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f56300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Office pod for 1 person
                </span>
                <h3 style={{ 
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  margin: '12px 0 20px',
                  color: '#ffffff'
                }}>
                  Solo Silence Booth
                </h3>
                <p style={{ 
                  fontSize: '17px',
                  color: '#d2d2d7',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  Private Booth for 1 person
                </p>
                <button 
                  className="tier3-btn-primary"
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Click here
                </button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px'
              }}>
                <img 
                  src="/assets/images/Office-telephone-booth-Sonic-Hive_22-600x480.webp"
                  alt="Solo booth view 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              padding: '0 60px 60px'
            }}>
              <img 
                src="/assets/images/office-Booth-Sonichive_21.webp"
                alt="Solo booth view 2"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/Phone-booth-dubai-photo-3-1024x819.webp"
                alt="Solo booth view 3"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/compressed_VR-3D-gray-Blue0000.png"
                alt="Solo booth 3D render"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  background: '#f5f5f7',
                  padding: '20px'
                }}
              />
            </div>
          </div>

          {/* Duo Pod Detail */}
          <div id="duo-detail" style={{
            marginBottom: '100px',
            background: '#1d1d1f',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid #2d2d2f'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '60px',
              padding: '60px'
            }}>
              <div>
                <span style={{ 
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f56300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Office Pod for 2 person
                </span>
                <h3 style={{ 
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  margin: '12px 0 20px',
                  color: '#ffffff'
                }}>
                  Duo Silence Booth
                </h3>
                <p style={{ 
                  fontSize: '17px',
                  color: '#d2d2d7',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  Office Pods for 2 person
                </p>
                <button 
                  className="tier3-btn-primary"
                  onClick={() => {
                    setSelectedProduct(products.find(p => p.id === 'duo') || products[0])
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Click here
                </button>
              </div>
              <div>
                <img 
                  src="/assets/images/Sonic-Hive-2-person-pods-sonichive-2-600x480.webp"
                  alt="Duo booth view 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              padding: '0 60px 60px'
            }}>
              <img 
                src="/assets/images/Sonic-Hive-2-person-pods-sonichive-4-600x480.webp"
                alt="Duo booth view 2"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/Sonic-Hive-2-person-pods-sonichive-3-600x480.webp"
                alt="Duo booth view 3"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/compressed_VR-3D-Orange-Blue0000.png"
                alt="Duo booth 3D render"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  background: '#f5f5f7',
                  padding: '20px'
                }}
              />
            </div>
          </div>

          {/* Quartet Pod Detail */}
          <div id="quartet-detail" style={{
            marginBottom: '100px',
            background: '#1d1d1f',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid #2d2d2f'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '60px',
              padding: '60px'
            }}>
              <div>
                <span style={{ 
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f56300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Quartet Silence Booth for 4 person
                </span>
                <h3 style={{ 
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  margin: '12px 0 20px',
                  color: '#ffffff'
                }}>
                  Quartet Silence Booth
                </h3>
                <p style={{ 
                  fontSize: '17px',
                  color: '#d2d2d7',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  Meeting Pods for 4 person
                </p>
                <button 
                  className="tier3-btn-primary"
                  onClick={() => {
                    setSelectedProduct(products.find(p => p.id === 'quad') || products[0])
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Click here
                </button>
              </div>
              <div>
                <img 
                  src="/assets/images/Office-pods-for-4-person_Sonichive-2-1024x819.webp"
                  alt="Quartet booth view 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              padding: '0 60px 60px'
            }}>
              <img 
                src="/assets/images/Office-pods-for-4-person_Sonichive-3-1024x819.webp"
                alt="Quartet booth view 2"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/sonichive-4-person-pods-dubai-3-1024x819.webp"
                alt="Quartet booth view 3"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/VR-3D-green-Blue0025-1-1024x1024.png"
                alt="Quartet booth 3D render"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  background: '#f5f5f7',
                  padding: '20px'
                }}
              />
            </div>
          </div>

          {/* Hexa Pod Detail */}
          <div id="hexa-detail" style={{
            background: '#1d1d1f',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid #2d2d2f'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '60px',
              padding: '60px'
            }}>
              <div>
                <span style={{ 
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f56300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Hexa silence booth for 6 person
                </span>
                <h3 style={{ 
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  margin: '12px 0 20px',
                  color: '#ffffff'
                }}>
                  Hexa Silence Booth
                </h3>
                <p style={{ 
                  fontSize: '17px',
                  color: '#d2d2d7',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  Meeting Pods for 6 person
                </p>
                <button 
                  className="tier3-btn-primary"
                  onClick={() => {
                    setSelectedProduct(products.find(p => p.id === 'team') || products[0])
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  }
                >
                  Click here
                </button>
              </div>
              <div>
                <img 
                  src="/assets/images/Office-booth-for-6-person_sonic-hive-3-600x480.webp"
                  alt="Hexa booth view 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              padding: '0 60px 60px'
            }}>
              <img 
                src="/assets/images/Office-booth-for-6-person_sonic-hive-2-600x480.webp"
                alt="Hexa booth view 2"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/Sonic-hive-meeting-room-image-7.webp"
                alt="Hexa booth view 3"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/assets/images/SRPW-XL-e1725016938325-1024x1015.png"
                alt="Hexa booth 3D render"
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  background: '#f5f5f7',
                  padding: '20px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Special Features */}
      <section id="features" style={{
        padding: '100px 0',
        background: '#000000'
      }}>
        <div className="tier3-container">
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            Step into a quieter world with Office Silence Booths, Acoustic Pods, and Soundproof Panels
          </h2>
          <p style={{
            fontSize: '19px',
            color: '#d2d2d7',
            textAlign: 'center',
            marginBottom: '60px',
            maxWidth: '900px',
            margin: '0 auto 60px'
          }}>
            For distraction-free work with Sonic Hive, Our Pods Special Features
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px'
          }}>
            {/* Low Carbon */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff'
              }}>
                Low carbon
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#d2d2d7',
                lineHeight: 1.6
              }}>
                A modern sound booth designed with sustainability in mind incorporates eco-friendly materials such as recycled acoustic panels and recycled plastic components. By utilizing recycled materials, particularly recycled plastics, the booth significantly reduces its environmental impact by diverting waste from landfills and minimizing the energy-intensive processes associated with producing virgin materials.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>

            {/* Adaptable */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1d1d1f'
              }}>
                Adaptable
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6e6e73',
                lineHeight: 1.6
              }}>
                Optimized with noise cancellation, the Sound Booth is designed for a variety of creative activities. It utilizes Solid works mechanics model to streamline assembly with a uniform fastener type, ensuring straightforward construction and efficiency.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>

            {/* Expertise */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1d1d1f'
              }}>
                Expertise
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6e6e73',
                lineHeight: 1.6
              }}>
                Enabling us to craft the most fitting office environments. Our commitment to innovation ensures with the largest acoustic lab in Asia, we excel not just in Office Pods but also in acoustic solutions, superior acoustic performance, enhancing workplace comfort and productivity.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>

            {/* Sound proof */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1d1d1f'
              }}>
                Sound proof
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6e6e73',
                lineHeight: 1.6
              }}>
                Incorporating advanced soundproofing materials and construction methods, the sound booth effectively minimizes sound leakage and external noise interference. This ensures a controlled acoustic environment conducive to high-quality audio recordings, meeting professional standards for clarity and fidelity.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>

            {/* Comfortable */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1d1d1f'
              }}>
                Comfortable
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6e6e73',
                lineHeight: 1.6
              }}>
                Designed for comfort, our sound booths offer an ideal environment for extended use. Equipped with supportive seating and spacious interiors, they provide a cozy and inviting atmosphere that promotes concentration and creativity. Enhanced ventilation ensures continuous airflow, while effective soundproofing minimizes external distractions.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>

            {/* Privacy */}
            <div style={{
              background: '#1d1d1f',
              borderRadius: '20px',
              padding: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #2d2d2f'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1d1d1f'
              }}>
                Privacy
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6e6e73',
                lineHeight: 1.6
              }}>
                Privacy is a fundamental feature of our sound booth design, ensuring secure environments for confidential discussions and focused work, thereby fostering productivity and peace of mind. Our booths are equipped with advanced soundproofing technology to further enhance confidentiality.
              </p>
              <button 
                className="tier3-btn-secondary"
                style={{ marginTop: '24px' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Ultimate Focus Section */}
      <section style={{
        padding: '100px 0',
        background: '#000000',
        textAlign: 'center'
      }}>
        <div className="tier3-container" style={{ maxWidth: '900px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#ffffff',
            lineHeight: 1.15
          }}>
            Experience ultimate focus in our Office Pods equipped with Soundproof Acoustic Panels and Acoustic Meeting Pods
          </h2>
          <p style={{
            fontSize: '19px',
            color: '#a1a1a6',
            lineHeight: 1.6,
            marginBottom: '40px'
          }}>
            for noise-free workspaces
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Our Best Selling Products in Dubai, UAE.
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                '1. Office Pods',
                '2. Meeting Pods & Booth',
                '3. Acoustic Panels',
                '4. Acoustic Echo Cancellation',
                '5. Phone Booth',
                '6. Acoustic ceiling',
                '7. Acoustic foam'
              ].map((item, idx) => (
                <li key={idx} style={{
                  fontSize: '17px',
                  color: '#f5f5f7',
                  padding: '12px 0',
                  borderBottom: idx < 6 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3D Experience Section */}
      <section id="experience" className="tier3-experience">
        <div className="tier3-experience-bg"></div>
        <div className="tier3-container-wide">
          <div className="tier3-section-header-center">
            <span className="tier3-section-label">Immersive Experience</span>
            <h2 className="tier3-section-title">Visualize Your Perfect Pod</h2>
            <p className="tier3-section-description">
              Explore every detail in stunning 3D. View in AR. Customize to perfection.
            </p>
          </div>

          <div className="tier3-experience-layout">
            <div className="tier3-viewer-section">
              {loading && (
                <div className="tier3-loading-overlay">
                  <div className="tier3-loading-spinner"></div>
                  <p>Loading 3D Experience...</p>
                </div>
              )}
              <div ref={mountRef} className="tier3-viewer-canvas" />

              <div className="tier3-view-modes">
                <button
                  className={`tier3-view-mode ${viewMode === '3d' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('3d')
                    if (handle) {
                      handle.setAutoRotate(true)
                    }
                  }}
                >
                  <span>🔄</span> 3D View
                </button>
                <button
                  className={`tier3-view-mode ${viewMode === 'ar' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('ar')
                    if (handle) {
                      handle.setAutoRotate(false)
                    }
                  }}
                >
                  <span>📱</span> AR View
                </button>
                <button
                  className={`tier3-view-mode ${viewMode === 'blueprint' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('blueprint')
                    if (handle) {
                      handle.setAutoRotate(false)
                    }
                  }}
                >
                  <span>📐</span> Blueprint
                </button>
              </div>

              {viewMode === 'blueprint' && (
                <div className="tier3-blueprint-overlay">
                  <span className="tier3-dimension top">2.2m H</span>
                  <span className="tier3-dimension right">1.2m W</span>
                  <span className="tier3-dimension bottom">1.0m D</span>
                </div>
              )}
            </div>

            <div className="tier3-config-panel">
              <h3 className="tier3-config-title">Select Your Pod</h3>
              
              <div className="tier3-product-grid">
                {products.map((product) => (
                  <button
                    key={product.id}
                    className={`tier3-product-selector ${selectedProduct.id === product.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedProduct(product)
                      if (handle) {
                        handle.resetView()
                        handle.setAutoRotate(true)
                      }
                    }}
                  >
                    <div className="tier3-selector-info">
                      <strong>{product.name}</strong>
                      <small>{product.capacity}</small>
                    </div>
                    {selectedProduct.id === product.id && (
                      <span className="tier3-selector-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="tier3-product-info-panel">
                <h4>{selectedProduct.name}</h4>
                <p className="tier3-info-tagline">{selectedProduct.tagline}</p>

                <div className="tier3-info-tabs">
                  <button
                    className={`tier3-info-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`tier3-info-tab ${activeTab === 'specs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    Specifications
                  </button>
                  <button
                    className={`tier3-info-tab ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                  >
                    Features
                  </button>
                </div>

                <div className="tier3-info-content">
                  {activeTab === 'overview' && (
                    <p className="tier3-info-text">{selectedProduct.description}</p>
                  )}
                  {activeTab === 'specs' && (
                    <div className="tier3-specs-grid">
                      {selectedProduct.specs.map((spec, idx) => (
                        <div key={idx} className="tier3-spec-item">
                          <span className="tier3-spec-label">{spec.label}</span>
                          <span className="tier3-spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'features' && (
                    <ul className="tier3-features-list-clean">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="tier3-feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button className="tier3-btn-primary full-width">Request Custom Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Integration Section */}
      <section style={{
        padding: '120px 0',
        background: '#000000',
        position: 'relative'
      }}>
        <div className="tier3-container">
          <div className="tier3-section-header-center">
            <span className="tier3-section-label">Integration</span>
            <h2 className="tier3-section-title">
              Designed to fit
              <br />
              seamlessly into any space.
            </h2>
            <p className="tier3-section-description">
              From open-plan offices to collaborative hubs, our pods adapt to your workflow
            </p>
          </div>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <img 
              src="/assets/images/Screenshot-2024-11-13-122514.webp"
              alt="Office Layout Integration"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
              }}
            />
          </div>
          
          {/* Trusted By Brands - Infinite Carousel */}
          <div style={{
            marginTop: '80px',
            textAlign: 'center',
            overflow: 'hidden'
          }}>
            <p style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 700,
              color: '#86868b',
              marginBottom: '48px'
            }}>
              Trusted by Industry Leaders
            </p>
            <div style={{
              overflow: 'hidden',
              position: 'relative',
              width: '100%'
            }}>
              <div className="client-carousel" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '80px',
                willChange: 'transform'
              }}>
                <img src="/assets/images/acer-2.png" alt="Acer" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s', flexShrink: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'grayscale(100%)' }}
                />
                <img src="/assets/images/pepsi.png" alt="Pepsi" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s', flexShrink: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'grayscale(100%)' }}
                />
                <img src="/assets/images/sams-2.png" alt="Sam's Club" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s', flexShrink: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'grayscale(100%)' }}
                />
                <img src="/assets/images/standard-chartered-2.png" alt="Standard Chartered" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s', flexShrink: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'grayscale(100%)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Integration Description Section */}
      <section style={{
        padding: '100px 0',
        background: '#000000'
      }}>
        <div className="tier3-container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
          <img 
            src="/assets/images/23-10-2024-18_27_04.webp"
            alt="Modern Office Environment with Pods"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
              marginBottom: '40px'
            }}
          />
          <p style={{
            fontSize: '17px',
            color: '#d2d2d7',
            lineHeight: 1.7,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            Sonic Hive is the leading supplier in the UAE for a wide range of office booths and pods designed to enhance focus and productivity. Our innovative offerings include Acoustic Soundproof Pods, Silence Pods, and Smart Pods that provide the ultimate in noise reduction for any workspace. From Work Pods and Phone Pods to Office Meeting Pods and Soundproof Pods, we have the perfect solution for every need. We also specialize in Telephone Booths and Meeting Pods suitable for privacy and comfort, helping you create an ideal work environment. Trust SonicHive as your reliable Office Soundproof Booth supplier in Dubai for high-quality, acoustically optimized office pods and acoustic booths.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '100px 0',
        background: '#000000'
      }}>
        <div className="tier3-container">
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              Contact Us
            </h2>
            <p style={{
              fontSize: '17px',
              color: '#d2d2d7',
              textAlign: 'center',
              marginBottom: '48px'
            }}>
              Get in touch with our team for a personalized consultation and quote
            </p>

            <div style={{
              display: 'grid',
              gap: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  Your Name
                </label>
                <input 
                  type="text"
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    border: '1px solid #424245',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    background: '#1d1d1f',
                    color: '#ffffff'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0071e3'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#424245'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  Your Email
                </label>
                <input 
                  type="email"
                  placeholder="Your Email"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    border: '1px solid #424245',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    background: '#1d1d1f',
                    color: '#ffffff'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0071e3'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#424245'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  Your Phone Number
                </label>
                <input 
                  type="tel"
                  placeholder="Your Phone Number"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    border: '1px solid #424245',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    background: '#1d1d1f',
                    color: '#ffffff'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0071e3'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#424245'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  Your Location
                </label>
                <input 
                  type="text"
                  placeholder="Your Location"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    border: '1px solid #424245',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit',
                    background: '#1d1d1f',
                    color: '#ffffff'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0071e3'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#424245'}
                />
              </div>

              <button 
                className="tier3-btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '8px',
                  fontSize: '17px'
                }}
                onClick={() => window.open(`mailto:${contactInfo.email}?subject=Quote Request - SonicHive`)}
              >
                Get A Quote
              </button>
            </div>

            {/* Contact Info */}
            <div style={{
              marginTop: '60px',
              padding: '40px',
              background: '#1d1d1f',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid #424245'
            }}>
              <h3 style={{
                fontSize: '21px',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#ffffff'
              }}>
                Contact Info
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                fontSize: '16px',
                color: '#ffffff'
              }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d7' }}>UAE</strong>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} style={{ color: '#2997ff', textDecoration: 'none' }}>
                    {contactInfo.phone}
                  </a>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d7' }}>Email</strong>
                  <a href={`mailto:${contactInfo.email}`} style={{ color: '#2997ff', textDecoration: 'none' }}>
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#000000',
        padding: '80px 0 40px',
        color: '#f5f5f7'
      }}>
        <div className="tier3-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '60px',
            marginBottom: '60px'
          }}>
            <div>
              <img 
                src="/assets/images/Scnichive-2-300x63.png" 
                alt="SonicHive" 
                style={{ height: '28px', width: 'auto', marginBottom: '16px', filter: 'brightness(0) invert(1)', opacity: 0.8 }}
              />
              <p style={{ fontSize: '15px', color: '#a1a1a6', lineHeight: 1.6, marginBottom: '12px' }}>
                {companyInfo.tagline}
              </p>
              <p style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.6 }}>
                Leading supplier of premium soundproof office pods across UAE, Qatar, KSA & New Zealand
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                color: '#f5f5f7'
              }}>
                Products
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#solo-detail" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Solo silence booth
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#duo-detail" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Duo silence booth
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#quartet-detail" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Quartet silence booth
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#hexa-detail" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Hexa silence booth
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                color: '#f5f5f7'
              }}>
                Menu
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#hero" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Home
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#products" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    About Us
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#contact" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Contact Us
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ fontSize: '14px', color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0071e3'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                color: '#f5f5f7'
              }}>
                Contact Us
              </h4>
              <p style={{ fontSize: '14px', color: '#a1a1a6', marginBottom: '12px' }}>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} style={{ color: '#a1a1a6', textDecoration: 'none' }}>
                  {contactInfo.phone}
                </a>
              </p>
              <p style={{ fontSize: '14px', color: '#a1a1a6', marginBottom: '24px' }}>
                <a href={`mailto:${contactInfo.email}`} style={{ color: '#a1a1a6', textDecoration: 'none' }}>
                  {contactInfo.email}
                </a>
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                <a href={contactInfo.social.facebook || '#'} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span style={{ color: '#f5f5f7' }}>f</span>
                </a>
                <a href={contactInfo.social.linkedin} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span style={{ color: '#f5f5f7' }}>in</span>
                </a>
                <a href={contactInfo.social.instagram} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span style={{ color: '#f5f5f7' }}>ig</span>
                </a>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#86868b'
          }}>
            <p>Copyright © SoundBox all rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Tier Badge */}
      <div className="tier-badge-overlay tier3-badge">
        <span className="badge-icon">🥇</span>
        <span>Tier 3: Ultra</span>
      </div>
    </div>
  )
}
