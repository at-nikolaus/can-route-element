import canElement from 'can-element'
import define from 'can-define'

export default class canRouteElement extends canElement.Element {
  constructor() {
    super()
    this.canDefine = define
  }
  routeReady(key) {
    /* nils-route */
    let parseHash = (ev, newVal, oldVal)=>{
      let loc = location.hash.split('!')[1]

      let routeProps = Object.keys(this[key])
      if (loc){
        let locationHash = loc.split("&")
                .map( el => el.split("=") )
                .reduce( (pre, cur) => { pre[cur[0]] = cur[1]; return pre; }, {} )
        let newHash = ()=>{
          let newHash = '#!'+Object.keys(locationHash).map(key=>key+'='+locationHash[key]).join('&')
          if (newHash !== location.hash) {
            console.log('Update: Hash',location.hash,'=>',newHash)
            location.hash = newHash
          }
        }

        if (newVal) { // Updates Values if they are from routeState and diffrent
          routeProps.filter(key=>this.hasOwnProperty(key))
            .filter(key=>this[key])
            .filter(key=>this[key] !== locationHash[key])
            .map(key=>{locationHash[key]=this[key]; return key})
            .map(key=>console.log('Update: locationHash',key,'=>',this[key],newVal))
            .map(()=>newHash())


        } else {
          // keys not in locationHash but in viewModel
          routeProps.filter(key=>!locationHash[key])
            .filter(key=>this.hasOwnProperty(key))
            .filter(key=>this[key])
            .map(key=>{locationHash[key]=this[key]; return key})
            .map(key=>{console.log('locationHash Property lost:',key,this[key]); return key})
            .map(()=>newHash())


          //New Props from Hash
          routeProps.filter(key=>locationHash[key])
            .filter(key=>this.hasOwnProperty(key))
            .filter(key=>this[key] !== locationHash[key])
            .map(key=>{this[key]=locationHash[key]; return key})
            .map((key)=>console.log('Update: ViewModel',key,'=>',this[key]))
        }

      } else {
        // new Hash from Inital Props
        location.hash = '#!'+routeProps.filter(key=>this.hasOwnProperty(key)).filter(key=>this[key]).map(key=>key+'='+this[key]).join('&')
        console.log('init: New locationHash',location.hash)
      }
    }
    window.addEventListener("hashchange", parseHash, false);
    this.on(key, parseHash);
    window.dispatchEvent( new Event("hashchange") )
  }
};
