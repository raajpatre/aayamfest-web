import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  as: Component = 'h2',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const isTextContent = typeof children === 'string';

  const splitText = useMemo(() => {
    const text = isTextContent ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children, isTextContent]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const targets = el.querySelectorAll(isTextContent ? '.char' : '.scroll-float-block');

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      isTextContent
        ? {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: '50% 0%'
          }
        : {
            willChange: 'opacity, transform, filter',
            opacity: 0,
            y: 100,
            scale: 0.9,
            filter: 'blur(10px)',
            transformOrigin: '50% 100%'
          },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: isTextContent ? 0 : undefined,
        y: isTextContent ? undefined : 0,
        scaleY: isTextContent ? 1 : undefined,
        scaleX: isTextContent ? 1 : undefined,
        scale: isTextContent ? undefined : 1,
        filter: isTextContent ? undefined : 'blur(0px)',
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, isTextContent]);

  return (
    <Component ref={containerRef} className={`scroll-float ${containerClassName}`}>
      {isTextContent ? (
        <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
      ) : (
        <div className="scroll-float-block">{children}</div>
      )}
    </Component>
  );
};

export default ScrollFloat;
