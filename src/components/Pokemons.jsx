const Pokemons = (props) =>{
    return(
      <div className="card current-item">
              <div className="card-content">
                <div className="image">
                    <img alt='pokemon-name' src={String(props.sprite)}/>
                  </div>
                  <div className="info-pokemon">
                    <span className="id-pokemon">#0{String(props.id)}</span>
                    <span className="type-pokemon">{String(props.pokeType)}</span>
                  </div>

                  <div className="media-icons">

                  </div>

                  <div className="name-pokemon">

                    <span className="pokemon-name">
                      {String(props.pokeName)}
                    </span>
                  </div>
                </div>
            </div>
    )
  }

export default Pokemons
