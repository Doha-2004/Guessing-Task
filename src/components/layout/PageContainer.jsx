import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PageContainer({ children }) {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  )
}
