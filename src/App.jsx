import { useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import { api } from './api/api'
import Pokemons from './components/Pokemons'
import Loading from './components/Loading'
import axios from 'axios'


let currentItem = 0;
const items = document.querySelectorAll('.card')
const maxItems = document.querySelectorAll('.card').length

function App() {
  const [data, setData] = useState({})
  const [pokeTypes, setPokeTypes] = useState({})
  const [pokeNum, setPokeNum] = useState(1)
  const [content, setContent] = useState(<Loading />)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(pokeNum)}`);
      // convert the data to json
      const json = await response.json();

      // set state with the result
      setData(json);
      setPokeTypes(json.types[0])
      setContent(<Pokes/>)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [pokeNum])


  const controls = document.querySelectorAll('.control')

  function controlItem(isLeft) {

    if (isLeft) {
      currentItem -= 1
      setPokeNum(pokeNum - 1)
    } else {
      currentItem += 1
      setPokeNum(pokeNum + 1)
    }

    if (currentItem >= maxItems) {
      currentItem = 0

    }

    if (currentItem <= 0) {
      currentItem = maxItems - 1

    }

    items.forEach(item => item.classList.remove('current-item'))
    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth"
    })

    items[currentItem].classList.add("current-item")

    console.log("Clicked at: ", isLeft, "currentItem: ", currentItem)
  }

  const Pokes = () => {
    return (
      <section id="gallery-wrapper">
        <button className='arrow-left control' onClick={() => {
          controlItem(true)

        }}>LEFT</button>
        <button className='arrow-right control' onClick={() => {
          controlItem(false)

        }}>RIGHT</button>

        <div className="gallery">


          <Pokemons
            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            id={data.id}
            //pokeType={pokeTypes.type.name}
            pokeName={data.name} />

          <Pokemons
            test='current-item'
            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            id={data.id}
            //pokeType={pokeTypes.type.name}
            pokeName={data.name} />

          <Pokemons
            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`}
            id={data.id}
            //pokeType={pokeTypes.type.name}
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
