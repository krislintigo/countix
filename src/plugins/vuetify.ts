import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'countix',
    themes: {
      countix: {
        dark: true,
        colors: {
          primary: '#3375b9',
          error: '#cb0022',
        },
      },
    },
  },
});
