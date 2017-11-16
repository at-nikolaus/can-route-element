# can-route-element
A CanJS Driven Route Element for Hash Based Routing => can-element + can-define += can-route-element

## Use

importent for binding is only the name of your observed attribute and that your element has a x.addEventListener method named on

in this example we use can-define maybe this exports a addEventListner method so we can unify this.

```javascript

import canRouteElement from 'can-route-element'
import define from 'can-define'
export default class myApp extends canRouteElement.Element {
  constructor() {
    super()
    define(this, {
      channel: { type: 'string' },
      page: {
        type: "string",
        value: "login"
      },
      /* gets called when ever page changes */
      routeState: {
        get: function(){
          return { page: this.page, channel: this.channel }
        }
      }
    })
    this.routeReady("routeState")
  }
}

```
