import { Route, BrowserRouter, Routes } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/starred" element={<Starred />} />
        </Route>
        <Route path="*" element={<div>This is 404 page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
