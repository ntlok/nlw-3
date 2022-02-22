import react from 'react';

import '../scss/sideBar.scss'
import logo from '../image/logo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export function SideBar() {

  return(
    <div className="sideBar">
      <img src={logo} alt="" />

      <Link to='/orphanages'>
        <FiArrowLeft  />
      </Link>
    </div>
  )
}