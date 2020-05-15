<template>
  <div class="me-main-view">
    <me-header class="me-main-view__header" :user="user"></me-header>
    <main class="me-main-view__wrapper">
      <me-filter></me-filter>
      <ul class="me-main-view__list">
        <me-list-item
          class="me-main-view__list-item"
          v-for="record in filteredRecords"
          :key="record.id"
          :record="record"
        ></me-list-item>
      </ul>
      <sc-slide-up class="me-main-view__slide-up" :initOpen="true">
        <template v-slot:content>
          <me-add-record currentUser="stoffel" type="fuel"></me-add-record>
        </template>
      </sc-slide-up>
    </main>
  </div>
</template>

<script>
import MeHeader from "../components/me-header.vue";
import MeFilter from "../components/me-filter.vue";
import MeListItem from "../components/me-list-item.vue";
import MeAddRecord from "../components/me-add-record.vue";
import ScSlideUp from "@scavold/slide-up";

import recordsService from "../services/records";
import User from "../models/user";

export default {
  components: { MeHeader, MeFilter, MeListItem, MeAddRecord, ScSlideUp },

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    width: 100%;
  }

  &__wrapper {
    max-width: 960px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: hidden;
  }

  &__list {
    padding: 8px;
    margin: 0;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__list-item:last-child {
    margin-bottom: 8px;
  }

  &__slide-up {
    flex-shrink: 0;
  }
}
</style>
