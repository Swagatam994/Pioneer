import React from 'react'

const Button = ({ onClick, children, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'mt-6 px-6 py-3 rounded-lg text-white',
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default Button
