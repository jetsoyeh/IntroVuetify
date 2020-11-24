<template>
  <div>
    <div>
      <h2>請輸入地點</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace" style="color:white"> </gmap-autocomplete>
        <button @click="addMarker" class="mapbtn"><i class="fas fa-search-plus"></i></button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width: 800PX; height: 600px">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
<script>
export default {
  name: "Map",
  data() {
    return {
      center: { lat: 25.0325917, lng: 121.5624999 },
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(places) {
      this.currentPlace = places;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },

  //建立地標
  /*setMarker(){
            const marker = new VueGoogleMaps.gmapApi.maps.Marker({
                position:{lat:this.lat,lng:this.lng},
                map:this.maps
            });
        }*/
};
</script>
<style scoped>
#map {
  width: 90vw;
  height: 90vw;
}
.mapbtn{
    margin-left: 10px;
}
</style>