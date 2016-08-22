import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Footer from './Footer';

storiesOf('Footer', module)
  .add('Basic Footer View', () => (
    <Footer />
  ));
