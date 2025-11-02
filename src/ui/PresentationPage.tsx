// src/ui/PresentationPage.tsx - Interactive SOW Presentation
import React, { useState, useEffect } from 'react'

interface PresentationPageProps {
  onNavigate: (page: string) => void
}

export default function PresentationPage({ onNavigate }: PresentationPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 5 // Cover + 3 tiers + Contact

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1)
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="presentation-wrapper">
      {/* Slide Indicator */}
      <div className="slide-indicator">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slide Number */}
      <div className="slide-number">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button className="slide-nav prev" onClick={prevSlide}>
          <span>←</span>
        </button>
      )}
      {currentSlide < totalSlides - 1 && (
        <button className="slide-nav next" onClick={nextSlide}>
          <span>→</span>
        </button>
      )}

      {/* Exit Button */}
      <button className="exit-presentation" onClick={() => onNavigate('home')}>
        <span>✕</span>
      </button>

      {/* Slides Container */}
      <div 
        className="slides-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 0: Cover / Overview */}
        <div className="presentation-slide slide-cover">
          <div className="slide-content">
            <div className="cover-badge">
              <span className="badge-icon">🏢</span>
              <span>Exclusive Proposal</span>
            </div>
            <h1 className="cover-title">
              SonicHive
              <span className="title-highlight">Interactive 3D Experience</span>
            </h1>
            <p className="cover-subtitle">
              A next-generation product configurator with AR integration
            </p>
            <div className="cover-meta">
              <div className="meta-row">
                <span className="meta-label">Prepared by</span>
                <span className="meta-value">VULF Interactive / Wesualize Studios</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">For</span>
                <span className="meta-value">SonicHive, UAE</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Timeline</span>
                <span className="meta-value">6-10 Weeks</span>
              </div>
            </div>
            <div className="tier-preview">
              <div className="tier-preview-item" onClick={() => onNavigate('demo')}>
                <div className="tier-icon">🥉</div>
                <div className="tier-name">Basic</div>
                <div className="tier-price">AED 50-70K</div>
                <div className="demo-badge-small">View Demo →</div>
              </div>
              <div className="tier-preview-item" onClick={() => onNavigate('demo')}>
                <div className="tier-icon">🥈</div>
                <div className="tier-name">Medium</div>
                <div className="tier-price">AED 90-120K</div>
                <div className="demo-badge-small">View Demo →</div>
              </div>
              <div className="tier-preview-item popular" onClick={() => onNavigate('tier3')}>
                <div className="popular-tag">Recommended</div>
                <div className="tier-icon">🥇</div>
                <div className="tier-name">Ultra</div>
                <div className="tier-price">AED 150-220K</div>
                <div className="demo-badge-small">View Demo →</div>
              </div>
            </div>
            <button className="next-slide-btn" onClick={nextSlide}>
              Start Presentation →
            </button>
          </div>
        </div>

        {/* Slide 1: Tier 1 - Basic Plan */}
        <div className="presentation-slide slide-tier tier-basic">
          <div className="slide-content">
            <div className="tier-header-slide">
              <div className="tier-badge">
                <span className="tier-icon-large">🥉</span>
                <span className="tier-label">Tier 1</span>
              </div>
              <h2 className="tier-title-slide">Basic Plan</h2>
              <p className="tier-subtitle-slide">Single-Page Static Website with 3D & AR</p>
              <div className="tier-price-slide">
                <span className="price-currency">AED</span>
                <span className="price-amount">50,000 - 70,000</span>
                <span className="price-timeline">6-8 Weeks</span>
              </div>
            </div>

            <div className="tier-content-grid">
              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">✨</span>
                  What You Get
                </h3>
                <ul className="feature-list-slide">
                  <li>✓ Landing page with embedded 3D viewer</li>
                  <li>✓ 10 soundproof pod models in 3D (GLB format)</li>
                  <li>✓ AR Quick Look integration (iOS & Android)</li>
                  <li>✓ Basic UI with product info & specs</li>
                  <li>✓ Responsive design (desktop & mobile)</li>
                  <li>✓ Hosting, deployment & SSL configuration</li>
                  <li>✓ 30-day post-launch support</li>
                </ul>
              </div>

              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">📦</span>
                  Deliverables
                </h3>
                <div className="deliverables-cards">
                  <div className="deliverable-card">
                    <div className="deliverable-icon">⚛️</div>
                    <div className="deliverable-title">React Website</div>
                    <div className="deliverable-desc">Single-page 3D site</div>
                  </div>
                  <div className="deliverable-card">
                    <div className="deliverable-icon">🎨</div>
                    <div className="deliverable-title">3D Models</div>
                    <div className="deliverable-desc">10 GLB + USDZ files</div>
                  </div>
                  <div className="deliverable-card">
                    <div className="deliverable-icon">📱</div>
                    <div className="deliverable-title">AR Integration</div>
                    <div className="deliverable-desc">iOS & Android</div>
                  </div>
                  <div className="deliverable-card">
                    <div className="deliverable-icon">🚀</div>
                    <div className="deliverable-title">Deployment</div>
                    <div className="deliverable-desc">Live on your domain</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tier-demo-preview">
              <div className="demo-label">Example: Basic 3D Viewer</div>
              <div className="demo-mockup">
                <div className="mockup-browser">
                  <div className="browser-bar">
                    <div className="browser-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="browser-url">sonichive.com</div>
                  </div>
                  <div className="browser-content">
                    <div className="viewer-mockup">
                      <div className="model-placeholder">🏢</div>
                      <div className="viewer-controls-mockup">
                        <button>Rotate</button>
                        <button>Zoom</button>
                        <button className="ar-btn">View in AR</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Tier 2 - Medium Plan */}
        <div className="presentation-slide slide-tier tier-medium">
          <div className="slide-content">
            <div className="tier-header-slide">
              <div className="tier-badge">
                <span className="tier-icon-large">🥈</span>
                <span className="tier-label">Tier 2</span>
              </div>
              <h2 className="tier-title-slide">Medium Plan</h2>
              <p className="tier-subtitle-slide">Multi-Page Website with Basic Configurator</p>
              <div className="tier-price-slide">
                <span className="price-currency">AED</span>
                <span className="price-amount">90,000 - 120,000</span>
                <span className="price-timeline">8 Weeks</span>
              </div>
            </div>

            <div className="tier-content-grid">
              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">🎯</span>
                  What You Get
                </h3>
                <ul className="feature-list-slide">
                  <li>✓ All Basic Plan features</li>
                  <li>✓ Multi-page architecture (Home, Products, About, Contact)</li>
                  <li>✓ 3D configurator for color/material changes</li>
                  <li>✓ Product-specific pages with animations</li>
                  <li>✓ Interactive AR viewing (USDZ + WebXR)</li>
                  <li>✓ Light & environment presets for each pod</li>
                  <li>✓ SEO-optimized meta structure</li>
                  <li>✓ Google Analytics integration</li>
                  <li>✓ 45-day support & minor updates</li>
                </ul>
              </div>

              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">⚙️</span>
                  Configurator Features
                </h3>
                <div className="config-features">
                  <div className="config-item">
                    <div className="config-icon">🎨</div>
                    <div className="config-label">Color Selection</div>
                    <div className="color-swatches">
                      <span className="swatch" style={{background: '#2d3d4d'}}></span>
                      <span className="swatch" style={{background: '#4a5a6a'}}></span>
                      <span className="swatch" style={{background: '#e8e8e8'}}></span>
                      <span className="swatch" style={{background: '#1a1a1a'}}></span>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="config-icon">💡</div>
                    <div className="config-label">Lighting Modes</div>
                    <div className="lighting-options">
                      <span>Studio</span>
                      <span>Warm</span>
                      <span>Cool</span>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="config-icon">🪵</div>
                    <div className="config-label">Material Finishes</div>
                    <div className="material-options">
                      <span>Fabric</span>
                      <span>Wood</span>
                      <span>Leather</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tier-demo-preview">
              <div className="demo-label">Example: Interactive Configurator</div>
              <div className="demo-mockup large">
                <div className="configurator-mockup">
                  <div className="viewer-area">
                    <div className="model-placeholder large">🏢</div>
                  </div>
                  <div className="controls-panel">
                    <div className="control-group">
                      <div className="control-label">Color</div>
                      <div className="control-options">
                        <button className="color-option active"></button>
                        <button className="color-option"></button>
                        <button className="color-option"></button>
                      </div>
                    </div>
                    <div className="control-group">
                      <div className="control-label">Material</div>
                      <div className="control-options">
                        <button className="material-option">Fabric</button>
                        <button className="material-option">Wood</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Tier 3 - Ultra Plan */}
        <div className="presentation-slide slide-tier tier-ultra">
          <div className="slide-content">
            <div className="tier-header-slide">
              <div className="tier-badge premium">
                <span className="tier-icon-large">🥇</span>
                <span className="tier-label">Tier 3 - Premium</span>
              </div>
              <h2 className="tier-title-slide">Ultra Plan</h2>
              <p className="tier-subtitle-slide">Immersive Experience with Advanced Configuration</p>
              <div className="tier-price-slide">
                <span className="price-currency">AED</span>
                <span className="price-amount">150,000 - 220,000</span>
                <span className="price-timeline">8-10 Weeks</span>
              </div>
            </div>

            <div className="tier-content-grid">
              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">🚀</span>
                  Premium Features
                </h3>
                <ul className="feature-list-slide premium">
                  <li>✓ All Medium Plan features</li>
                  <li>✓ Fully dynamic reactive animations</li>
                  <li>✓ Advanced configurator (color + blueprints)</li>
                  <li>✓ Animated information overlays</li>
                  <li>✓ Interactive storytelling flow</li>
                  <li>✓ Advanced AR with blueprint overlay</li>
                  <li>✓ Admin CMS for product management</li>
                  <li>✓ Performance-optimized deployment</li>
                  <li>✓ 3-month extended support</li>
                </ul>
              </div>

              <div className="content-section">
                <h3 className="section-heading">
                  <span className="section-icon">✨</span>
                  Advanced Capabilities
                </h3>
                <div className="advanced-features">
                  <div className="advanced-item">
                    <div className="advanced-icon">🎬</div>
                    <div className="advanced-title">Camera Transitions</div>
                    <div className="advanced-desc">Cinematic product reveals</div>
                  </div>
                  <div className="advanced-item">
                    <div className="advanced-icon">📐</div>
                    <div className="advanced-title">Blueprint Mode</div>
                    <div className="advanced-desc">Technical specifications overlay</div>
                  </div>
                  <div className="advanced-item">
                    <div className="advanced-icon">🎨</div>
                    <div className="advanced-title">Real-time Materials</div>
                    <div className="advanced-desc">PBR textures & lighting</div>
                  </div>
                  <div className="advanced-item">
                    <div className="advanced-icon">📱</div>
                    <div className="advanced-title">Advanced AR</div>
                    <div className="advanced-desc">Dimension overlays in AR</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tier-demo-preview">
              <div className="demo-label">Example: Advanced Interactive Experience</div>
              <div className="demo-mockup ultra">
                <div className="advanced-mockup">
                  <div className="viewer-area-advanced">
                    <div className="model-placeholder ultra">🏢</div>
                    <div className="overlay-info">
                      <div className="info-tag">Acoustic Rating: 35dB</div>
                      <div className="info-tag">Dimensions: 2.2m × 1.8m</div>
                    </div>
                  </div>
                  <div className="advanced-controls">
                    <div className="control-tabs">
                      <button className="tab active">Design</button>
                      <button className="tab">Blueprint</button>
                      <button className="tab">AR</button>
                    </div>
                    <div className="blueprint-preview">
                      <div className="blueprint-icon">📐</div>
                      <div className="blueprint-text">Switch to technical view</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4: Contact / Next Steps */}
        <div className="presentation-slide slide-contact">
          <div className="slide-content">
            <h2 className="contact-title">Let's Build Your Vision</h2>
            <p className="contact-subtitle">
              Ready to transform SonicHive's digital presence?
            </p>

            <div className="payment-structure">
              <h3 className="structure-title">Payment Milestones</h3>
              <div className="milestones-row">
                <div className="milestone-item">
                  <div className="milestone-icon">1</div>
                  <div className="milestone-title">Kickoff</div>
                  <div className="milestone-payment">30%</div>
                </div>
                <div className="milestone-arrow">→</div>
                <div className="milestone-item">
                  <div className="milestone-icon">2</div>
                  <div className="milestone-title">Mid Review</div>
                  <div className="milestone-payment">40%</div>
                </div>
                <div className="milestone-arrow">→</div>
                <div className="milestone-item">
                  <div className="milestone-icon">3</div>
                  <div className="milestone-title">Delivery</div>
                  <div className="milestone-payment">30%</div>
                </div>
              </div>
            </div>

            <div className="contact-info-section">
              <div className="contact-card">
                <div className="contact-icon">👤</div>
                <div className="contact-label">Contact</div>
                <div className="contact-value">Sinan Mohammed</div>
                <div className="contact-role">Founder & Director</div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">🏢</div>
                <div className="contact-label">Company</div>
                <div className="contact-value">VULF Interactive</div>
                <div className="contact-role">Wesualize Studios</div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <div className="contact-label">Email</div>
                <div className="contact-value">hello@vulf.com</div>
                <div className="contact-role">Get in touch</div>
              </div>
            </div>

            <div className="cta-buttons-slide">
              <button 
                className="btn-presentation primary"
                onClick={() => onNavigate('demo')}
              >
                View Tier 1 Demo
              </button>
              <button 
                className="btn-presentation primary"
                onClick={() => onNavigate('demo')}
              >
                View Tier 2 Demo
              </button>
              <button 
                className="btn-presentation primary"
                onClick={() => onNavigate('tier3')}
              >
                View Tier 3 Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

