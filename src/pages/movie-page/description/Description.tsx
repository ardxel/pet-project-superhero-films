import React from 'react';
import styles from './description.module.scss';
import IMovie from 'types/Movie';

//https://www.imdb.com/name/nm0578949/
interface DescriptionProps extends IMovie {}

const Description: React.FC<DescriptionProps> = ({
  slogan,
  shortDescription,
  description,
  directors,
  actors,
}) => {
  const short = (
    <div className={styles.short}>
      <p>{shortDescription || description.substring(0, 125) + '...'}</p>
    </div>
  );
  const descriptionRow = (
    <tr>
      <td className={styles.label}>Description</td>
      <td className={styles.description}>{description}</td>
    </tr>
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

  return (
    <div className={styles.info}>
      {short}
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
    </div>
  );
};

export default Description;
