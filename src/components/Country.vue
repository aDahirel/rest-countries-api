<template>
  <div class="all">
    <router-link :to="{ name: 'home' }">
      <div id="back">
        <em class="fas fa-arrow-left"></em>
        <p>Back</p>
      </div>
    </router-link>
    <div id="country">
      <img
        :src="`${country.flag}`"
        :alt="`${country.name}`"
        height="300"
        width="400"
        style="margin-right: 150px"
      />

      <div id="country-info">
        <h2>{{ country.name }}</h2>
        <div id="country-info-list">
          <ul>
            <li>
              <p>
                Native Name :
                <span class="country-text">{{ country.nativeName }}</span>
              </p>
            </li>
            <li>
              <p>
                Population :
                <span class="country-text">{{ country.population }}</span>
              </p>
            </li>
            <li>
              <p>
                Region : <span class="country-text">{{ country.region }}</span>
              </p>
            </li>
            <li>
              <p>
                Sub Region :
                <span class="country-text">{{ country.subregion }}</span>
              </p>
            </li>
            <li>
              <p>
                Capital :
                <span class="country-text">{{ country.capital }}</span>
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <p>
                Top Level Domain :
                <span
                  v-for="domain in country.topLevelDomain"
                  v-bind:key="domain"
                  class="country-text"
                  >{{ domain }}</span
                >
              </p>
            </li>
            <li>
              <p>
                Currencies :
                <span
                  v-for="currency in country.currencies"
                  v-bind:key="currency.id"
                  class="country-text"
                  >{{ currency.name }}</span
                >
              </p>
            </li>
            <li>
              <p>
                Languages :
                <span
                  v-for="langage in country.languages"
                  v-bind:key="langage.id"
                  class="country-text"
                  >{{ langage.name }}</span
                >
              </p>
            </li>
          </ul>
        </div>
        <p style="margin-top: 40px">
          Border Countries :
          <span
            class="border-countries"
            v-for="border in borderCountries"
            v-bind:key="border"
          >
            {{ border.name }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      country: [],
      borderCountries: [],
      alpha3Code: [],
      alpha3CodeToString: [],
    };
  },
  mounted() {
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${this.$route.params.name}?fullText=true`
      )
      .then((res) => {
        this.country = res.data[0];
        this.alpha3Code = this.country.borders;
        this.alpha3CodeToString = this.alpha3Code.join(";");
        return axios
          .get(
            `https://restcountries.eu/rest/v2/alpha?codes=${this.alpha3CodeToString}`
          )
          .then((response) => (this.borderCountries = response.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  },
};
</script>
<style scoped>
#country {
  display: flex;
}

#country-info {
  padding: 30px;
}

#country-info-list {
  line-height: 30px;
}

#country-info-list ul {
  margin-right: 100px;
}

#back {
  display: flex;
  margin: 50px 0;
  padding: 13px;
  background-color: var(--dark-blue);
  width: 100px;
  border-radius: 5px;
  color: var(--white);
}

#back:hover {
  cursor: pointer;
}

#back > p {
  font-weight: 300;
  padding: 0 10px;
}

h2 {
  margin-bottom: 30px;
}

#country-info-list {
  display: flex;
}

.country-text {
  font-weight: 200;
}
.border-countries {
  background-color: var(--dark-blue);
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 12px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
}
</style>
