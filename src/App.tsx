 // @ts-nocheck 
 
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import { useDebugValue, useEffect, useState } from 'react';
import Card from './components/Card.js';
import { Navbar } from './components/Navbar.js';
import React from 'react'
import { Footer } from './components/Footer.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData,setPokemonData] = useState([]);
  const [pokemonDataJa,setPokemonDataJa] = useState([]);
  const [nextURL,setNextURL] = useState("");
  const [prevURL,setPrevURL] = useState("");
  const [lang,setLang] = useState('ja');

  const handleLangChange = (language) => {
    setLang(language);
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      {/* @ts-ignore */}
      await loadPokemon(res.results);


      setNextURL(res.next);
      setPrevURL(res.previous);
      console.log(res);
      setLoading(false);
    }
    fetchPokemonData();
  },[]);
  const loadPokemonJa = async (data) => {
    let _PokemonDataJa = await Promise.all(
      data.map((pokemon) =>{
        let pokemonRecordJa = getPokemon(pokemon.species.url);
        return pokemonRecordJa;
      })
    )
    setPokemonDataJa( _PokemonDataJa);

  }
  

  const loadPokemon = async (data) => {
    let _PokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        
        return pokemonRecord;
      }) 
    );
    let _PokemonDataJa = await Promise.all(
      _PokemonData.map((pokemon) => {
        let pokemonRecordJa = getPokemon(pokemon.species.url);
        return pokemonRecordJa;
      }

      )
    );
    setPokemonData(_PokemonData);
    setPokemonDataJa(_PokemonDataJa);
    console.log(data);
  }
  console.log(pokemonData);
  console.log(pokemonDataJa);

  const handleRandomPage = async () => {
    setLoading(true);
    const data = [];
    for (let i=0;i<20;i++){
      let randomPokemonNumberStr = (1 + Math.floor(Math.random() * 800)).toString();
      console.log(randomPokemonNumberStr);
      data.push('https://pokeapi.co/api/v2/pokemon/' + randomPokemonNumberStr + '/');
    }
    let _PokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon);
        
        return pokemonRecord;
      }) 
    );
    
    let _PokemonDataJa = await Promise.all(
      _PokemonData.map((pokemon) => {
        let pokemonRecordJa = getPokemon(pokemon.species.url);
        return pokemonRecordJa;
      }

      )
    );
    setPokemonData(_PokemonData);
    setPokemonDataJa(_PokemonDataJa);
    setLoading(false);
  }
  const handleHandleRandomPage = () => {
    handleRandomPage();
  }
  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
    return;
    }

  const handleNextPage = async () => {
      setLoading(true);
      let data = await getAllPokemon(nextURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setLoading(false);
      }
  return (
    <div>
      <Navbar handleLangChange={handleLangChange} handleHandleRandomPage={handleHandleRandomPage} lang={lang}/>
      <div className="App">
      {loading ? (
        <h1>ロード中…</h1>
      ) : (
        <div className='px-8'>
          <div className='grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {pokemonData.map((pokemon,i) => {
              let pokemonJa = pokemonDataJa[i];
              let jaNumber = 22;
              let chNumber = 56;
              console.log(pokemonJa);
              pokemonJa["flavor_text_entries"].forEach((flavor,index) =>{
                if(flavor.language.name === 'ja-Hrkt'){
                  jaNumber = index;
                }
                if(flavor.language.name === 'zh-Hant'){
                  chNumber = index;
                }
              }
              )
              return( <Card key={i} pokemon={pokemon} pokemonJa={pokemonJa} lang={lang} jaNumber={jaNumber} chNumber={chNumber}/>
              )   
            }
            )}
          </div>
        </div>
      )
      }
    </div>
    <div className='text-center'>
      <div className='my-3 flex gap-3 justify-center'>
        <button onClick={handlePrevPage} className ="inline-flex items-center bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  
                  前へ
                </button>
                <button onClick={handleNextPage} className ="inline-flex items-center bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">次へ
                  
        </button>
      </div>
    </div>
    
    <Footer/>    
    </div>
    
  );
}

export default App;
