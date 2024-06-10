import React, { useRef } from 'react'

interface Props {
  p?: string
  type?: string
  className2?: string
  ph: string
  getText?: (text: string) => void
}

const AdminModalInput = ({
  p = 'Name',
  type = 'text',
  className2,
  ph,
  getText,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleBlur = () => {
    if (ref.current && getText) {
      getText(ref.current.value)
    }
  }

  return (
    <div className={className2}>
      <p className="font-medium text-admin-text text-base font-display">{p}</p>
      <input
        type={type}
        className="rounded-2xl font-medium text-base bg-admin-input text-admin-modal-placeholder pl-5 py-3 capitalize font-display"
        placeholder={ph}
        ref={ref}
        onBlur={handleBlur}
      />
    </div>
  )
}

export default AdminModalInput
