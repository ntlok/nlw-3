import react from 'react';
import '../scss/style.scss'
import '../scss/home.scss'
import { FiArrowRight } from 'react-icons/fi';

import logo from '../image/title.svg'
import background from '../image/background.svg';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="home">
      <div className='container'>
        <div className="content">
          <img src={logo} alt="" />
          <div>
            <h2>Leve felicidade para o mundo</h2>
            <p>Visite orfanatos e mude o dia de muitas crianças</p>
          </div>
        </div>

        <div className="img-background">
          <img src={background} alt="" />
        </div>

        <div className="address">
          <strong>Rio de Janeiro</strong>
          <p>Rio de Janeiro</p>
        </div>

        <Link to='/orphanages' className='button'>
          <FiArrowRight size={24} />
        </Link>
    </div>
    </div>
  );
}