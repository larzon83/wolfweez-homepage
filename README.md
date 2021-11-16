# Wolfweez Homepage

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static production website
# https://www.wolfweez-openair.de/
$ npm run generate

# build SPA preview page
# https://wolfweez-preview.netlify.app/
$ npm run build
```

## Infos

- [Vuetify](https://vuetifyjs.com/en/) UI Framwork
- Payments of tickets is handled via [Stripe](https://stripe.com) and [Netlify serverless functions](https://www.netlify.com/products/functions/) (see `/functions` directory)
- [Netlify dev](https://www.netlify.com/products/dev/) is needed to test out functions locally
- Content comes from [Storyblok](https://www.storyblok.com/) Headless CMS
