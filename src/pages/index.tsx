import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import MacAppStoreImageSVG from '@site/static/img/download-mac-appstore.svg';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function DownLoadButton() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.appstoreButton}>
      <a href={siteConfig.customFields.appurl}><MacAppStoreImageSVG /></a>
      <p className={styles.tryForFreeText}>Try for free</p>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Quick Note" description={`${siteConfig.title}`}>
      <HomepageHeader />
      <main className={styles.mainContainer}>
       <DownLoadButton/>
        <img src={useBaseUrl('/img/banner.png')} alt="App Screenshot" style={{ width: '100%', maxWidth: '1200px'}}/>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
