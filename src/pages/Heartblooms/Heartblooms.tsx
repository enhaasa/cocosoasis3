import { useContext } from 'react';
import styles from './Heartblooms.module.scss';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Title from '@components/Title/Title';
import InfoCard from '@components/InfoCard/InfoCard';
import Grid from '@components/Grid/Grid';
import ChainSpawn from '@components/ChainSpawn/ChainSpawn';

export default function Heartblooms() {
  const { heartblooms } = useContext(CMSContext);

  const { background, flowers, headline, subline } =
    heartblooms?.content || {};

    console.log(flowers)

  return (
    <Page background={background} backgroundOptions={{ brightness: 0.1 }}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Title
            headline={headline}
            subline={subline}
            size="xxl"
            isWinged={true}
            style="handwritten"
          />
        </div>

        <div className={styles.flowers}>
          <Grid>
            {flowers && (
              <ChainSpawn
                items={flowers?.map((drink: any) => (
                  <InfoCard
                    title={drink.headline}
                    background={drink.background}
                    description={drink.description}
                    isTemporarilyUnavailable={drink.isTemporarilyUnavailable}
                  />
                ))}
              />
            )}
          </Grid>
        </div>
      </div>
    </Page>
  );
}
