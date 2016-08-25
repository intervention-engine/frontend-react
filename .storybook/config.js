import { configure } from '@kadira/storybook';
import 'bootstrap-loader';
import '../src/styles/application.scss'

function loadStories() {
  // require('../components/stories/button');
  require('../src/components/Header/Header.story')
  require('../src/components/Footer.story')
  // require as many stories as you need.
}

configure(loadStories, module);
