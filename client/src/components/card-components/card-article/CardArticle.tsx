import React from 'react';
import styles from './cardarticle.module.scss';
import formatDate from '@tools//formatDateInArray';

interface ArticleProps {
  title: string;
  creator: string[] | null;
  img: string;
  desc: string;
  date: string;
  link: string;
}

const CardArticle: React.FC<ArticleProps> = ({
  title,
  creator,
  img,
  desc,
  date,
  link,
}) => {
  return (
    <article className={styles.article}>
      <a href={link} target="_blank">
        <div className={styles.wrapper}>
          <div className={styles.date}>
            {formatDate(date).map((item, i) => {
              return <h5 key={i}>{item}</h5>;
            })}
          </div>
          <div className={styles.info}>
            {creator && <h6 className={styles.creator}>{creator.join('')}</h6>}
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.desc}>{desc}</p>
          </div>
          {img !== 'plug' && (
            <div className={styles.img}>
              <img src={img} />
            </div>
          )}
        </div>
      </a>
    </article>
  );
};

export default CardArticle;
