<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <Navigation v-on:add-city="toggleModal" />
    <router-view v-bind:cities="cities" />
  </div>
</template>

<script>
import axios from 'axios';
import db from "./firebase/firebaseinit";
import Navigation from './components/Navigation';
import Modal from './components/Modal';

export default {
  name:"App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      APIkey: "f73f346a264f6fcc60077083eeb3e760",
      cities: [],
      modalOpen: null,    
    }
  },
  created() {
    this.getCityWeather();
  },
  methods:{
    getCityWeather() {
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async(doc) => {
          if (doc.type === "added" ) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&appid=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data,
              }).then(() => {
                this.cities.push(doc.doc.data());
              })
            } catch (err) {
              console.log(err)
            }
          }
        })
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Pattaya', sans-serif;
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
}
.container {
  padding: 0 20px;
}
</style>
