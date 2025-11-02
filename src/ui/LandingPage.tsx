// src/ui/LandingPage.tsx - SonicHive SOW Landing Page
import React, { useState, useEffect, useRef } from 'react'

interface LandingPageProps {
  onNavigate: (page: string) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [loading, setLoading] = useState(true)
  const [videoOpacity, setVideoOpacity] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Try to play video when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          console.log('Video element found. Source:', videoRef.current.src)
          console.log('Attempting to play video...')
          videoRef.current.load() // Force reload
          await videoRef.current.play()
          console.log('Video is playing!')
        } catch (error) {
          console.error('Autoplay failed:', error)
          // If autoplay fails, still hide loading screen after delay
          setTimeout(() => setLoading(false), 3000)
        }
      } else {
        console.error('Video ref is null')
      }
    }

    // Small delay to ensure video element is ready
    const timer = setTimeout(playVideo, 200)
    
    // Also add a maximum timeout
    const maxTimer = setTimeout(() => {
      console.log('Max timeout reached, hiding loading screen')
      setLoading(false)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(maxTimer)
    }
  }, [])

  return (
    <div className="landing-page" style={{
      background: '#000000',
      minHeight: '100vh',
      color: '#f5f5f7'
    }}>
      {/* Loading Animation - Website Loader */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#000000',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: videoOpacity < 0.05 ? 0 : 1,
          transition: 'opacity 1s ease-out'
        }}>
          {/* Pure Black Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000000',
            zIndex: 0
          }} />
          
          {/* Loader Container - Full Screen */}
          <div style={{
            position: 'relative',
            width: '90vw',
            height: '90vh',
            maxWidth: '1200px',
            maxHeight: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Giant Logo - Luminosity Blend */}
            <img 
              src="/assets/main/vulf-logo.png" 
              alt="Vulf Interactive" 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 1,
                zIndex: 1,
                mixBlendMode: 'luminosity'
              }}
            />
            
            {/* Video - Luminosity Blend */}
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              onCanPlay={() => {
                console.log('Video can play')
              }}
              onPlay={() => {
                console.log('Video started playing')
              }}
              onTimeUpdate={(e) => {
                const video = e.currentTarget
                if (!video.duration) return
                
                const progress = video.currentTime / video.duration
                
                // Start fading video out at 60% progress for smoother transition
                if (progress > 0.6) {
                  const fadeProgress = (progress - 0.6) / 0.4 // 0 to 1 over last 40%
                  // Use ease-out curve for more natural fade
                  const easedProgress = 1 - Math.pow(1 - fadeProgress, 2)
                  const newOpacity = 1 - easedProgress
                  setVideoOpacity(newOpacity)
                }
              }}
              onEnded={() => {
                console.log('Video ended, hiding loading screen')
                setVideoOpacity(0)
                setTimeout(() => setLoading(false), 1500)
              }}
              onError={(e) => {
                console.error('Video error:', e)
                // Hide loading screen if video fails
                setTimeout(() => setLoading(false), 1000)
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 2,
                opacity: videoOpacity,
                mixBlendMode: 'luminosity',
                transition: 'opacity 0.1s linear'
              }}
            >
              <source src="/assets/main/load.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Loading Text (Optional) */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.8,
            animation: 'fadeInOut 2s ease-in-out infinite',
            zIndex: 3
          }}>
            Loading Experience...
          </div>
          
          <style>{`
            @keyframes fadeInOut {
              0%, 100% {
                opacity: 0.4;
              }
              50% {
                opacity: 0.9;
              }
            }
          `}</style>
        </div>
      )}

      {/* Premium Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(13, 255, 157, 0.2)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img 
              src="/assets/main/vulf-logo.png" 
              alt="Vulf Interactive" 
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center'
          }}>
            <a href="#sow" style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#f5f5f7',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0dff9d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f5f5f7'}
            >
              Pricing
            </a>
            <a href="#demo" style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#f5f5f7',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0dff9d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#f5f5f7'}
            >
              Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: '60px' }}></div>

      {/* Hero Section */}
      <section style={{
        padding: '120px 24px 80px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #000000 0%, #0a1210 100%)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 300,
            color: '#0dff9d',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '24px',
            display: 'block',
            fontFamily: "'Silkscreen', monospace"
          }}>
            VULF INTERACTIVE
          </span>
          <h1 style={{
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 900,
            margin: '0 0 24px',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>
            Virtually Unveiling<br />Limitless Future
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#0dff9d',
            lineHeight: 1.5,
            maxWidth: '700px',
            margin: '0 auto 48px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 300,
            fontFamily: "'Silkscreen', monospace"
          }}>
            Weave Immersive Digital Experiences
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => document.getElementById('sow')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: 700,
                background: '#0dff9d',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(13, 255, 157, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View Pricing →
            </button>
            <button
              onClick={() => onNavigate('demo')}
              style={{
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: 700,
                background: 'transparent',
                color: '#0dff9d',
                border: '2px solid #0dff9d',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(13, 255, 157, 0.1)'
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(13, 255, 157, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Scope of Work (SOW) Section */}
      <section id="sow" style={{
        padding: '120px 24px',
        background: '#000000',
        color: '#f5f5f7'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#0dff9d',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontFamily: "'Silkscreen', monospace"
            }}>
              Professional Services
            </span>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 900,
              margin: '16px 0 24px',
              color: '#ffffff',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}>
              Scope of Work (SOW)
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#0dff9d',
              maxWidth: '700px',
              margin: '0 auto',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 300,
              fontFamily: "'Silkscreen', monospace"
            }}>
              SonicHive 3D Interactive Product Configurator Website with AR
            </p>
          </div>

          {/* Project Objective */}
          <div style={{
            background: 'rgba(13, 255, 157, 0.05)',
            border: '1px solid rgba(13, 255, 157, 0.2)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '60px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Project Objective
            </h3>
            <div style={{
              fontSize: '16px',
              color: '#f5f5f7',
              lineHeight: 1.8
            }}>
              <p style={{ marginBottom: '16px' }}>
                To design and develop a <strong style={{ color: '#0dff9d' }}>fully interactive 3D product configurator website</strong> that allows users to:
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '16px'
              }}>
                {[
                  'Interact with SonicHive\'s soundproof pods in real-time 3D',
                  'Customize colors, materials, and layouts',
                  'Visualize pods in Augmented Reality (AR)',
                  'Experience brand storytelling through animations and immersive UI/UX'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#0dff9d', fontSize: '18px', flexShrink: 0 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ color: '#a1a1a6', fontSize: '15px' }}>
                The aim is to establish SonicHive as a <strong style={{ color: '#0dff9d' }}>futuristic workspace solutions brand</strong> through cutting-edge digital presentation.
              </p>
            </div>
          </div>

          {/* Project Phases Overview */}
          <div style={{
            marginBottom: '60px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '32px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Project Phases Overview
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {[
                { phase: '1', scope: '3D Production Pipeline', output: 'All product models ready for integration', duration: '3 Weeks' },
                { phase: '2', scope: 'Web Design & Development', output: 'Complete interactive website with AR', duration: '4–6 Weeks' },
                { phase: '3', scope: 'QA, Optimization & Deployment', output: 'Testing, compression, and live launch', duration: '1 Week' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(13, 255, 157, 0.5)'
                  e.currentTarget.style.background = 'rgba(13, 255, 157, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#0dff9d',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 700
                    }}>
                      {item.phase}
                    </div>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: 0
                    }}>
                      {item.scope}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#a1a1a6',
                    marginBottom: '12px',
                    lineHeight: 1.6
                  }}>
                    {item.output}
                  </p>
                  <div style={{
                    fontSize: '13px',
                    color: '#0dff9d',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Tiers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}>
            {[
              {
                tier: 'LIGHT',
                desc: 'Basic 3D + AR website',
                price: '45,000 – 65,000 AED',
                duration: '6 Weeks',
                features: ['Basic model import + cleanup', 'Simple material setup', 'Single-page layout', 'Static model viewer', 'Basic USDZ/WebXR AR', '30-day support']
              },
              {
                tier: 'STANDARD',
                desc: 'Color config + animation',
                price: '85,000 – 110,000 AED',
                duration: '8 Weeks',
                features: ['Full re-topology + optimization', 'PBR materials + variants', '1 animation (door/light)', 'Color switcher interface', 'Dual platform AR', '45-day support']
              },
              {
                tier: 'ULTRA',
                desc: 'Full configurator + glassmorphism UI',
                price: '150,000 – 200,000 AED',
                duration: '10 Weeks',
                features: ['Detailed optimization + animation-ready', 'PBR + reflective + emission shaders', 'Multi-stage storytelling animations', 'Color + material + blueprint + callouts', 'Custom blueprint-scale AR', '90-day support'],
                recommended: true
              }
            ].map((tier, idx) => (
              <div key={idx} style={{
                background: tier.recommended ? 'linear-gradient(135deg, #0a2618 0%, #0d3320 100%)' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: tier.recommended ? '2px solid #0dff9d' : '1px solid rgba(13, 255, 157, 0.2)',
                borderRadius: '16px',
                padding: '40px',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(13, 255, 157, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                {tier.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    background: '#0dff9d',
                    color: '#000000',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    Recommended
                  </div>
                )}
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 900,
                  color: tier.recommended ? '#0dff9d' : '#ffffff',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  {tier.tier}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#a1a1a6',
                  marginBottom: '24px'
                }}>
                  {tier.desc}
                </p>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  {tier.price}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#86868b',
                  marginBottom: '32px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {tier.duration}
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '14px',
                      color: '#f5f5f7'
                    }}>
                      <span style={{ color: '#34c759', fontSize: '18px', flexShrink: 0 }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    width: '100%',
                    marginTop: '32px',
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: tier.recommended ? '#0dff9d' : 'transparent',
                    color: tier.recommended ? '#000000' : '#0dff9d',
                    border: tier.recommended ? 'none' : '2px solid #0dff9d',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(13, 255, 157, 0.5)'
                    if (!tier.recommended) {
                      e.currentTarget.style.background = 'rgba(13, 255, 157, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                    if (!tier.recommended) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          {/* Payment Terms */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '60px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '32px'
            }}>
              Payment Terms
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px'
            }}>
              {[
                { stage: 'Stage 1 – Kickoff', deliverable: 'Modeling + UI/UX Approval', payment: '30%' },
                { stage: 'Stage 2 – Mid Development', deliverable: 'Configurator + Frontend Integration', payment: '40%' },
                { stage: 'Stage 3 – Final Delivery', deliverable: 'Launch + Documentation', payment: '30%' }
              ].map((term, idx) => (
                <div key={idx} style={{
                  background: 'rgba(13, 255, 157, 0.1)',
                  border: '1px solid rgba(13, 255, 157, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(13, 255, 157, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(13, 255, 157, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(13, 255, 157, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(13, 255, 157, 0.3)'
                }}
                >
                  <div style={{
                    fontSize: '42px',
                    fontWeight: 900,
                    color: '#0dff9d',
                    marginBottom: '8px'
                  }}>
                    {term.payment}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '8px'
                  }}>
                    {term.stage}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#a1a1a6'
                  }}>
                    {term.deliverable}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Production Pipeline */}
          <div style={{
            marginTop: '80px',
            paddingTop: '60px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '48px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              3D Production Pipeline
            </h3>
            <div style={{
              display: 'grid',
              gap: '32px'
            }}>
              {[
                {
                  title: 'Modeling',
                  description: 'Create optimized, web-ready 3D models of SonicHive\'s pods',
                  deliverables: ['5–10 optimized GLB + USDZ models', 'Source FBX/Blend project files'],
                  tiers: [
                    { tier: 'Light', detail: 'Basic model import + cleanup', cost: '6,000 AED', time: '1 week' },
                    { tier: 'Standard', detail: 'Full re-topology + optimization', cost: '10,000 AED', time: '1 week' },
                    { tier: 'Ultra', detail: 'Detailed optimization + animation-ready rig', cost: '15,000 AED', time: '1 week' }
                  ]
                },
                {
                  title: 'Texturing & Shading',
                  description: 'Realistic surface finishes with optimized PBR workflows',
                  deliverables: ['2K texture maps (PBR)', 'Preview renders for approval'],
                  tiers: [
                    { tier: 'Light', detail: 'Basic material setup', cost: '5,000 AED', time: '3 days' },
                    { tier: 'Standard', detail: 'PBR materials + color variants', cost: '8,000 AED', time: '4 days' },
                    { tier: 'Ultra', detail: 'PBR + reflective + emission shaders', cost: '12,000 AED', time: '5 days' }
                  ]
                },
                {
                  title: 'Animation & Interactivity',
                  description: 'Add realism and storytelling motion to products',
                  deliverables: ['Animate doors, lighting panels, or rotations', 'Export animations to GLTF with triggers'],
                  tiers: [
                    { tier: 'Light', detail: 'None', cost: '—', time: '—' },
                    { tier: 'Standard', detail: '1 animation (door/light)', cost: '5,000 AED', time: '3 days' },
                    { tier: 'Ultra', detail: 'Multi-stage storytelling animations', cost: '10,000 AED', time: '5 days' }
                  ]
                }
              ].map((section, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px'
                }}>
                  <h4 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0dff9d',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: '#a1a1a6',
                    marginBottom: '20px',
                    lineHeight: 1.6
                  }}>
                    {section.description}
                  </p>
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: '#86868b',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                      Deliverables:
                    </div>
                    {section.deliverables.map((item, i) => (
                      <div key={i} style={{
                        fontSize: '14px',
                        color: '#f5f5f7',
                        marginBottom: '6px',
                        paddingLeft: '16px'
                      }}>
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {section.tiers.map((t, i) => (
                      <div key={i} style={{
                        background: 'rgba(13, 255, 157, 0.05)',
                        border: '1px solid rgba(13, 255, 157, 0.2)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#0dff9d',
                          fontWeight: 700,
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {t.tier}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#f5f5f7',
                          marginBottom: '8px',
                          lineHeight: 1.4
                        }}>
                          {t.detail}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          color: '#86868b'
                        }}>
                          <span>{t.cost}</span>
                          <span>{t.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Website Development Pipeline */}
          <div style={{
            marginTop: '80px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '48px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Website Development Pipeline
            </h3>
            <div style={{
              display: 'grid',
              gap: '32px'
            }}>
              {[
                {
                  title: 'UI/UX Design',
                  description: 'Create a visually strong and responsive brand interface',
                  deliverables: ['Wireframes & sitemap', 'High-fidelity mockups (Figma)', 'Style guide & animation direction'],
                  tiers: [
                    { tier: 'Light', detail: 'Minimal, static', cost: '5,000 AED', time: '1 week' },
                    { tier: 'Standard', detail: 'Dynamic transitions', cost: '10,000 AED', time: '1 week' },
                    { tier: 'Ultra', detail: 'Advanced glassmorphism + motion UI', cost: '15,000 AED', time: '1 week' }
                  ]
                },
                {
                  title: 'Frontend Development',
                  description: 'Responsive, interactive multi-device experience with React + Three.js',
                  deliverables: ['Implement sections', 'Integrate 3D viewer', 'Optimize for performance'],
                  tiers: [
                    { tier: 'Light', detail: 'Single-page layout, basic viewer', cost: '15,000 AED', time: '1.5 weeks' },
                    { tier: 'Standard', detail: 'Multi-page + animation transitions', cost: '20,000 AED', time: '2 weeks' },
                    { tier: 'Ultra', detail: 'Multi-page + reactive UI + parallax', cost: '30,000 AED', time: '3 weeks' }
                  ]
                },
                {
                  title: '3D Integration & Configuration',
                  description: 'Connect UI logic to 3D configurator for customization',
                  deliverables: ['Integrate GLB/GLTF assets', 'Color/material controls', 'Camera focus and transitions'],
                  tiers: [
                    { tier: 'Light', detail: 'Static model viewer', cost: '5,000 AED', time: '3 days' },
                    { tier: 'Standard', detail: 'Color switcher + 1 animation', cost: '10,000 AED', time: '1 week' },
                    { tier: 'Ultra', detail: 'Color + material + blueprint + callouts', cost: '20,000 AED', time: '2 weeks' }
                  ]
                },
                {
                  title: 'AR Integration',
                  description: 'Enable AR product visualization on iOS and Android',
                  deliverables: ['USDZ (iOS) + WebXR (Android)', '"View in Your Space" button', 'Fallbacks for non-AR browsers'],
                  tiers: [
                    { tier: 'Light', detail: 'Basic USDZ/WebXR', cost: '5,000 AED', time: '3 days' },
                    { tier: 'Standard', detail: 'Dual platform AR', cost: '7,000 AED', time: '4 days' },
                    { tier: 'Ultra', detail: 'Custom blueprint-scale AR experience', cost: '10,000 AED', time: '5 days' }
                  ]
                }
              ].map((section, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px'
                }}>
                  <h4 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0dff9d',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: '#a1a1a6',
                    marginBottom: '20px',
                    lineHeight: 1.6
                  }}>
                    {section.description}
                  </p>
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: '#86868b',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                      Deliverables:
                    </div>
                    {section.deliverables.map((item, i) => (
                      <div key={i} style={{
                        fontSize: '14px',
                        color: '#f5f5f7',
                        marginBottom: '6px',
                        paddingLeft: '16px'
                      }}>
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {section.tiers.map((t, i) => (
                      <div key={i} style={{
                        background: 'rgba(13, 255, 157, 0.05)',
                        border: '1px solid rgba(13, 255, 157, 0.2)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#0dff9d',
                          fontWeight: 700,
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {t.tier}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#f5f5f7',
                          marginBottom: '8px',
                          lineHeight: 1.4
                        }}>
                          {t.detail}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          color: '#86868b'
                        }}>
                          <span>{t.cost}</span>
                          <span>{t.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Timeline */}
          <div style={{
            marginTop: '80px',
            background: 'rgba(13, 255, 157, 0.05)',
            border: '1px solid rgba(13, 255, 157, 0.2)',
            borderRadius: '16px',
            padding: '40px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '32px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Project Timeline
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {[
                { week: '1', deliverable: 'Wireframes & 3D references' },
                { week: '2', deliverable: 'Modeling + Texturing' },
                { week: '3', deliverable: 'Animation + Optimization' },
                { week: '4', deliverable: 'UI/UX + Frontend setup' },
                { week: '5–6', deliverable: '3D integration + Configurator' },
                { week: '7', deliverable: 'AR integration & Testing' },
                { week: '8–10', deliverable: 'Final QA, Optimization, Launch' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    minWidth: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    background: '#0dff9d',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    Week<br/>{item.week}
                  </div>
                  <div style={{
                    paddingTop: '8px'
                  }}>
                    <div style={{
                      fontSize: '15px',
                      color: '#f5f5f7',
                      lineHeight: 1.5
                    }}>
                      {item.deliverable}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Out of Scope */}
          <div style={{
            marginTop: '60px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '40px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Out of Scope
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {[
                'Product modeling beyond listed units',
                'Native app or e-commerce integrations',
                'Continuous marketing or SEO campaigns',
                'Major design revamps post-approval',
                'Hosting and domain renewal fees'
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <span style={{ color: '#ff4444', fontSize: '18px', flexShrink: 0 }}>✕</span>
                  <span style={{
                    fontSize: '14px',
                    color: '#a1a1a6',
                    lineHeight: 1.5
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{
            textAlign: 'center',
            paddingTop: '60px',
            marginTop: '60px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#86868b',
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Technical Stack
            </h4>
            <p style={{
              fontSize: '16px',
              color: '#f5f5f7',
              lineHeight: 1.8,
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              React • Three.js • Vite • Tailwind CSS • GSAP • Framer Motion • Blender → GLTF/GLB + USDZ • Quick Look (iOS) • WebXR (Android) • Vercel/AWS/DigitalOcean
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #0a1210 0%, #000000 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 300,
            color: '#0dff9d',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '24px',
            display: 'block',
            fontFamily: "'Silkscreen', monospace"
          }}>
            Experience It Live
          </span>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            margin: '0 0 24px',
            color: '#ffffff',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            letterSpacing: '0.02em'
          }}>
            Interactive Demo
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#0dff9d',
            lineHeight: 1.5,
            marginBottom: '48px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 300,
            fontFamily: "'Silkscreen', monospace"
          }}>
            See the Ultra Premium tier in action with our fully interactive 3D product configurator
          </p>
          <button
            onClick={() => onNavigate('demo')}
            style={{
              padding: '20px 48px',
              fontSize: '14px',
              fontWeight: 700,
              background: '#0dff9d',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(13, 255, 157, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Launch Demo →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 24px',
        background: '#000000',
        borderTop: '1px solid rgba(13, 255, 157, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <img 
              src="/assets/main/vulf-logo.png" 
              alt="Vulf Interactive" 
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <p style={{
            fontSize: '14px',
            color: '#0dff9d',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 300,
            fontFamily: "'Silkscreen', monospace"
          }}>
            VULF Interactive
          </p>
          <p style={{
            fontSize: '13px',
            color: '#86868b',
            marginBottom: '24px'
          }}>
            Transforming reality through immersive digital experiences
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '13px',
              color: '#a1a1a6'
            }}>
              Project: SonicHive 3D Configurator
            </span>
            <span style={{
              fontSize: '13px',
              color: '#a1a1a6'
            }}>
              Proposal Date: November 2025
            </span>
          </div>
          <p style={{
            fontSize: '12px',
            color: '#86868b'
          }}>
            © 2025 Vulf Interactive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
