import React, { useState } from 'react';
import styles from './description.module.scss';
import IMovie from '@models/Movie';
import DescriptionButtonGroup from './DescriptionButtonGroup';

interface DescriptionProps extends IMovie {}

const DescriptionMoviePage: React.FC<DescriptionProps> = ({ ...props }) => {
  const {
    slogan,
    shortDescription,
    description,
    directors,
    actors,
    kinopoiskId,
  } = props;
  const [showFullDesct, setShowFullDesc] = useState(false);

  const toggleShowDesc = () => {
    setShowFullDesc(!showFullDesct);
  };

  const short = (
    <div className={styles.short}>
      <p>{shortDescription || description.substring(0, 125) + '...'}</p>
    </div>
  );
  const directorRow = (
    <tr>
      <td className={styles.label}>Director</td>
      <td className={styles.director}>
        {directors.map((director, index) => (
          <a
            key={index}
            target="_blank"
            href={`https://www.imdb.com/name/${director.id}/`}
          >
            {director.name}
            <span className={styles.directorDesc}>{director.description}</span>
          </a>
        ))}
      </td>
    </tr>
  );

  const starsRow = (
    <tr>
      <td className={styles.label}>Stars</td>
      <td className={styles.single}>
        {actors
          .slice(0, 4)
          .map((actor, i) => {
            return i === 3 ? actor.name : actor.name + ', ';
          })
          .map((str, i) => (
            <span key={i} className={styles.name}>
              {str}
            </span>
          ))}
      </td>
    </tr>
  );

  const sloganRow = slogan && (
    <tr>
      <td className={styles.label}>Slogan</td>
      <td className={styles.slogan}>{slogan}</td>
    </tr>
  );

  const descriptionRow = (
    <tr>
      <td className={styles.label}>Description</td>
      <td className={styles.description}>
        {!showFullDesct ? description.substring(0, 250) + '...' : description}
        <button className={styles.showDesc} onClick={toggleShowDesc}>
          {showFullDesct ? 'less' : 'more'}
        </button>
      </td>
    </tr>
  );

  return (
    <div className={styles.info}>
      {short}
      <div className={styles.flexbox}>
        <table className={styles.tableInfo}>
          <thead></thead>
          <tbody>
            {directorRow}
            {starsRow}
            {sloganRow}
            {descriptionRow}
          </tbody>
          <tfoot></tfoot>
        </table>

        <div className={styles.buttons}>
          <DescriptionButtonGroup kinopoiskId={kinopoiskId} />
        </div>
      </div>
    </div>
  );
};

export default DescriptionMoviePage;
