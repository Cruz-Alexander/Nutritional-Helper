import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Allergens from './Allergens.js';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/allergens" element={<Allergens />} />
       </Routes>
    </>
 );
};

export default App;