<template>
  <form>
    <input
      type="date"
      class="me-add-record__date"
      :value="$v.date.$model && $v.date.$model.toISOString().split('T')[0]"
      @input="$v.date.$model = $event.target.valueAsDate"
    />
    <input
      type="number"
      class="me-add-record__mileage"
      v-model.number="$v.mileage.$model"
    />
    <input
      v-if="type === 'fuel'"
      type="number"
      class="me-add-record__amount"
      v-model.number="$v.amount.$model"
    />
    <select class="me-add-record__user" v-model="$v.user.$model">
      <option value="neumann">Neumann</option>
      <option value="stoffel">Stoffel</option>
    </select>
  </form>
</template>

<script>
import { required, requiredIf, numeric } from "vuelidate/lib/validators";

export default {
  name: "me-add-record",

  props: {
    type: {
      type: String,
      default: "driving",
      validator: value => {
        return ["driving", "fuel", "payment"].includes(value);
      }
    },

    currentUser: {
      type: String,
      required: true
    }
  },

  data: () => {
    return {
      date: new Date(),
      mileage: 0,
      amount: 0,
      user: ""
    };
  },

  validations: {
    date: {
      required
    },
    mileage: {
      numeric,
      required
    },
    amount: {
      numeric,
      required: requiredIf(function() {
        return this.type === "fuel";
      })
    },
    user: {
      required
    }
  },

  created() {
    this.user = this.currentUser;
  }
};
</script>

<style lang="scss">
@import "~@scavold/core/styles/global";

.me-add-record {
  &__date,
  &__mileage,
  &__amount {
    @include sa-input-text;
  }
}
</style>
