import React from 'react'

const Card = ({pokemon,pokemonJa,lang,jaNumber,chNumber}) => {
    return(   
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className='flex flex-row'>
        <a href="#">
            <img className="rounded-t-lg w-48" src={pokemon.sprites.other['official-artwork'].front_default} alt="" />
        </a>
        <div className='flex flex-col mt-3 mx-3'>
            <div className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>No.{pokemon.id}</div>
            <div className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{lang == 'ja' ? pokemonJa.genera[0].genus:pokemonJa.genera[2].genus}</div>
            <div className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{lang == 'ja' ? '高さ':'身高'}:{pokemon.height/10}m</div>
            <div className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{lang == 'ja' ? '重さ':'體重'}:{pokemon.weight/10}kg</div>
        </div>
        </div>
        
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{lang == 'ja' ? pokemonJa.names[0].name:pokemonJa.names[3].name}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{lang == 'ja' ? pokemonJa["flavor_text_entries"][jaNumber]["flavor_text"]:pokemonJa["flavor_text_entries"][chNumber]["flavor_text"]}</p>
            
        </div>
    </div>

    )
}


const Card2 = ({ pokemon }) => {
    console.log(pokemon.sprites.front_default);
  return (
    <div>
        <div className='cardImg'>
        {/* .other['official-artwork'] */}
            <img src={pokemon.sprites.front_default} alt=""/>
        </div>
        <h3 className='cardName'>{pokemon.name}</h3>
        <div className='cardTypes'>
            <div>タイプ</div>
            {pokemon.types.map((type) =>{
                return (
                    <div>
                        <span className='typeName'>{type.type.name}</span>
                    </div>
                )
            })}
        </div>
        <div className='cardInfo'>
            <div className='cardData'>
                <p className='title'>重さ：{pokemon.weight}</p>
            </div>
            <div className='cardData'>
                <p className='title'>高さ：{pokemon.height}</p>
            </div>
            <div className='cardData'>
                <p className='title'>アビリティ：{pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    </div>
  ) 
}

export default Card