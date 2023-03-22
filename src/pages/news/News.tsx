import React, { FC, useEffect, useState } from 'react';
import styles from './news.module.scss';
import CardArticle from '@components/card-components/card-article/CardArticle';
import { fetchNews } from 'redux/asyncThunks/fetchNews';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import Loading from 'common/loading/Loading';

const News: FC = () => {
  const { data, isLoading, error, nextPage } = useAppSelector(
    (state) => state.news
  );
  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews(''));
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const maxHeight = Math.max(window.innerHeight, window.screen.height);
    if (
      scrollTop + maxHeight >= document.documentElement.offsetHeight &&
      !error &&
      nextPage &&
      !isLoading
    ) {
      dispatch(fetchNews(nextPage!));
    }
  }, [scrollTop]);

  return (
    <main className={styles.news}>
      <div className={styles.container}>
        {data.map((article, i) => {
          const { title, creator, image_url, description, pubDate, link } =
            article;
          return (
            <CardArticle
              key={i}
              title={title}
              creator={creator}
              img={image_url as string}
              desc={description}
              date={pubDate}
              link={link}
            />
          );
        })}
        {isLoading && <Loading style={{ width: '20%' }} />}
      </div>
    </main>
  );
};

export default News;
