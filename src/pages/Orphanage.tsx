import react from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import '../scss/orphanage.scss'
import { SideBar } from '../components/SideBar'
import { FiClock, FiInfo } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { icon } from 'leaflet'
import Logo from '../image/logo.svg'

const mark = icon({
  iconUrl: Logo,
  iconSize: [40,40],
  iconAnchor: [20, 0]
})

export function Orphanage() {

  const horario = '12:00'
  
  
  return (
    <div className="orphanage">
      <SideBar />

      <main>
        <div className="orphanageDetails">
          <img className='painel' src="https://images.unsplash.com/photo-1643212673511-687979d063eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
          <div className="orphanageImages">
            <button>
              <img src="https://github.com/ntlok.png" alt="" />
            </button>
            <button>
              <img src="https://github.com/ntlok.png" alt="" />
            </button>
            <button>
              <img src="https://github.com/ntlok.png" alt="" />
            </button>
            <button>
              <img src="https://github.com/ntlok.png" alt="" />
            </button>
            <button>
              <img src="https://github.com/ntlok.png" alt="" />
            </button>
          </div>

          <div className="orphanageContent">
            <h1>Lar das Meninas</h1>
            <p>Descrição do lar das meninas que vamos ter aqui</p>

            <div className="mapContainer">
              <MapContainer 
                className='map' 
                center={[-22.9266917,-43.5998393]} 
                zoom={10}
                scrollWheelZoom={false}
              >
                <Marker
                  icon={mark}
                  position={[-22.9266917,-43.5998393]}
                />
                <TileLayer url='https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnRsb2siLCJhIjoiY2t1dWRmcGptNXk5YzJ6bW5peTBzNWk5eCJ9.-rIALDnpLEtHsgiLqWuXlg' />
              </MapContainer>

              <button>Acessar a rota</button>
            </div>

            <h2>Instruções de Visita</h2>
            <span>Venha conhecer e se sentir a vontade e traga muito amor e paciência para dar</span>

            <div className="funcionamento">
              <div className="horario">
                <FiClock />
                <p>Horário de visítas <br /> Das `${horario}`</p>
              </div>
              <div className="weekend">
                <FiInfo className='item'/>
                <p>Atendemos no final de semana</p>
              </div>
            </div>

            <button className='whatsApp'>
              <FaWhatsapp className='item2' />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}