import { useNavigate } from 'react-router-dom'

const GoBackButton: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const buttonStyle: React.CSSProperties = {
    width: '100px',
    padding: '10px 0',
    height: '100%',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  }

  return (
    <button onClick={handleGoBack} style={buttonStyle}>
      되로 가기
    </button>
  )
}

export default GoBackButton
