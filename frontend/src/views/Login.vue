<template>
  <v-container fluid class="fill-height">
    <v-row align-content="center" justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title primary-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="loginError"
              type="error"
            >
              {{ loginError }}
            </v-alert>
            <v-text-field v-model="user.email" label="E-mail" />
            <v-text-field v-model="user.password" label="Password" type="password" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              :loading="isAuthenticatePending"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      loginError: '',
      user: { email: '', password: '' },
    };
  },
  computed: {
    ...mapState('auth', ['isAuthenticatePending']),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      try {
        await this.authenticate({
          ...this.user,
          strategy: 'local'
        });
        this.$router.push('/');
      } catch (error) {
        this.loginError = error.message;
      }
    }
  }

};
</script>
