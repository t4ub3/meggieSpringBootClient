<template>
  <li class="me-list-item">
    <div class="me-list-item__picture"></div>
    <font-awesome-icon
      class="me-list-item__icon"
      :icon="icon"
    ></font-awesome-icon>
    <time class="me-list-item__date">{{ record.date }}</time>
    <div class="me-list-item__mileage">{{ record.mileage }}</div>
    <sc-button
      :iconLeft="{ name: 'edit' }"
      class="me-list-item__edit"
    ></sc-button>
  </li>
</template>

<script>
import ScButton from "scavold/src/components/button/sc-button";
import { TYPE_TO_ICON } from "../utils/constants";

export default {
  name: "me-list-item",
  components: { ScButton },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon() {
      return TYPE_TO_ICON[this.record.type];
    }
  }
};
</script>

<style lang="scss">
@import "~scavold/src/core/styles/global";
.me-list-item {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;

  &:not(:last-child) {
    border-bottom: 1px solid $color-gray-lighter-4;
  }
}
</style>
