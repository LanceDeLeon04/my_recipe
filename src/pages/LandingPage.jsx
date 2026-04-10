import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllRecipes, fetchFilipinoRecipes, setActiveCategory } from '../store/slices/recipeSlice'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { meals, filipinoMeals, status, filipinoStatus } = useSelector(state => state.recipes)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
  if (status === 'idle') dispatch(fetchAllRecipes())
  if (filipinoStatus === 'idle') dispatch(fetchFilipinoRecipes())
}, [dispatch, status, filipinoStatus])

  useEffect(() => {
    if (meals.length === 0) return
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % Math.min(5, meals.length))
    }, 3500)
    return () => clearInterval(timer)
  }, [meals])

  const featured = meals.slice(0, 5)
  const popular = meals.slice(0, 4)
  const latest = meals.slice(-4)

  return (
    <div className="landing">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1 className="hero-title">Bulldog Bites</h1>
          <p className="hero-sub">Fresh, flavorful seafood recipes curated just for you.</p>
          <button className="btn btn-primary hero-btn" onClick={() => { dispatch(setActiveCategory('All')); navigate('/home') }}>
  Browse Recipes
</button>
        </div>
      </section>

      {/* Carousel */}
      {featured.length > 0 && (
        <section className="section carousel-section">
          <div className="container">
            <h2 className="section-title">Featured Recipes</h2>
            <p className="section-subtitle">Hand-picked favorites to get you started</p>
            <div className="carousel">
              <div className="carousel-track" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {featured.map(meal => (
                  <div key={meal.idMeal} className="carousel-slide" onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="carousel-img" />
                    <div className="carousel-info">
                      <h3>{meal.strMeal}</h3>
                      <span className="btn btn-primary" style={{ marginTop: '12px', fontSize: '13px', padding: '8px 20px' }}>
                        View Recipe
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`}
                    onClick={() => setCarouselIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-text">
            <h2 className="section-title">About Bulldog Bites</h2>
            <p>Bulldog Bites is a recipe hub built by National University students who believe great food brings people together. We focus on fresh seafood recipes that are approachable, delicious, and easy to recreate at home.</p>
            <p style={{ marginTop: '16px' }}>Whether you are an experienced home cook or just starting out, our curated collection of recipes is designed to guide you step by step — from the ingredients list to the final plate.</p>
            <p style={{ marginTop: '16px' }}>Dive in, explore, and let your kitchen come alive with the flavors of the sea.</p>
          </div>
          <div className="about-visual">
            <div className="about-badge">
              <span className="about-badge-num">{meals.length}+</span>
              <span className="about-badge-label">Delicious Recipes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular */}
      {popular.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Popular Recipes</h2>
            <p className="section-subtitle">Our most-loved seafood dishes</p>
            <div className="landing-grid">
              {popular.map(meal => (
                <div key={meal.idMeal} className="landing-card" onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
                  <div className="landing-card-img-wrap">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className="landing-card-overlay" />
                  </div>
                  <div className="landing-card-body">
                    <h3>{meal.strMeal}</h3>
                    <span className="tag">Seafood</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest */}
      {latest.length > 0 && (
        <section className="section latest-section">
          <div className="container">
            <h2 className="section-title">Latest Recipes</h2>
            <p className="section-subtitle">Freshly added to our collection</p>
            <div className="landing-grid">
              {latest.map(meal => (
                <div key={meal.idMeal} className="landing-card" onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
                  <div className="landing-card-img-wrap">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className="landing-card-overlay" />
                  </div>
                  <div className="landing-card-body">
                    <h3>{meal.strMeal}</h3>
                    <span className="tag">Seafood</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filipino Classics */}
{filipinoMeals.length > 0 && (
  <section className="section">
    <div className="container">
      <h2 className="section-title">Filipino Classics</h2>
      <p className="section-subtitle">Beloved dishes straight from the Filipino kitchen</p>
      <div className="landing-grid">
        {filipinoMeals.slice(0, 4).map(meal => (
          <div key={meal.idMeal} className="landing-card" onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
            <div className="landing-card-img-wrap">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="landing-card-overlay" />
            </div>
            <div className="landing-card-body">
              <h3>{meal.strMeal}</h3>
              <span className="tag">Filipino</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <button
          className="btn btn-outline"
          onClick={() => { dispatch(setActiveCategory('Filipino')); navigate('/home') }}
        >
          See All Filipino Recipes
        </button>
      </div>
    </div>
  </section>
)}

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-inner">
          <h2>Ready to Cook?</h2>
          <p>Explore our full collection of seafood recipes and find your next favorite dish.</p>
          <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => { dispatch(setActiveCategory('All')); navigate('/home') }}>
  See All Recipes
</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="navbar-logo" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-primary)' }}>Bulldog Bites</span>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            A project submitted to Mr. Jerwin Cruz by De Leon L. | Par | Pecho | Robles
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Application Development Course | NU Launa SCS
          </p>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage