import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import StarRating from './StarRating'
import './CommentsSection.css'

function CommentsSection({ recipeId }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [avgRating, setAvgRating] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)

  useEffect(() => {
    fetchComments()
    fetchRatings()
  }, [recipeId])

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: false })
    if (data) setComments(data)
  }

  const fetchRatings = async () => {
    const { data } = await supabase
      .from('ratings')
      .select('rating, user_id')
      .eq('recipe_id', recipeId)
    if (data && data.length > 0) {
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length
      setAvgRating(Math.round(avg * 10) / 10)
      setTotalRatings(data.length)
      if (user) {
        const mine = data.find(r => r.user_id === user.id)
        if (mine) setUserRating(mine.rating)
      }
    }
  }

  const handleRate = async (star) => {
    if (!user) { navigate('/login'); return }
    setUserRating(star)
    const { data: existing } = await supabase
      .from('ratings')
      .select('id')
      .eq('recipe_id', recipeId)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      await supabase.from('ratings').update({ rating: star }).eq('id', existing.id)
    } else {
      await supabase.from('ratings').insert({ recipe_id: recipeId, user_id: user.id, rating: star })
    }
    fetchRatings()
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    const username = user.user_metadata?.username || user.email.split('@')[0]
    await supabase.from('comments').insert({
      recipe_id: recipeId,
      user_id: user.id,
      username,
      content: content.trim(),
    })
    setContent('')
    setSubmitting(false)
    fetchComments()
  }

  const handleDelete = async (id) => {
    await supabase.from('comments').delete().eq('id', id)
    fetchComments()
  }

  const formatDate = (str) => new Date(str).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <div className="comments-section">

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="rating-avg">
          <span className="rating-num">{avgRating || '—'}</span>
          <div>
            <StarRating rating={Math.round(avgRating)} readonly size="sm" />
            <span className="rating-count">{totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}</span>
          </div>
        </div>
        <div className="rating-user">
          <p className="rating-user-label">
            {user ? 'Your rating:' : 'Sign in to rate this recipe'}
          </p>
          {user
            ? <StarRating rating={userRating} onRate={handleRate} size="md" />
            : <button className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 20px' }} onClick={() => navigate('/login')}>Sign In to Rate</button>
          }
        </div>
      </div>

      {/* Comment Input */}
      <div className="comments-header">
        <h3 className="comments-title">Comments</h3>
      </div>

      {user ? (
        <form className="comment-form" onSubmit={handleComment}>
          <div className="comment-form-avatar">
            {(user.user_metadata?.username || user.email)[0].toUpperCase()}
          </div>
          <div className="comment-form-right">
            <textarea
              className="comment-input"
              placeholder="Share your thoughts on this recipe..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              required
            />
            <button className="btn btn-primary comment-submit" type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-gate">
          <p>Join the conversation — sign in to leave a comment.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign In</button>
            <button className="btn btn-outline" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 && (
          <p className="comments-empty">No comments yet. Be the first to share your thoughts!</p>
        )}
        {comments.map(c => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">
              {c.username[0].toUpperCase()}
            </div>
            <div className="comment-body">
              <div className="comment-meta">
                <span className="comment-username">{c.username}</span>
                <span className="comment-date">{formatDate(c.created_at)}</span>
                {user && user.id === c.user_id && (
                  <button className="comment-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                )}
              </div>
              <p className="comment-content">{c.content}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CommentsSection