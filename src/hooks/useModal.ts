import { useState, useCallback, useEffect } from 'react'

interface UseModalOptions {
  initialOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  preventScroll?: boolean
}

export function useModal(options: UseModalOptions = {}) {
  const {
    initialOpen = false,
    onOpen,
    onClose,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    preventScroll = true,
  } = options

  const [isOpen, setIsOpen] = useState(initialOpen)
  const [isAnimating, setIsAnimating] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    setIsAnimating(true)
    onOpen?.()
  }, [onOpen])

  const close = useCallback(() => {
    setIsAnimating(false)
    const timer = setTimeout(() => {
      setIsOpen(false)
      onClose?.()
    }, 300) // Match this with your CSS transition duration
    return () => clearTimeout(timer)
  }, [onClose])

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        close()
      }
    },
    [closeOnEsc, close]
  )

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        close()
      }
    },
    [closeOnOverlayClick, close]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      if (preventScroll) {
        document.body.style.overflow = 'hidden'
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      if (preventScroll) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, handleEsc, preventScroll])

  return {
    isOpen,
    isAnimating,
    open,
    close,
    handleOverlayClick,
  }
}

// Example usage:
/*
function ModalExample() {
  const { isOpen, isAnimating, open, close, handleOverlayClick } = useModal({
    onOpen: () => console.log('Modal opened'),
    onClose: () => console.log('Modal closed'),
  })

  return (
    <>
      <button onClick={open}>Open Modal</button>

      {isOpen && (
        <div
          className={`modal-overlay ${isAnimating ? 'fade-in' : 'fade-out'}`}
          onClick={handleOverlayClick}
        >
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>Modal content goes here</p>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

// With form
function FormModal() {
  const { isOpen, open, close, handleOverlayClick } = useModal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    close()
  }

  return (
    <>
      <button onClick={open}>Open Form</button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h2>Contact Form</h2>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Message" />
              <button type="submit">Submit</button>
              <button type="button" onClick={close}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// With confirmation
function ConfirmationModal() {
  const { isOpen, open, close, handleOverlayClick } = useModal()

  const handleConfirm = () => {
    // Handle confirmation
    close()
  }

  return (
    <>
      <button onClick={open}>Delete Item</button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={handleConfirm}>Yes, Delete</button>
            <button onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}
*/ 