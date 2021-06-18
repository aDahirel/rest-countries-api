<template>
  <Circle id="loading" v-if="pending" />
  <div class="all" v-else>
    <div id="filter">
      <div id="search">
        <em class="fas fa-search"></em>
        <input
          type="text"
          v-model="search"
          placeholder="Search for a country..."
        />
      </div>
      <div id="region">
        <select v-model="region">
          <option value="">All region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
    <ul id="country-list">
      <li v-for="country in filteredCountries" v-bind:key="country.id">
        <router-link
          :to="{
            name: 'country',
            params: { name: country.name.toLowerCase() },
          }"
        >
          <div class="img-container">
            <img :src="`${country.flag}`" :alt="`${country.name}`" />
          </div>
        </router-link>
        <div class="info-container">
          <h2>{{ country.name }}</h2>
          <ul>
            <li>
              Population : <span>{{ country.population }}</span>
            </li>
            <li>
              Region : <span>{{ country.region }}</span>
            </li>
            <li>
              Capital : <span>{{ country.capital }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Circle from "vue-loading-spinner/src/components/Circle.vue";

export default {
  name: "Home",
  components: {
    Circle,
  },
  data() {
    return {
      countries: [],
      search: "",
      region: "",
      pending: false,
    };
  },
  computed: {
    filteredCountries: function () {
      return this.countries.filter((country) => {
        if (this.region === "" || this.region === "All region") {
          return country.name.toLowerCase().match(this.search.toLowerCase());
        } else if (this.search !== "") {
          if (country.region.toLowerCase().match(this.region.toLowerCase())) {
            return country.name.toLowerCase().match(this.search.toLowerCase());
          }
        } else if (
          country.region.toLowerCase().match(this.region.toLowerCase())
        ) {
          return country.name.toLowerCase().match(this.search.toLowerCase());
        }
      });
    },
  },
  mounted() {
    this.pending = true;
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => (this.countries = res.data))
      .catch((err) => console.log(err.message))
      .finally(() => {
        this.pending = false;
      });
  },
};
</script>

<style scoped>
#country-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px;
  grid-auto-rows: minmax(100px, auto);
  list-style: none;
}

#country-list > li {
  border-radius: 5px;
  background-color: var(--dark-blue);
}

#country-list > li > .info-container {
  padding: 20px;
}

#country-list > li > .img-container {
  max-height: 300px;
}

.img-container {
  height: 200px;
  width: 100%;
  background-color: var(--very-dark-blue);
}

.img-container > img {
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  object-fit: cover;
  width: 100%;
  border-radius: 5px 5px 0px 0px;
}

.info-container > h2 {
  margin-bottom: 20px;
}

.info-container > ul > li {
  margin: 10px 0;
  font-weight: 600;
}

.info-container > ul > li > span {
  font-weight: 300;
}

#search {
  margin-right: auto;
  padding: 5px 0;
  background-color: var(--dark-blue);
  width: 500px;
  border-radius: 5px;
}

#search em {
  margin: 20px;
  font-size: 18px;
}

#search input {
  background-color: var(--dark-blue);
  color: var(--white);
  font-size: 16px;
}

#filter {
  display: flex;
  align-items: center;
  margin: 50px 0;
}

select {
  color: var(--white);
  background-color: var(--dark-blue);
  padding: 20px;
  border-radius: 5px;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
}

select:hover {
  cursor: pointer;
}

option {
  margin: 20px;
}

#loading {
  display: block;
  margin: auto;
  margin-top: 30vh;
  width: 20vw !important;
  height: 20vw !important;
}
</style>