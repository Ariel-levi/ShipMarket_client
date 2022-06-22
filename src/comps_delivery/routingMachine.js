import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = (props) => {
  let start = props.start;
  let stop = props.stop;
  let end = props.end;
  console.log('start', start);
  console.log('stop', stop);
  console.log('end', end);
  // y , x
  // L.latLng(31.7780704, 35.2359605),
  // L.latLng(32.0907216, 34.900325),
  const instance = L.Routing.control({
    waypoints: [L.latLng(start), L.latLng(stop), L.latLng(end)],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }]
    },
    // show: true,
    pointMarkerStyle: {
      color: '#00FF80'
    },

    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  // instance.on("routesfound", function (e) {
  //   let distance = e.routes[0].summary.totalDistance;
  //   let time = e.routes[0].summary.totalTime;
  //   // props.setRoutingTime(Math.round((time % 3600) / 60));
  //   props.setRoutingTime(time);
  //   console.log(
  //     "Total distance is " +
  //       Math.round(distance / 1000) +
  //       " km and total time is " +
  //       Math.round((time % 3600) / 60) +
  //       " minutes"
  //   );
  //   console.log("distance", distance);
  //   console.log("time", time);
  // });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
