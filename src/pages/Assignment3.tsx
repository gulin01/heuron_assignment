import { useState } from 'react'
import GoBackButton from '../components/GoBackButton'
import Button from '../components/Button'

const Assignment3 = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const handleProcess = () => {
    const vowels = 'AEIOUaeiou'
    let vowelPart = ''
    let consonantPart = ''

    for (const char of inputText) {
      if (vowels.includes(char)) {
        vowelPart += char
      } else {
        consonantPart += char
      }
    }

    setOutputText(vowelPart + consonantPart)
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
  }

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '250px',
  }

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
  }

  const resultStyle: React.CSSProperties = {
    marginTop: '20px',
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyle}>
      <h2>문자열 처리기</h2>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Enter a string'
        style={inputStyle}
      />
      <div style={buttonContainerStyle}>
        <Button onClick={handleProcess} color='secondary' text='결과 보기' />
        <GoBackButton />
      </div>

      {outputText && <div style={resultStyle}>결과: {outputText}</div>}
    </div>
  )
}

export default Assignment3
