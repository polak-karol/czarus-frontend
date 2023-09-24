import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { FeaturesSection } from './styles'
import { featuresSlides } from './config'
import FeatureSlide from './FeatureSlide'

const Features = () => (
  <FeaturesSection>
    <Carousel interval={8000} animation="slide">
      {featuresSlides.map((featuresSlide) => (
        <FeatureSlide key={featuresSlide[0].title} slide={featuresSlide} />
      ))}
    </Carousel>
  </FeaturesSection>
)

export default Features
