import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';
import { disableScroll, enableScroll } from '@common/tools/scroll-lock';
import { useSearchMovieQuery } from '@reduxproj//api/moviesApi';
import Loading from '@common/loading/Loading';
import SearchCardMovie from './search-card-movie/SearchCardMovie';

interface SearchProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const Search: FC<SearchProps> = ({ isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data = [], isLoading } = useSearchMovieQuery(searchTerm);
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
        style={{ display: isOpen ? 'block' : 'none' }}
      >
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
            {data.map((movie) => {
              return (
                <SearchCardMovie
                  key={movie.kinopoiskId}
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
