import React, { useState, useEffect, useRef } from 'react'
import { useGrayscale } from '../context/GrayScaleContext'

const Assignment1 = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { grayscale, toggleGrayscale } = useGrayscale()

  const fetchImage = async () => {
    const randomPage = Math.floor(Math.random() * 100)
    setIsLoading(true)

    const response = await fetch(
      `https://picsum.photos/v2/list?page=${randomPage}&limit=1`
    )
    const data = await response.json()
    if (data[0].download_url) {
      setIsLoading(false)
      setImageSrc(data[0].download_url)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      setStartX(e.clientX)
      setStartY(e.clientY)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const diffX = e.clientX - startX
    const diffY = e.clientY - startY

    if (e.button === 0) {
      // Left click (zoom)
      const newScale = Math.max(0.5, scale + diffY * 0.01) // Zoom in or out based on Y movement
      setScale(newScale)
    } else if (e.button === 2) {
      // Right click (rotate)
      const newRotation = rotation + diffX * 0.1 // Rotate based on X movement
      setRotation(newRotation)
    }

    setStartX(e.clientX)
    setStartY(e.clientY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the default right-click menu

    const canvas = canvasRef.current
    if (canvas) {
      let startX = e.clientX
      let startY = e.clientY

      const onMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY
        setRotation(rotation + dx * 0.5)
        startX = moveEvent.clientX
        startY = moveEvent.clientY
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomDirection = e.deltaY > 0 ? -1 : 1 // Determine zoom direction
    const newScale = Math.max(0.5, scale + zoomDirection * 0.05) // Update scale
    setScale(newScale)
  }

  useEffect(() => {
    if (canvasRef.current && imageSrc) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = imageSrc

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        ctx?.clearRect(0, 0, canvas.width, canvas.height) // Clear previous image
        ctx?.save()

        ctx?.translate(canvas.width / 2, canvas.height / 2)
        ctx?.rotate((rotation * Math.PI) / 180) // Convert degrees to radians
        ctx?.translate(-canvas.width / 2, -canvas.height / 2)

        if (ctx) {
          ctx.filter = grayscale ? 'grayscale(100%)' : 'none' // Use context from GrayscaleProvider
        }

        ctx?.scale(scale, scale)
        ctx?.drawImage(img, 0, 0)
        ctx?.restore()
      }
      img.onerror = () => {
        setIsLoading(false) // Stop loading if image fails to load
        alert('Failed to load image. Please try again.')
      }
    }
  }, [imageSrc, grayscale, scale, rotation, isLoading])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px',
        width: '600px',
        margin: '0 auto',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px',
        }}
      >
        <button
          style={{
            height: '40px',
            padding: '0 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={fetchImage}
        >
          Load Image
        </button>
        <button
          style={{
            height: '40px',
            padding: '0 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={toggleGrayscale}
        >
          Toggle Grayscale
        </button>
      </div>

      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#000',
            fontSize: '24px',
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          style={{
            width: '500px',
            height: '500px',
          }}
        >
          <canvas
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onContextMenu={handleRightClick}
            onWheel={handleWheel}
          ></canvas>
        </div>
      )}
    </div>
  )
}

export default Assignment1
