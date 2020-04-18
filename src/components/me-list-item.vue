<template>
  <li class="me-list-item">
    <sc-avatar name="Julia Neumann" class="me-list-item__picture"></sc-avatar>
    <font-awesome-icon
      class="me-list-item__icon"
      :icon="icon"
    ></font-awesome-icon>
    <time class="me-list-item__date">{{ date }}</time>
    <div class="me-list-item__mileage">{{ record.mileage }} km</div>
    <sc-button
      :iconLeft="{ name: 'edit' }"
      theme="plain"
      class="me-list-item__edit"
      title="Bearbeiten"
    ></sc-button>
  </li>
</template>

<script>
import ScAvatar from "@scavold/avatar";
import ScButton from "@scavold/button";
import { TYPE_TO_ICON } from "../utils/constants";

export default {
  name: "me-list-item",
  components: { ScAvatar, ScButton },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return new Date(this.record.date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    },
    icon() {
      return TYPE_TO_ICON[this.record.type];
    }
  }
};
</script>

<style lang="scss">
@import "~@scavold/core/styles/global";
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
