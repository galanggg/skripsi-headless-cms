import React from 'react'
import Image from 'next/image'

import Container from '../Container'
const Hero = ({ tagline, heroImage }) => {
  return (
    <section>
      <Container>
        <div className="main-hero-wrapper">
          <div className="mx-auto flex flex-col md:flex-row items-center justify-center h-full">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full">KESATO & CO</p>
              <h1 className="my-4 text-5xl font-bold leading-tight w-full">
                KESATO & CO
              </h1>
              <p className="leading-normal text-2xl mb-8">{tagline}</p>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
              <Image
                className="w-full md:w-5/5 z-50"
                src={heroImage}
                alt="hero-image"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
