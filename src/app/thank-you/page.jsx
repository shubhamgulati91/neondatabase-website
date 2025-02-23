import Hero from 'components/pages/thank-you/hero';
import Layout from 'components/shared/layout';
import SEO_DATA from 'constants/seo-data';
import getMetadata from 'utils/get-metadata';

export const metadata = getMetadata({ ...SEO_DATA.thankYou, robotsNoindex: 'noindex' });

export const viewport = {
  themeColor: '#ffffff',
};

const ThankYouPage = () => (
  <Layout>
    <Hero />
  </Layout>
);

export default ThankYouPage;
