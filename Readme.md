# Open brewery App

## This is a simple brewery App using Open web components, LitElement and open brewery DB Api

#

✨ Author: Rahimuddin ✨ \
✨ Live: https://open-web-components-brewery-app.netlify.app/ ✨
## Key points

- We need to call api in `connectedCallback` as it will run in the initial stage of the component but as this can run multiple times we need to make sure that we are not calling the api multiple times by checking whether `this.breweries` exists or not.

 - Known bug: After changing one brewery status to 'visited' and then filter not-visited, it would give us correct result but the first item would have visited radio button checked.