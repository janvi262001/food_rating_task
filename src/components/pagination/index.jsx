import React from 'react'
import './index.css'

function Pagination({totalPages,currentPage,handlePageChange}) {
  return (
    <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
  )
}

export default Pagination
