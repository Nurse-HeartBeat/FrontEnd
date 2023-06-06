import React, { useState, useEffect } from 'react';
import data from './data';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Image from 'next/image';

const Slideshow = () => {
  const people = data;
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    console.log(people)
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <section className="section bg-white pt-10">
      {/* <div className="title">
        <h2 className="text-2xl">
          reviews
        </h2>
      </div> */}
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
            <article className={position} key={id}>
              <div className="flex items-center justify-center">
                <Image src={image} width={200} height={200} alt={name} className="person-img" />
              </div>
              <h4 className="text-lg text-text font-bold">{name}</h4>
              <p className="title text-lg text-text">{title}</p>
              <p className="text text-lg text-text">“{quote}”</p>
            </article>
          );
        })}
        <button className="prev bg-accent hover:bg-primary-light" onClick={() => setIndex(index - 1)}>
          <FaAngleLeft />
        </button>
        <button className="next bg-accent hover:bg-primary-light" onClick={() => setIndex(index + 1)}>
          <FaAngleRight />
        </button>
      </div>
    </section>

  );
};

export default Slideshow;
