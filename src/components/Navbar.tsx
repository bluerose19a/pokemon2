import { getAllPokemon } from "../utils/pokemon";

export const Navbar = ({handleLangChange,lang,handleHandleRandomPage}) => {
    return(
        <header className ="text-gray-600 body-font bg-orange-400 mb-8">
        <div className ="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className ="flex gap-3 lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <button onClick={() =>handleLangChange('ja')} className="rounded-md bg-white px-4 py-2">日本語</button>
            <button onClick={() =>handleLangChange('ch')} className="rounded-md bg-white px-4 py-2">繁體中文</button>
            <button  onClick={() =>handleHandleRandomPage()} className="rounded-md bg-green-500 text-white px-4 py-2">ランダム表示</button>

          </nav>
          <a className ="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            
            <span className ="ml-3 text-3xl text-white">{lang == 'ja' ? 'ポケモンずかん' : '神奇寶貝圖鑑'}</span>
          </a>
          <div className ="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            
          </div>
        </div>
      </header>
    )
}

