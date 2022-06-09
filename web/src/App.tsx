import { useState } from 'react';
import ToggleTheme from './components/App/ToggleTheme';
import Tiles from './pages/Tiles';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <Tiles />
      <ToggleTheme />
    </>
  );
}

export default App;
