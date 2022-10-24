import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import './home.css'

export default function Home() {
  return (
    <>
      <Topbar/>
      <main className='HomeContainer'>
        <Sidebar/>
        <Timeline/>
        <Rightbar profile={false}/>
      </main>
    </>
  )
}
