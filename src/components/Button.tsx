import React from 'react'

interface ButtonProps {
  onClick: () => void
  color: 'primary' | 'secondary'
  text: string
}

const Button: React.FC<ButtonProps> = ({ onClick, color, text }) => {
  const buttonStyles: React.CSSProperties = {
    height: '40px',
    padding: '0 20px',
    backgroundColor: color === 'primary' ? '#007bff' : '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  return (
    <button style={buttonStyles} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
