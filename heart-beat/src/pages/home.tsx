import Nav from '../components/nav';
import bgImage from '../../public/bgImage.png';

export default function Home () {
  return (
    <div>
      <Nav/>
        <div className="bg-cover bg-center h-1/2-screen flex items-center justify-center text-2xl font-bold text-white"
              style={{backgroundImage: `url('/bgImage.png')`}}>
          Hello, world!
        </div>
    </div>
  )
}
