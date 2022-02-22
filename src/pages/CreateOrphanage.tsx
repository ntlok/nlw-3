import react, { ChangeEvent, FormEvent, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Leaflet from 'leaflet';
import Logo from '../image/logo.svg'
import { SideBar } from '../components/SideBar';
import { useNavigate } from 'react-router-dom'; 

import '../scss/createOrphanage.scss'
import { api } from '../services/api';


const mapIcon = Leaflet.icon({
  iconUrl: Logo,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [128, 0]
})

export function CreateOrphanage() {
  const [orphanagename, setOrphanageName] = useState('');
  const [about, setAbout] = useState('');
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState('');

  const navegate = useNavigate();

  async function submitForm(event: FormEvent) {
    event.preventDefault()

    const data  = new FormData();

    data.append('name', orphanagename);
    data.append('about', about);
    data.append('latitude', String(position.lat));
    data.append('longitude', String(position.lng));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends);

    selectedImages.forEach(image => {
      return data.append('images', image)
    })

    try {
      await api.post('orphanages', data)
      alert('Orfanato cadastrado com sucesso!')
      navegate('/')
    } catch(err) {
      console.log(err)
    }

    
      
  }
 
  function MyComponent() {
    const map = useMapEvents({
      click: (event) => {
        
        setPosition({
          lat: event.latlng.lat,
          lng: event.latlng.lng
        })

        console.log(position)
      },

    })
    return null
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const img = Array.from(event.target.files)

    setSelectedImages( prevState => [...prevState, ...img])

    const preview = img.map(img => {return  URL.createObjectURL(img)})
    
    setPreviewImages(prevState => [...prevState, ...preview])
  }

  function removeImage(index: number) {

    const result = previewImages.length > 1 ? previewImages.splice(index -1, 1) : [];
    
    const resultImage = selectedImages.length > 1 ? selectedImages.splice(index -1, 1) : [];

    console.log(result)
    setPreviewImages([...result])
    setSelectedImages([...resultImage])
  }


  return (
    <div className="createOrphanage">
      <SideBar />

      <div className="orphanageForm">
        <form onSubmit={submitForm}>
          <fieldset>
            <legend>Dados</legend>
            

            <div className="map" >
              <MapContainer 
                center={[-22.9129007,-43.2910276]}
                zoom={10}
                style={{width: '100%', height: '100%', borderRadius: '1rem'}}
              >
                <TileLayer 
                  url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnRsb2siLCJhIjoiY2t1dWRmcGptNXk5YzJ6bW5peTBzNWk5eCJ9.-rIALDnpLEtHsgiLqWuXlg"
                />
                <MyComponent />  

                {
                  position && <Marker interactive={false} icon={mapIcon} position={position} />
                }
              </MapContainer>
            </div>

            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <input 
                className='input' 
                type="text" 
                id='name' 
                value={orphanagename}
                onChange={event => setOrphanageName(event.target.value)}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="about">Sobre</label>
              {/* <input className='input text' type="text" /> */}

              <textarea 
                className='input text' 
                name="about" id="about" 
                cols={30} 
                rows={10}
                value={about}
                onChange={event => setAbout(event.target.value)}
              >
                
              </textarea>
            </div>

            <div className="field">
              <label className="label" htmlFor="name">Fotos</label>
              <div className="images-container">
                {
                  previewImages.map((image, index) => {
                    return (
                     <div className='img-content'>
                       <img key={index} src={image} alt={image} />
                       <button type='button' onClick={() => removeImage(index)}>
                         <FiX className='excluir' color='red'  />
                       </button>
                     </div>
                    )
                   })
                }
                <label htmlFor="imgs" className='images'>
                  <FiPlus />
                </label>
                <input multiple onChange={handleSelectImages} type="file" id='imgs' style={{ width: '.001px'}} />
              </div>

              
            </div>

          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="field">
              <label className='label' htmlFor="">Instruções</label>
              <textarea 
                className='input text'
                name="" 
                id="" 
                cols={30} 
                rows={10}
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              ></textarea>
            </div>

            <div className="field">
              <label className='label' htmlFor="">Horário</label>
              <input 
                type="text" 
                className='input' 
                value={opening_hours}
                onChange={event => setOpening_hours(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="" className="label">Atende final de semana</label>
              <div className="button">
                <button 
                  type='button'
                  className={open_on_weekends === 'true' ? 'active' : ''}
                  onClick={() => setOpen_on_weekends('true')}
                >Sim</button>
                <button 
                  className={open_on_weekends === 'false' ? 'not-active' : ''}
                  type='button'
                  onClick={() => setOpen_on_weekends('false')}
                >Não</button>
              </div>
            </div>
          </fieldset>
          <button type='submit' className='submit'>Enviar Formulário</button>
        </form>
      </div>
    </div>
  )
}