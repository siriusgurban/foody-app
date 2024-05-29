import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  text?: string
  className?: string
  children?: ReactNode
  onSubmit?: () => void
}

const AdminModalButton = ({
  onClick,
  text = '',
  className,
  children,
  onSubmit,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick() // Call onClick handler if provided
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit() // Call onSubmit handler if provided
    }
  }

  return (
    <button className={className} onClick={handleClick} onSubmit={handleSubmit}>
      {children}
      {text}
    </button>
  )
}

export default AdminModalButton
