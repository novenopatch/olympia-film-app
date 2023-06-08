import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [roms, setRoms] = useState([]);
  const [selectedRom, setSelectedRom] = useState(null);
  const [movies, setMovies] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchRoms = async () => {
      try {
        console.log("start");
        const response = await axios.get('http://localhost:9000/api/roms');
        console.log(response);
        setRoms(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des salles de cinéma :', error);
      }
    };

    fetchRoms();
  }, []);

  const handleRomSelect = async (rom) => {
    setSelectedRom(rom);
    try {
      const response = await axios.get(`http://localhost:9000/api/movies/${rom.romId}`);
      setMovies(response.data.movies);
      setInfo(response.data.info)
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    }
  };

  return (
    <div className='w-full min-h-screen'>
      <div className="text-center">
      <label for="HeadlineAct" class="block text-sm font-medium text-gray-900">
      Choisissez une salle de cinéma :
      </label>
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        class="mt-1.5   border-gray-300 text-gray-700 sm:text-sm"
        onChange={(e) => handleRomSelect(JSON.parse(e.target.value))}>
       <option value="">Sélectionnez une salle</option>
        {roms.map((rom) => (
          <option key={rom.romId} value={JSON.stringify(rom)}>
            {rom.title}
          </option>
        ))}
      </select>
    </div>
      {selectedRom && (
        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Films Collection de {info.name}</h2>

              <p className="max-w-md mx-auto mt-4 text-gray-500">
                {info.address}
              </p>
            </header>
            {Object.entries(movies).map(([date, movieList]) => (
              <>

<p className="max-w-md mx-auto mt-4 text-gray-500">
                {date}
              </p>
               <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4" key={date}>
                {movieList.map((movie) => (
                  <li key={movie.link}>
                    <a href={movie.link} className="block overflow-hidden group">
                      <img
                        src={movie.imglink}
                        alt=""
                        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                      />

                      <div className="relative pt-3 bg-white">
                        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                          {movie.title}
                        </h3>

                        <p className="mt-2">
                          <span className="sr-only">{movie.spanText}</span>

                          <span className="tracking-wider text-gray-900">{movie.spanText}</span>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              </>
             
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
