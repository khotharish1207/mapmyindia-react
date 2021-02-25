# MapmyIndia react

React component to implement [MapmyIndia Interactive Map API](https://www.mapmyindia.com/api/advanced-maps/doc/interactive-map-api)

## Getting Started

demo: https://mapmyindia-react-example.herokuapp.com/

### Prerequisites

Integrate interactive maps from MapmyIndia into your browser application by simply including MapmyIndia's interactive map API in your script source in the head section.

```
<script src="https://apis.mapmyindia.com/advancedmaps/v1/<Lic_Key>/map_load?v=1.3"></script>
```

### Installing

```
npm install mapmyindia-react --save
```

### How to use

```
import Map from "mapmyindia-react";

class App extends React.Component {
	 render () {
		 return (
		 	 <Map
          markers={[
              {
                  position: [18.5314, 73.845],
                  draggable: true,
                  title: "Marker title",
                  onClick: e => {
                      console.log("clicked ");
                  },
                  onDragend: e => {
                      console.log("dragged");
                  }
              }
          ]}
          />
		 )
	 }
}

```

### Props

| prop        | type   |   default value    |
| ----------- | ------ | :----------------: |
| center      | array  | [18.5314, 73.8446] |
| zoomControl | bool   |        true        |
| location    | bool   |        true        |
| height      | string |       500px        |
| width       | string |                    |
| zoom        | number |         15         |
| hybrid      | bool   |        true        |
| search      | bool   |        true        |
| markers     | array  |         []         |

Example for marker array

```
  [
    {
      position: [],       // [lat, lng]
      draggable: false,   // true / false
      title: '',          // string
      onClick: () => {},   // Marker click event listener
      onDragend: ()=> {}   // Marker dragend event listener (if draggable is set)
    }
  ]

```

Map events

| Event         |      default value |
| ------------- | :-----------:    |
| onResize| () => {} |
| onZoom| () => {} |
| onMove| () => {} |
| onClick| () => {} |
| onDblclick| () => {} |
| onMouseup| () => {} |
| onMousedown| () => {} |
| onMouseover| () => {} |
| onMouseout| () => {} |
| onKeypress| () => {} |
| onMapLoad| (mapObject) => {} |

## Author

- **Harish S Khot**

## Acknowledgments

- MapmyIndia Interactive Map API
