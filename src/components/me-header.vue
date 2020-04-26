<template>
  <header class="me-header">
    <div class="me-header__wrapper">
      <h1 class="me-header__title">meggie</h1>
      <sc-avatar
        class="me-header__avatar"
        :name="user.name"
        :imagePath="user.imagePath"
      ></sc-avatar>
      <sc-button
        class="me-header__logout"
        :iconLeft="{ name: 'sign-out-alt' }"
        title="Logout"
        @click.native="logout"
      ></sc-button>
    </div>
  </header>
</template>

<script>
import ScAvatar from "@scavold/avatar";
import ScButton from "@scavold/button";
import User from "../models/user";
import authService from "../services/auth";

export default {
  name: "me-header",

  components: { ScAvatar, ScButton },

  props: {
    user: User
  },

  methods: {
    logout() {
      authService.logout();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@scavold/core/styles/global";

.me-header {
  background-color: $color-primary;

  &__title {
    color: $text-color-negative;
    margin: 0;
    flex-grow: 1;
  }

  &__wrapper {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px;
  }

  &__avatar {
    margin-right: 16px;
  }

  &__logout {
    @include typo-xl;
  }
}
</style>
