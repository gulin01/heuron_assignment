import { Link } from 'react-router-dom'
import '../styles/Home.css'
const Home = () => {
  return (
    <nav className='nav'>
      <Link className='nav-link' to='task1'>
        <span className='sticker'>🎉</span>
        과제 1
      </Link>
      <Link className='nav-link' to='task2'>
        <span className='sticker'>🚀</span>
        과제 2
      </Link>
      <Link className='nav-link' to='task3'>
        <span className='sticker'>✨</span>
        과제 3
      </Link>
    </nav>
  )
}

export default Home
