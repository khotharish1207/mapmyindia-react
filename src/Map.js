import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

export default class Map extends React.Component {
  mapNode = null;
  map = null;
  markers = [];

  componentDidMount() {
    this.initializeMap();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.markers, nextProps.markers)) {
      this.removeMarkers();
      this.renderMarkers();
    }
  }

  initializeMap = () => {
    const {
      center,
      zoomControl,
      location,
      zoom,
      hybrid,
      search,

      // Map events
      onResize,
      onZoom,
      onMove,
      onClick,
      onDblclick,
      onMousedown,
      onMouseup,
      onMouseover,
      onMouseout,
      onKeypress,

      onMapLoad
    } = this.props;
    const timer = setInterval(() => {
      let tried = 0;
      if (MapmyIndia && MapmyIndia.Map) {
        clearInterval(timer);
        /**
         * Init Map
         */
        this.map = new MapmyIndia.Map(this.mapNode, {
          center,
          zoomControl,
          location,
          zoom,
          hybrid,
          search
        });

        this.renderMarkers();

        /**
         * Attach events
         */
        onResize && this.map.addEventListener("resize", onResize);
        onZoom && this.map.addEventListener("zoom", onZoom);
        onClick && this.map.addEventListener("click", onClick);
        onDblclick && this.map.addEventListener("dblclick", onDblclick);
        onKeypress && this.map.addEventListener("keypress", onKeypress);
        onMousedown && this.map.addEventListener("mousedown", onMousedown);
        onMouseout && this.map.addEventListener("resize", onMouseout);
        onMouseover && this.map.addEventListener("mouseover", onMouseover);
        onMove && this.map.addEventListener("move", onMove);
        onMouseup && this.map.addEventListener("mouseup", onMouseup);

        onMapLoad && onMapLoad(this.map)
      } else {
        tried++;
        tried === 1500 && clearInterval(timer);
      }
    }, 100);
  };

  removeMarkers = () => {
    this.markers.map(mk => this.map.removeLayer(mk));
    this.markers = [];
  };

  renderMarkers = () => {
    const { markers = [] } = this.props;
    if (!this.map) {
      return;
    }
    markers.map(m => {
      if (m.position && Array.isArray(m.position)) {
        const { position, draggable, title, icon, onClick, onDragend } = m;
        let mk = new L.Marker(position, { draggable, title });

        title && mk.bindPopup(title);

        onDragend && mk.on("dragend", onDragend);
        onClick && mk.on("click", onClick);
        this.map.addLayer(mk);

        this.markers.push(mk);
        this.map.setView(mk.getLatLng());
      }
    });
  };

  render() {
    const { width, height } = this.props;
    return (
      <div
        ref={e => (this.mapNode = e)}
        id="map"
        className="map"
        style={{ width, height }}
      ></div>
    );
  }
}

Map.defaultProps = {
  center: [18.5314, 73.8446],
  zoomControl: true,
  hybrid: true,
  location: true,
  search: true,
  zoom: 15,
  height: "500px",
  width: "100%",
  markers: []
};

Map.propTypes = {
  // map attributes
  center: PropTypes.array,
  zoomControl: PropTypes.bool,
  location: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  hybrid: PropTypes.bool,
  search: PropTypes.bool,

  // Map events
  onResize: PropTypes.func,
  onZoom: PropTypes.func,
  onMove: PropTypes.func,
  onClick: PropTypes.func,
  onDblclick: PropTypes.func,
  onMousedown: PropTypes.func,
  onMouseup: PropTypes.func,
  onMouseover: PropTypes.func,
  onMouseout: PropTypes.func,
  onKeypress: PropTypes.func,
  onMapLoad: PropTypes.func,

  // Markers
  markers: PropTypes.array
};
