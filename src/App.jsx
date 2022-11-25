import { useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import { api } from './api/api'


  let currentItem = 0;
  const items = document.querySelectorAll('.card')
  const maxItems = document.querySelectorAll('.card').length

function App() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    api.get('/1')
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })
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

          <div className="card current-item">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src={String(data.sprites.other.dream_world.front_default)}/>
                </div>
                <div className="info-pokemon">
                  <span className="id-pokemon">#</span>
                  <span className="type-pokemon"></span>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    {String(data.name)}
                  </span>
                </div>
              </div>
          </div>


          <div className="card">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg"/>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    Bubasaur1
                  </span>
                </div>
              </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg"/>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    Bubasaur2
                  </span>
                </div>
              </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"/>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    Bubasaur3
                  </span>
                </div>
              </div>
          </div>


          <div className="card">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg"/>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    Bubasaur
                  </span>
                </div>
              </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="image">
                  <img alt='pokemon-name' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"/>
                </div>

                <div className="media-icons">

                </div>

                <div className="name-pokemon">

                  <span className="pokemon-name">
                    Bubasaur
                  </span>
                </div>
              </div>
          </div>





        </div>


      </section>
    </div>
  )
}

export default App
