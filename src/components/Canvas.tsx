import React, { useEffect, useRef } from 'react'

interface CanvasProps {
  imageSrc: string
  scale: number
  rotation: number
  grayscale: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onMouseMove: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onRightClick: (e: React.MouseEvent) => void
  onWheel: (e: React.WheelEvent) => void
}

const Canvas: React.FC<CanvasProps> = ({
  imageSrc,
  scale,
  rotation,
  grayscale,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onRightClick,
  onWheel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current && imageSrc) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = imageSrc

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        ctx?.clearRect(0, 0, canvas.width, canvas.height)
        ctx?.save()

        ctx?.translate(canvas.width / 2, canvas.height / 2)
        ctx?.rotate((rotation * Math.PI) / 180)
        ctx?.translate(-canvas.width / 2, -canvas.height / 2)

        if (ctx) {
          ctx.filter = grayscale ? 'grayscale(100%)' : 'none'
        }

        ctx?.scale(scale, scale)
        ctx?.drawImage(img, 0, 0)
        ctx?.restore()
      }

      img.onerror = () => {
        alert('Failed to load image. Please try again.')
      }
    }
  }, [imageSrc, grayscale, scale, rotation])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onContextMenu={onRightClick}
      onWheel={onWheel}
    />
  )
}

export default Canvas
