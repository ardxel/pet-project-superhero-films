import Loading from '@common/loading/Loading';
import { disableScroll, enableScroll } from '@common/tools/scroll-lock';
import IMovie from '@models/Movie';
import { fetchMoviesBySearch } from '@reduxproj/api/movie.api';
import { FC, useEffect, useRef, useState } from 'react';
import SearchCardMovie from './search-card-movie/SearchCardMovie';
import styles from './search.module.scss';

interface SearchProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const Search: FC<SearchProps> = ({ isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  // const { data, isLoading, error } = useFetch(fetchMoviesBySearch, {
  //   search: searchTerm,
  // });

  useEffect(() => {
    fetchMoviesBySearch({ search: searchTerm })
      .then((data) => setMovies(data?.movies as IMovie[]))
      .catch((error) => console.log(error));
  }, [searchTerm]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (isOpen && searchTerm) {
      disableScroll();
    }
    if (isOpen && !searchTerm) {
      inputRef.current!.focus();
      enableScroll();
    }
    if (!isOpen) {
      enableScroll();
    }
  }, [isOpen, searchTerm]);
  return (
    <>
      <div
        className={styles.searchModal}
        data-destiny="search"
        style={{ display: isOpen ? 'block' : 'none' }}>
        <section className={styles.field}>
          <input
            ref={inputRef}
            type="text"
            placeholder="search..."
            onChange={handleChange}
          />
        </section>
      </div>
      {/* background blur element */}
      {searchTerm && isOpen && <div className={styles.bg}></div>}

      {searchTerm && isOpen && (
        <div className={styles.results}>
          <div className={styles.container}>
            {isLoading && <Loading />}
            {movies?.map((movie) => {
              return (
                <SearchCardMovie
                  key={movie._movieId}
                  {...movie}
                  setIsOpen={setIsOpen}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
