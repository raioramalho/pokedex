import { useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import { api } from './api/api'
import Pokemons from './components/Pokemons'


  let currentItem = 0;
  const items = document.querySelectorAll('.card')
  const maxItems = document.querySelectorAll('.card').length


function App() {
  const [ data, setData ] = useState([])
  const [ isloading, setIsLoading ] = useState(true)

  useEffect(() => {
    api.get('/1')
    .then((response) => {
      let res = response.data
      console.log(res)
      setData(res)
      setIsLoading(false)
    })
    setIsLoading(false)
  }, [])

  const controls = document.querySelectorAll('.control')

  function controlItem(isLeft){

    if(isLeft){
      currentItem -=1
    }else{
      currentItem += 1
    }

    if(currentItem >= maxItems){
      currentItem = 0
    }

    if(currentItem < 0) {
      currentItem = maxItems -1
    }

    items.forEach(item => item.classList.remove('current-item'))
    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth"
    })

    items[currentItem].classList.add("current-item")

    console.log("Clicked at: ", isLeft, "currentItem: ",currentItem)
  }





  return (
    <div className="App">
      <img id="poke-logo" src='public/pokemon-logo.webp'/>
      <section id="gallery-wrapper">
        <button className='arrow-left control' onClick={() => {
          controlItem(true)
        }}>LEFT</button>
        <button className='arrow-right control' onClick={() =>{
          controlItem(false)
        }}>RIGHT</button>

        <div className="gallery">


          <Pokemons
            sprite={data.sprites.other.dream_world.front_default}
            id={data.id}
            pokeType={data.types[0].type.name}
            pokeName={data.name}/>


        </div>


      </section>
    </div>
  )
}

export default App
