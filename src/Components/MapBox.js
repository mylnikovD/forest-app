import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl';

import pineSVG from '../icons/pine-icon.svg';
import spruceSVG from '../icons/spruce-icon.svg';
import birchSVG from '../icons/birch-icon.svg';
import othersSVG from '../icons/others-icon.svg';

import { MAPBOX_API_KEY } from '../config';


mapboxgl.accessToken = MAPBOX_API_KEY; 

const icons = [
  {
    src: pineSVG,
    name: 'pine',
  },
  {
    src: spruceSVG,
    name: 'spruce',
  },
  {
    src: birchSVG,
    name: 'birch',
  },
  {
    src: othersSVG,
    name: 'other',
  },
];

const mapConfig = {
  coords: {
    lng: 25.04,
    lat: 62.907,
  },
  zoom: 5.15,
  styleSet: 'mapbox://styles/mapbox/streets-v9',
}

class MapBox extends PureComponent {
  initIcons = (map) => {
    icons.forEach((icon) => {
      const img = new Image(30, 30);
      img.src = icon.src;
      img.onload = () => map.addImage(icon.name, img)
    });
  }

  getData = (mapData) => {
    return {
      type: 'FeatureCollection',
      features: mapData
    }
  }

  initLayer(map) {
    map.addLayer({
      id: 'places',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: this.getData(this.props.mapData),
      },
      layout: {
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
      },
    });
  }

  initEvents(map) {
    map.on('click', 'places', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mouseenter', 'places', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  initMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: mapConfig.styleSet,
      center: mapConfig.coords,
      zoom: mapConfig.zoom,
    });

    map.on('load', () => {
      this.initIcons(map);
      this.initLayer(map);
      this.initEvents(map);
      this.map = map;
    });
  }

  updateMap(mapData) {
    if (!this.map) { return; }
    const source = this.getData(mapData);
    this.map.getSource('places').setData(source);
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate(prevProps) {
    const { mapData: mapDataPrev } = prevProps;
    const { mapData } = this.props;

    if (mapData !== mapDataPrev) {
      this.updateMap(mapData)
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        style={styles.container}
        ref={el => this.mapContainer = el}
      />
    )
  }
}

const styles = {
  container: {
    width: '1200px',
    height: '600px',
    margin: '30px auto'
  }
};

MapBox.propTypes = {
  mapData: PropTypes.array.isRequired,
}

export default MapBox;

