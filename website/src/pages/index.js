import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "LiveMigrator",
    imageUrl: "img/hybrid-cloud.png",
    description: "Migrate data to cloud without disruption or downtime.",
  },
  {
    title: "LiveAnalytics",
    imageUrl: "img/Flexibility.svg",
    description: "Immediate analytic data access.",
  },
  {
    title: "Docker",
    imageUrl: "img/docker.png",
    description: "Get up and running in minutes with LiveData Plane & Docker.",
  },
  {
    title: "OneUI",
    imageUrl: "img/WD_Oracle_Benefits-03.png",
    description: "Manage your whole Fusion ecosystem in one place.",
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--6", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} | ${siteConfig.tagline}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--outline button--secondary button--lg")}
              to={useBaseUrl("docs/quickstarts/preparation/get-started")}
            >
              Get Started
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.heroLink
              )}
              to="https://wandisco.com/support/fusion-for-administrators"
            >
              Free Trial
            </Link>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.heroLink
              )}
              to="https://www.docker.com/get-started"
            >
              Get Docker
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
