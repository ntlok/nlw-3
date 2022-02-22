import './scss/style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Home } from './pages/Home';
import { OrphanagesMap } from './pages/OrphanagesMap';
import { Orphanage } from './pages/Orphanage';
import { CreateOrphanage } from './pages/CreateOrphanage';
import { ViewOrphanage } from './pages/ViewOrphanage';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateOrphanage />} />
      <Route path="/orphanages" element={<OrphanagesMap />} />
      <Route path="/orphanages/:id" element={<ViewOrphanage />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
