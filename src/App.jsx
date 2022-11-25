import { useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import { api } from './api/api'
import Pokemons from './components/Pokemons'
import Loading from './components/Loading'


let currentItem = 0;
const items = document.querySelectorAll('.card')
const maxItems = document.querySelectorAll('.card').length




function App() {
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [pokeNum, setPokeNum] = useState(1)
  const [content, setContent] = useState(<Loading/>)

  useEffect(() => {
    api.get(`/${String(pokeNum)}`)
      .then((response) => {
        let res = response.data
        console.log(res)
        setData(res)
        //setContent(<Pokes/>)
      })
  }, [pokeNum])

  const controls = document.querySelectorAll('.control')

  function controlItem(isLeft) {

    if (isLeft) {
      currentItem -= 1
    } else {
      currentItem += 1
    }

    if (currentItem >= maxItems) {
      currentItem = 0
      setPokeNum(pokeNum + 1)
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1
      setPokeNum(pokeNum + 1)
    }

    items.forEach(item => item.classList.remove('current-item'))
    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth"
    })

    items[currentItem].classList.add("current-item")

    console.log("Clicked at: ", isLeft, "currentItem: ", currentItem)
  }

  const Pokes = () =>{
    return(
      <section id="gallery-wrapper">
          <button className='arrow-left control' onClick={() => {
            controlItem(true)

          }}>LEFT</button>
          <button className='arrow-right control' onClick={() => {
            controlItem(false)

          }}>RIGHT</button>

          <div className="gallery">


            <Pokemons
              test="current-item"
              sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              id={data.id}
              pokeType={data.types[0].type.name}
              pokeName={data.name} />

            <Pokemons
              sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
              id={data.id}
              pokeType={data.types[0].type.name}
              pokeName={data.name} />

            <Pokemons
              sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`}
              id={data.id}
              pokeType={data.types[0].type.name}
              pokeName={data.name} />

          </div>


        </section>
    )
  }


  return (
    <div className="App">
      {content}
    </div>
  )


}

export default App
