import Image from 'next/image';

import Container from 'components/shared/container/container';
import GradientLabel from 'components/shared/gradient-label';

import map from './images/map.jpg';

const Regions = () => (
  <section className="regions safe-paddings mt-48 xl:mt-[124px] lg:mt-28 md:mt-20">
    <Container
      className="grid grid-cols-12 items-center gap-x-10 xl:gap-x-6 lg:gap-x-4 md:grid-cols-1 md:gap-y-8"
      size="medium"
    >
      <div className="col-span-4 col-start-2 flex flex-col items-start xl:col-span-5 xl:col-start-1 md:col-span-full md:items-center">
        <GradientLabel>Regions</GradientLabel>
        <h2 className="mt-5 font-title text-5xl font-medium leading-none tracking-extra-tight xl:text-[44px] lg:text-4xl md:mt-3 md:text-center md:text-[32px] sm:max-w-xs">
          A database that is close to your users
        </h2>
        <p className="mt-3 max-w-[440px] text-lg font-light leading-snug xl:text-base md:max-w-xs md:text-center">
          Neon supports multiple regions worldwide to create the fastest Postgres experience.
        </p>
      </div>
      <div className="col-span-5 col-end-12 xl:col-span-6 xl:col-end-13 md:col-span-full">
        <Image
          className="md:w-full md:max-w-full"
          src={map}
          alt="Israel map"
          width={590}
          height={532}
          quality={90}
          sizes="(max-width: 768px) 590px, 100vw"
        />
      </div>
    </Container>
  </section>
);

export default Regions;
