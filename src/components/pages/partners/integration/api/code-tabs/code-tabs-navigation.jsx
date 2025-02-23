'use client';

import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useState } from 'react';

import BashIcon from 'components/pages/partners/integration/images/bash.inline.svg';
import JavascriptIcon from 'components/pages/partners/integration/images/javascript.inline.svg';
import PHPIcon from 'components/pages/partners/integration/images/php.inline.svg';
import RubyIcon from 'components/pages/partners/integration/images/ruby.inline.svg';
import CodeBlockWrapper from 'components/shared/code-block-wrapper';

const icons = {
  javascript: JavascriptIcon,
  ruby: RubyIcon,
  php: PHPIcon,
  bash: BashIcon,
};

const CodeTabsNavigation = ({ codeSnippets, highlightedCodeSnippets }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <>
      <div className="border-b border-gray-new-10 lg:flex">
        {codeSnippets.map(({ name, iconName }, index) => {
          const Icon = icons[iconName];
          return (
            <button
              className={clsx(
                'relative px-3.5 py-3 transition-colors duration-200 after:absolute after:left-0 after:top-full after:-mt-px after:h-0.5 after:w-full after:transition-colors after:duration-200 hover:text-white lg:flex-1',
                index === activeItem
                  ? 'text-white after:bg-green-45 md:after:bg-transparent'
                  : 'text-gray-new-60 after:bg-transparent'
              )}
              type="button"
              key={index}
              onClick={() => setActiveItem(index)}
            >
              <Icon className="mr-2 inline-block h-6 w-6 md:mr-0 md:h-8 md:w-8" />
              <span className="md:hidden">{name}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[401px] lg:h-[386px]">
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="wait">
            {highlightedCodeSnippets.map(
              (code, index) =>
                index === activeItem && (
                  <m.div
                    className="dark"
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CodeBlockWrapper className="show-linenumbers highlighted-code h-[401px] lg:h-[386px] [&_[data-line]]:text-[15px]">
                      {parse(code)}
                    </CodeBlockWrapper>
                  </m.div>
                )
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </>
  );
};

export default CodeTabsNavigation;

CodeTabsNavigation.propTypes = {
  codeSnippets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
  highlightedCodeSnippets: PropTypes.arrayOf(PropTypes.string).isRequired,
};
