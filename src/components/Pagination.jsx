import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const groupSize = 6
  const currentGroup = Math.floor((currentPage - 1) / groupSize)
  const groupStart = currentGroup * groupSize + 1
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages)
  const pages = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i)

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {groupStart > 1 && (
        <span className="pagination-ellipsis">...</span>
      )}

      {pages.map(page => (
        <button
          key={page}
          className={`pagination-num ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {groupEnd < totalPages && (
        <span className="pagination-ellipsis">...</span>
      )}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className="pagination-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  )
}

export default Pagination