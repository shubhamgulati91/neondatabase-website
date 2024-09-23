import Image from 'next/image';

import Container from 'components/shared/container';

import DownloadIcon from './images/download.inline.svg';
import logo1 from './images/logo-1.svg';
import logo2 from './images/logo-2.svg';
import logo3 from './images/logo-3.svg';
import logo4 from './images/logo-4.svg';
import logoSm1 from './images/logo-sm-1.svg';
import logoSm2 from './images/logo-sm-2.svg';
import logoSm3 from './images/logo-sm-3.svg';
import logoSm4 from './images/logo-sm-4.svg';
import logoSpacingSm from './images/logo-spacing-sm.svg';
import logoSpacing from './images/logo-spacing.svg';

const logos = [logo1, logo2, logo3, logo4];
const logosSm = [logoSm1, logoSm2, logoSm3, logoSm4];

const Hero = () => (
  <section className="hero pb-40 pt-36 xl:pb-28 xl:pt-32 lg:pb-[88px] lg:pt-11 md:pb-[72px] md:pt-8">
    <Container className="flex flex-col gap-y-[104px] xl:gap-y-20 lg:gap-y-16" size="768">
      <div>
        <h1 className="font-title text-[56px] leading-none tracking-extra-tight xl:text-5xl lg:text-4xl md:text-[32px]">
          Brands Guidelines
        </h1>
        <p className="mt-3 max-w-[512px] font-light leading-snug tracking-extra-tight text-gray-new-80 lg:mt-2.5 md:mt-2">
          We’ve created some guidelines to help you use our brands and assets, including our logo,
          content and trademarks.
        </p>
        <a
          className="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary-1 px-5 py-3 text-center text-base font-semibold leading-none tracking-tighter text-black outline-none transition-colors duration-200 hover:bg-[#00e5bf] lg:mt-6 md:mt-5"
          href="/neon-brand-assets.zip"
          download="neon-brand-assets.zip"
        >
          Download brand assets
        </a>
      </div>
      <div>
        <h2 className="font-title text-4xl font-medium leading-none tracking-extra-tight xl:text-[36px] lg:text-[32px] md:text-[28px]">
          Logo
        </h2>
        <p className="mt-3.5 max-w-[512px] font-light leading-snug tracking-extra-tight text-gray-new-80 lg:mt-2.5 md:mt-2">
          Logo is a crucial part of our brand and one of our most valuable assets. We must ensure
          its proper usage. Please do not edit, change, distort, recolor, or reconfigure the Neon
          logo.
        </p>
        <ul className="mt-10 grid auto-cols-fr grid-cols-2 gap-4 xl:mt-9 lg:mt-8 md:mt-7 md:grid-cols-1">
          {logos.map((logo, index) => (
            <li className="group rounded-md odd:bg-white even:bg-black" key={index}>
              <a
                className="group/link relative flex h-[180px] items-center justify-center"
                href={logo}
                download={`neon-logo-${index + 1}.svg`}
              >
                <Image src={logo} alt="Neon logo" width={158} height={44} priority />
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded border opacity-0 transition-opacity duration-300 group-odd:border-gray-new-80 group-odd:text-gray-new-30 group-even:border-gray-new-20 group-even:text-gray-new-94 group-hover/link:opacity-100">
                  <DownloadIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-title text-4xl font-medium leading-none tracking-extra-tight xl:text-[36px] lg:text-[32px] md:text-[28px]">
          Logomark
        </h2>
        <p className="mt-3.5 max-w-[512px] font-light leading-snug tracking-extra-tight text-gray-new-80 lg:mt-2.5 md:mt-2">
          The Neon logomark should only be used in places where there is not enough room to display
          the full logo, or in cases where only brand symbols of multiple brands are displayed.
        </p>
        <ul className="mt-10 grid auto-cols-fr grid-cols-4 gap-4 xl:mt-9 lg:mt-8 md:mt-7 md:grid-cols-2">
          {logosSm.map((logo, index) => (
            <li
              className="group rounded-md [&:nth-child(-n+2)]:bg-white [&:nth-child(-n+2)_span]:border-gray-new-80 [&:nth-child(-n+2)_span]:text-gray-new-30 [&:nth-last-child(-n+2)]:bg-black [&:nth-last-child(-n+2)_span]:border-gray-new-20 [&:nth-last-child(-n+2)_span]:text-gray-new-94"
              key={index}
            >
              <a
                className="group/link relative flex h-[200px] items-center justify-center lg:h-[164px] md:h-[152px]"
                href={logo}
                download={`neon-logo-sm-${index + 1}.svg`}
              >
                <Image
                  className="lg:h-auto lg:w-[52px]"
                  src={logo}
                  alt="Neon logo"
                  width={58}
                  height={58}
                />
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded border opacity-0 transition-opacity duration-200 group-hover/link:opacity-100">
                  <DownloadIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-title text-4xl font-medium leading-none tracking-extra-tight xl:text-[36px] lg:text-[32px] md:text-[28px]">
          Spacing considerations
        </h2>
        <p className="mt-3.5 max-w-[512px] font-light leading-snug tracking-extra-tight text-gray-new-80 lg:mt-2.5 md:mt-2">
          The safety area surrounding the Logo is defined by the height of our symbol.
        </p>
        <div className="mt-10 flex gap-x-14 rounded-md bg-black-new px-14 pb-[54px] pt-[26px] xl:mt-9 lg:mt-8 lg:gap-x-[76px] lg:pb-[67px] lg:pl-[49px] lg:pt-10 md:mt-7 md:flex-col md:justify-center md:gap-y-6 md:p-6">
          <Image
            className="lg:h-[190px] lg:w-auto md:mx-auto md:h-40 md:w-[166px]"
            src={logoSpacingSm}
            alt="Logo spacing"
            width={225}
            height={217}
          />
          <Image
            className="lg:h-[190px] lg:w-auto md:mx-auto md:h-[158px] md:w-[272px]"
            src={logoSpacing}
            alt="Logo spacing"
            width={372}
            height={217}
          />
        </div>
      </div>
    </Container>
  </section>
);

export default Hero;
