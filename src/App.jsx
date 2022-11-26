import { useEffect } from 'react';
import { useState } from 'react';
import './styles/App.css'
import Pokemons from './components/Pokemons'
import Loading from './components/Loading'



let currentItem = 1;
const items = document.querySelectorAll('.card')
const maxItems = document.querySelectorAll('.card').length

function App() {
  const [data, setData] = useState({})
  const [pokeTypes, setPokeTypes] = useState({})
  const [pokeNum, setPokeNum] = useState(1)
  const [content, setContent] = useState(<Loading />)
  const [isLoading, setIsLoading] = useState(true)
  const [ key, setKey ] = useState('')


  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      setIsLoading(true)
      // get the data from the api
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(pokeNum)}`);
      // convert the data to json
      const json = await response.json();

      // set state with the result
      setData(json);
      setPokeTypes(json.types[0])
      setIsLoading(false)
      setContent(<Pokes />)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [pokeNum])


  const Pokes = () => {
    return (
      <section id="gallery-wrapper">
        <button className='arrow-left control' onClick={() => {
          if(pokeNum === 1){
            console.log("This is: ",pokeNum)
            setPokeNum(1)
          }
          else{
            setPokeNum(pokeNum - 1)
            console.log(pokeNum)}
        }}>LEFT</button>
        <button className='arrow-right control' onClick={() => {
          setPokeNum(pokeNum + 1)
          console.log(pokeNum)
        }}>RIGHT</button>

        <div className="gallery">


          <Pokemons

            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id || 1}.svg`}
            id={data.id || 1}
            //pokeType={pokeTypes.type.name}
            pokeName={data.name || "BULBASAUR"} />

          <Pokemons
            test='current-item'
            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id || 1}.png`}
            id={data.id || 1}
            //pokeType={String(pokeTypes.type.name)}
            pokeName={data.name || "BULBASAUR"} />

          <Pokemons
            sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id || 1}.png`}
            id={data.id || 1}
            //pokeType={pokeTypes.type.name}
            pokeName={data.name || "BULBASAUR"} />

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
