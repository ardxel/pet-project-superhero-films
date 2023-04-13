import React, { memo } from 'react';
import styles from './footer.module.scss';
import footerItems from '@constants/footerItems';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          {footerItems.map(({ id, Image, link }) => {
            return (
              <div className={styles.item} key={id}>
                <a className={styles.link} href={link} target="_blank">
                  <Image />
                </a>
              </div>
            );
          })}
        </div>
        <div className={styles.creator}>
          <h6>Created by Vasily Bobnev 2023.</h6>
          <h6>All rights reserved.</h6>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
