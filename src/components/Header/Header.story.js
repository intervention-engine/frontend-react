import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Header from './Header';

storiesOf('Header', module)
  .add('Basic Header View', () => (
    <Header />
  ));
