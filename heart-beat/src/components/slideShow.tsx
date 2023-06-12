import React, { useState, useEffect, Suspense } from 'react';
import { people } from './data';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const LazyImage = React.lazy(() => import('next/image'));

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % people.length);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, []);

  return (
    <section className="section pt-12 pb-10 bg-gray-100">
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={`${position}`} key={id}>
              <div className="flex items-center justify-center">
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyImage
                    src={image}
                    width={250}
                    height={250}
                    alt={name}
                    className="person-img"
                  />
                </Suspense>
              </div>
              <h4 className="text-lg text-text font-bold">{name}</h4>
              <p className="title text-lg text-text">{title}</p>
              <p className="text text-lg text-text">“{quote}”</p>
            </article>
          );
        })}
        <button
          className="prev hover:bg-primary-light bg-grey-100"
          onClick={() => setIndex((prevIndex) => prevIndex - 1)}
        >
          <FaAngleLeft />
        </button>
        <button
          className="next hover:bg-primary-light bg-grey-100"
          onClick={() => setIndex((prevIndex) => prevIndex + 1)}
        >
          <FaAngleRight />
        </button>
      </div>
    </section>
  );
};

export default Slideshow;
