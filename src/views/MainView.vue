<template>
  <div>
    <div>Overview</div>
    <div v-for="(item, index) in filteredRecords" :key="index">
      {{ item.mileage }}
      <font-awesome-icon :icon="getIconName(item.type)"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
import recordsService from "../services/records";

export default {
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
          type: "drivingRecord",
          date: record.date,
          mileage: record.mileage
        });
      }
      for (let record of recordData.fuelRecords) {
        records.push({
          type: "fuelRecord",
          date: record.date,
          mileage: record.mileage
        });
      }
      for (let record of recordData.paymentRecords) {
        records.push({
          type: "paymentRecord",
          date: record.date,
          mileage: record.mileage
        });
      }
      return records;
    },
    getIconName(type) {
      switch (type) {
        case "drivingRecord":
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
      console.log(this.records);
    } catch (e) {
      console.error(e);
      alert("Keine Daten. Prüfe, ob du eingeloggt bist!");
    }
  }
};
</script>

<style></style>
