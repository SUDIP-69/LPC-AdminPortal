import { useState, useRef, useCallback } from 'react'

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

interface UseDragAndDropOptions {
  onDragStart?: () => void
  onDrag?: (x: number, y: number) => void
  onDragEnd?: (x: number, y: number) => void
  enabled?: boolean
}

export function useDragAndDrop(options: UseDragAndDropOptions = {}) {
  const {
    onDragStart,
    onDrag,
    onDragEnd,
    enabled = true,
  } = options

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })

  const elementRef = useRef<HTMLElement | null>(null)

  const getClientCoords = (e: React.DragEvent | MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if ('clientX' in e && 'clientY' in e) {
      return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
    }
    return { x: 0, y: 0 }
  }

  const handleDragStart = useCallback(
    (e: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!enabled) return
      const { x: clientX, y: clientY } = getClientCoords(e)
      setDragState({
        isDragging: true,
        startX: clientX,
        startY: clientY,
        currentX: clientX,
        currentY: clientY,
      })
      onDragStart?.()
    },
    [enabled, onDragStart]
  )

  const handleDrag = useCallback(
    (e: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!dragState.isDragging) return
      const { x: clientX, y: clientY } = getClientCoords(e)
      setDragState((prev) => ({
        ...prev,
        currentX: clientX,
        currentY: clientY,
      }))
      onDrag?.(clientX, clientY)
    },
    [dragState.isDragging, onDrag]
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!dragState.isDragging) return
      let clientX = 0, clientY = 0
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX
        clientY = e.changedTouches[0].clientY
      } else if ('clientX' in e && 'clientY' in e) {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }
      setDragState((prev) => ({
        ...prev,
        isDragging: false,
        currentX: clientX,
        currentY: clientY,
      }))
      onDragEnd?.(clientX, clientY)
    },
    [dragState.isDragging, onDragEnd]
  )

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDrag,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: handleDragStart,
    onTouchMove: handleDrag,
    onTouchEnd: handleDragEnd,
  }

  return {
    dragState,
    elementRef,
    dragHandlers,
  }
}

// Example usage:
/*
function DraggableItem() {
  const { dragState, elementRef, dragHandlers } = useDragAndDrop({
    onDragStart: () => console.log('Drag started'),
    onDrag: (x, y) => console.log('Dragging:', x, y),
    onDragEnd: (x, y) => console.log('Drag ended:', x, y),
  })

  const style = {
    transform: `translate(${dragState.currentX - dragState.startX}px, ${
      dragState.currentY - dragState.startY
    }px)`,
    cursor: dragState.isDragging ? 'grabbing' : 'grab',
  }

  return (
    <div
      ref={elementRef}
      style={style}
      {...dragHandlers}
      className="draggable-item"
    >
      Drag me!
    </div>
  )
}

// With drop zones
function DraggableWithDropZones() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (item: string) => {
    setDraggedItem(item)
  }

  const handleDragEnd = (dropZone: string) => {
    if (draggedItem) {
      setItems((prev) =>
        prev.map((item) =>
          item === draggedItem ? dropZone : item === dropZone ? draggedItem : item
        )
      )
      setDraggedItem(null)
    }
  }

  return (
    <div className="drag-container">
      {items.map((item) => (
        <DraggableItem
          key={item}
          item={item}
          onDragStart={() => handleDragStart(item)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  )
}

// With sortable list
function SortableList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragEnd = (targetIndex: number) => {
    if (draggedIndex !== null) {
      const newItems = [...items]
      const [draggedItem] = newItems.splice(draggedIndex, 1)
      newItems.splice(targetIndex, 0, draggedItem)
      setItems(newItems)
      setDraggedIndex(null)
    }
  }

  return (
    <ul className="sortable-list">
      {items.map((item, index) => (
        <li
          key={item}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDragEnd(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
*/ 