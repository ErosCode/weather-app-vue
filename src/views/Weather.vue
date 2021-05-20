<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap">
        <CurrentWeather :isDay="isDay" :isNight="isNight" :currentWeather="currentWeather" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from '../firebase/firebaseinit';
import CurrentWeather from "../components/CurrentWeather";

export default {
    name: "Weather",
    props: ['APIkey', "isDay", "isnight"],
    components: {
        CurrentWeather,
    },
    data() {
        return {
            forecast: null,
            currentWeather: null,
            loading: true,
        }
    },
    created() {
        this.getWeather();
    },
    methods: {
        getWeather() {
            db.collection('cities').where('city', '==', `${this.$route.params.city}`)
            .get().then((docs) => {
                docs.forEach(doc => {
                    this.currentWeather = doc.data().currentWeather;
                    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude={part}&appid=${this.APIkey}`)
                    .then(res => {
                        this.forecast = res.data;
                    })
                    .then(() => {
                        this.loading = false;
                        console.log(this.forecast, 'dgd', this.currentWeather)
                    })
                })
            })            
        }
    }
}
</script>

<style>
    h4 {
        padding-top: 100px;
    }

</style>