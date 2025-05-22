import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
   <header className="header">
      <h1 className="header-title">Notes App</h1>
      <nav>
        <NavLink to="/new" className="new-note-button">
          New Note
        </NavLink>
      </nav>
    </header>
  )
}

export default Header