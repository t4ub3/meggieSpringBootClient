<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="login__field">
        <label class="login__label" for="username">Benutzername:</label>
        <input
          :class="[
            'login__input',
            $v.username.$error ? 'login__input--error' : ''
          ]"
          type="text"
          name="username"
          id="username"
          v-model.trim="$v.username.$model"
        />
      </div>
      <div class="login__field">
        <label class="login__label" for="password">Passwort:</label>
        <input
          :class="[
            'login__input',
            $v.password.$error ? 'login__input--error' : ''
          ]"
          type="password"
          name="password"
          id="password"
          v-model.trim="$v.password.$model"
        />
      </div>
      <div class="login__field">
        <button class="login__button" type="submit">Anmelden</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import authService from "../services/auth";

export default {
  name: "LoginView",

  data() {
    return {
      username: "",
      password: ""
    };
  },

  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },

  methods: {
    async login() {
      try {
        await authService.login({
          username: this.username,
          password: this.password
        });
        this.$router.push({ name: "main" });
      } catch (error) {
        console.error(error);
        alert("Login fehlgeschlagen!");
      }
    }
  }
};
</script>

<style lang="scss">
@import "~scavold/src/core/styles/global";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__label {
    @include typo-l;
    display: block;
  }

  &__field {
    padding: 10px;

    &:last-child {
      padding-top: 20px;
    }
  }

  &__input {
    @include sa-input-text;
    width: 300px;
    max-width: 100%;
  }

  &__button {
    @include sa-button;
  }
}
</style>
