<template>
  <div>
    <me-header></me-header>
    <me-filter></me-filter>
    <ul class="main-view__list">
      <me-list-item
        v-for="record in filteredRecords"
        :key="record.id"
        :record="record"
      ></me-list-item>
    </ul>
    <me-bottom-container></me-bottom-container>
  </div>
</template>

<script>
import MeHeader from "../components/me-header.vue";
import MeFilter from "../components/me-filter.vue";
import MeListItem from "../components/me-list-item.vue";
import MeBottomContainer from "../components/me-bottom-container.vue";

import recordsService from "../services/records";

export default {
  components: { MeHeader, MeFilter, MeListItem, MeBottomContainer },

  name: "MainView",

  data() {
    return {
      records: []
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
.main-view {
  &__list {
    padding: 8px;
    margin: 0;
  }
}
</style>
