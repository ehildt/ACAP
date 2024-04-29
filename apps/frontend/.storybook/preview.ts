import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/scss/style.scss';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
} satisfies Preview;
