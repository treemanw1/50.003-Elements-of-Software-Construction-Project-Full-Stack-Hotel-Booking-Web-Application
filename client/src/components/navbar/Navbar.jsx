import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Trivago</span>
        <div className="navItems">
          <button className="btn">Hotel Search</button>
          <button className="btn">Room Search</button>
          <button className="btn">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar