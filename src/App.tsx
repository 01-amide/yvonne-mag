import Hero from './components/sections/Hero'
// import Intro from './components/sections/Intro'
import Calendar from './components/sections/Calendar'
import HappyBirthday from './components/sections/HappyBirthday'
import WhoSheIs from './components/sections/WhoSheIs'
import WhatSheLoves from './components/sections/WhatSheLoves'
import SoundsOfHer from './components/sections/SoundsOfHer'
import ScatteredGallery from './components/sections/ScatteredGallery'
import NineteenReasons from './components/sections/NineteenReasons'
import CreatorNote from './components/sections/CreatorNote'
import SurpriseEnvelope from './components/sections/Final'
function App() {


  return (
    <>
    <Hero />  
    {/* <Intro /> */}
    <Calendar />
    {/* <HappyBirthday/> */}
    <WhoSheIs/>
    <WhatSheLoves/>
    {/* <SoundsOfHer/> */}
    <ScatteredGallery/>
    <NineteenReasons/>
    <CreatorNote/>
    <SurpriseEnvelope/>
    </>
  )
}

export default App
