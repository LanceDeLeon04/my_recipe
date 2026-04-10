import { useState } from 'react'
import './StarRating.css'

function StarRating({ rating, onRate, readonly = false, size = 'md' }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className={`star-rating star-rating--${size}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          className={`star-btn ${star <= (hovered || rating) ? 'filled' : ''}`}
          onClick={() => !readonly && onRate && onRate(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          disabled={readonly}
          type="button"
          aria-label={`Rate ${star} star`}
        >
          &#9733;
        </button>
      ))}
    </div>
  )
}

export default StarRating