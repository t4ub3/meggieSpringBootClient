<template>
  <div class="me-main-view">
    <me-header :user="user"></me-header>
    <main class="me-main-view__wrapper">
      <me-filter></me-filter>
      <ul class="me-main-view__list">
        <me-list-item
          v-for="record in filteredRecords"
          :key="record.id"
          :record="record"
        ></me-list-item>
      </ul>
      <me-bottom-container></me-bottom-container>
    </main>
  </div>
</template>

<script>
import MeHeader from "../components/me-header.vue";
import MeFilter from "../components/me-filter.vue";
import MeListItem from "../components/me-list-item.vue";
import MeBottomContainer from "../components/me-bottom-container.vue";

import recordsService from "../services/records";
import User from "../models/user";

export default {
  components: { MeHeader, MeFilter, MeListItem, MeBottomContainer },

  name: "me-main-view",

  data() {
    return {
      records: [],
      user: null
    };
  },

  computed: {
    filteredRecords() {
      return this.records;
    }
  },

  methods: {
    parseRecords(recordData) {
      let records = [];
      for (let record of recordData.drivingRecords) {
        records.push({
          type: "driving",
          date: record.date,
          mileage: record.mileage
        });
      }
      for (let record of recordData.fuelRecords) {
        records.push({
          type: "fuel",
          date: record.date,
          mileage: record.mileage
        });
      }
      for (let record of recordData.paymentRecords) {
        records.push({
          type: "payment",
          date: record.date,
          mileage: record.mileage
        });
      }
      return records;
    },
    getIconName(type) {
      switch (type) {
        case "driving":
          return "gas-pump";
        default:
          return "euro-sign";
      }
    }
  },

  async created() {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      this.user = new User(userData.username, userData.email, "");
      let recordData = (await recordsService.getRecords()).data;
      this.records = this.parseRecords(recordData);
    } catch (e) {
      console.error(e);
      alert("Keine Daten. Prüfe, ob du eingeloggt bist!");
    }
  }
};
</script>

<style lang="scss">
.me-main-view {
  &__wrapper {
    max-width: 960px;
    margin: 0 auto;
  }

  &__list {
    padding: 8px;
    margin: 0;
  }
}
</style>
