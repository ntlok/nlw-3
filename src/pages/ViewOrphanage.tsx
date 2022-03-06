import react, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { SideBar } from '../components/SideBar';
import Leaflet from 'leaflet';
import Logo from '../image/logo.svg'

import '../scss/viewOrphanage.scss';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const orphanageTest = {
  name: 'Nome do orphanato',
  latitude: -22.9129007,
  longitude: -43.2910276,
  about: 'estamos ai na atividade',
  instructions: 'so vem',
  opening_hours: '08:00 as 17:00',
  open_on_weekends: false,
  images: [
    { path: 'https://images.unsplash.com/photo-1644181528561-ac0d499a2af0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
    { path: 'https://images.unsplash.com/photo-1644181528561-ac0d499a2af0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
    { path: 'https://images.unsplash.com/photo-1644181528561-ac0d499a2af0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'},
    { path: "https://avatars.githubusercontent.com/u/71560756?v=4"}
  ]
}

const icon = Leaflet.icon({
  iconUrl: Logo,
  iconSize: [48, 48],
  iconAnchor: [0, 24]
})

interface Orphanage {
  name: string;
  about: string; 
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    path: string;
  }>;
}

export function ViewOrphanage() {
  const [imageIndex, setImageIndex] = useState(0)
  const [orphanage, setOrphanage] = useState<Orphanage>();

  // const { id } = useParams()

  useEffect( () => {
    // async function fetchOrphanage() {
      
    //   const { data } = await api.get(`orphanages/${id}`)

    //   setOrphanage(data)
    // }

    // fetchOrphanage()

    setOrphanage(orphanageTest)
  }, [])

  if(!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div className="viewOrphanage">
      <SideBar />

      <div className="orphanageContent">
        <div className="orphanageDetails">
          <div className="img-container">
            <img className='main-img' src={orphanage.images[imageIndex].path} alt="" />
            <div className="img-wrapper">
              {orphanage?.images.map((image, index) => {
                return (
                  <img 
                    key={index} 
                    src={image.path} 
                    alt="" 
                    className={imageIndex === index ? '' : 'no-target'  } 
                    onClick={()=> setImageIndex(index)} 
                  />
                )
              })}
            </div>
          </div>
          <div className="orphanageInfo">
            <h1>{orphanage?.name}</h1>
            <p>
              {orphanage.about}
            </p>

            <div className="map">
              <MapContainer 
                style={{ width: '100%', height: '100%' }} 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={11}
                scrollWheelZoom={false}
              >
                <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnRsb2siLCJhIjoiY2t1dWRmcGptNXk5YzJ6bW5peTBzNWk5eCJ9.-rIALDnpLEtHsgiLqWuXlg" />

                <Marker icon={icon} position={[orphanage.latitude, orphanage.longitude]} />
              </MapContainer>

              <a 
                target='_blank'
                rel='noopener noreferrer'
                href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
              >
                <p>Traçar Rota</p>
              </a>
            </div>

            <h2>Instruções para visita</h2>
            <span>
              {orphanage.instructions}
            </span>

            <div className="info">
              <div className="horario">
                <FiClock color='#15B6D6' />
                <p>Horário de visítas <br /> {orphanage.opening_hours} </p>
              </div>
              {orphanage.open_on_weekends ? (
                <div className="weekend">
                  <FiInfo  className='item'/>
                  <p>Atendemos <br /> no final de semana</p>
                </div>
              ):(
                <div className="not-weekend">
                  <FiInfo  className='item'/>
                  <p>Não Atendemos <br /> no final de semana</p>
                </div>
              )}
            </div>

            <button className='whatsApp'>
              <FaWhatsapp className='item2' />
              Entrar em contato
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}