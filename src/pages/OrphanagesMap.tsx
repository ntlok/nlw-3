import react, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css'

import '../scss/orphanagesMap.scss';

import Logo from '../image/logo.svg'
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { api } from '../services/api';

const mapIcon = leaflet.icon({
  iconUrl: Logo,

  iconSize: [48, 58],
  iconAnchor: [24, 88],
  popupAnchor: [120, -28]
})

interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[] | null>()

  useEffect(()=> {
    async function fetchOrphanages() {
      const { data } = await api.get<Orphanage[]>('/orphanages')

      const result = data.map(item => {
        return {
          name: item.name,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          id: item.id
        }
      })

      setOrphanages(result);

      console.log(data)

    }

    fetchOrphanages()

    console.log(orphanages)
  },[])

  function show() {
    console.log(orphanages)
  }

  return(
    <div className="orphanage">
      <div className="barside">
        <div>
          <img src={Logo} alt="" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </div>

        <div className="address">
          <strong>Rio de Janeiro</strong>
          <p>Rio de Janeiro</p>
        </div>

        {/* <button type='button' onClick={show}>ok</button> */}

      </div>

      <MapContainer style={{width: '100%', height: '100%'}} zoom={12} center={[-22.9129007,-43.2910276]}>
        <TileLayer 
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnRsb2siLCJhIjoiY2t1dWRmcGptNXk5YzJ6bW5peTBzNWk5eCJ9.-rIALDnpLEtHsgiLqWuXlg"
        />
          
        {orphanages?.map(item => {
          return (
            <Marker 
              icon={mapIcon}
              position={[item.latitude, item.longitude]}
              key={item.id}
            > 
              <Popup 
                closeButton={false}
                className='map-popup'
              >
                {item.name}

                <Link to={`/orphanages/${item.id}`}>
                  <FiArrowRight />
                </Link>
              </Popup>
            </Marker>
          )
        })}
        
      </MapContainer>

      <Link className='link' to='/create'>
        <FiPlus />
      </Link>
    
    </div>
  )
}