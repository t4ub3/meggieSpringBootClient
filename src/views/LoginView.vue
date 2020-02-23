<template>
  <div class="login">
      <form @submit.prevent="login">
          <div class="login__field">
              <label for="username">Benutzername:</label>
              <input class="login__input" type="text" name="username" id="username" v-model.trim="$v.username.$model">
          </div>
          <div class="login__field">
              <label for="password">Passwort:</label>
              <input class="login__input" type="password" name="password" id="password" v-model.trim="$v.password.$model">
          </div>
          <div class="login__field">
              <button type="submit">Anmelden</button>
          </div>
      </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import authService from '../services/auth'

export default {
  name: 'LoginView',

  data () {
    return {
      username: '',
      password: ''
    }
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
    async login () {
      try {
        await authService.login({username: this.username, password: this.password})
        this.$router.push({name: 'overview'})
      } catch (error) {
        console.error(error)
        alert('Login fehlgeschlagen!')
      }
    }
  }
}
</script>

<style lang="scss">
    @import '~scavold/src/core/styles/_mixins';

    .login__field {
        padding: 10px;
    }

    .login__input {
      @include sa-input-text;
    }
</style>
