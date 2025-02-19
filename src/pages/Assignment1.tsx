import React, { useState, useCallback } from 'react'
import { useGrayscale } from '../context/GrayScaleContext'
import GoBackButton from '../components/GoBackButton'
import Button from '../components/Button'
import Canvas from '../components/Canvas'

const Assignment1 = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { grayscale, toggleGrayscale } = useGrayscale()

  const fetchImage = useCallback(async () => {
    const randomPage = Math.floor(Math.random() * 100)
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${randomPage}&limit=1`
      )
      const data = await response.json()
      if (data[0]?.download_url) {
        setImageSrc(data[0].download_url)
      }
    } catch (error) {
      console.error('Error loading image:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
      const newScale = Math.max(0.5, scale + diffY * 0.01)
      setScale(newScale)
    } else if (e.button === 2) {
      const newRotation = rotation + diffX * 0.1
      setRotation(newRotation)
    }

    setStartX(e.clientX)
    setStartY(e.clientY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()

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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomDirection = e.deltaY > 0 ? -1 : 1
    const newScale = Math.max(0.5, scale + zoomDirection * 0.05)
    setScale(newScale)
  }

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
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <Button onClick={fetchImage} color='primary' text='Load Image' />
        <Button
          onClick={toggleGrayscale}
          color='secondary'
          text='Toggle Grayscale'
        />
        <GoBackButton />
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
            border: '1px solid #dddddd',
          }}
        >
          <Canvas
            imageSrc={imageSrc}
            scale={scale}
            rotation={rotation}
            grayscale={grayscale}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onRightClick={handleRightClick}
            onWheel={handleWheel}
          />
        </div>
      )}
    </div>
  )
}

export default Assignment1
