import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2 font-bold transition-colors disabled:opacity-50"
    >
      {children}
    </button>
  )
}

export default Button