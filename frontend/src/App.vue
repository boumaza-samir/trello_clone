<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-btn
        v-if="!isAuthenticated"
        text
        :to="'/signup'"
      >
        Signup
      </v-btn>
      <v-btn
        v-if="!isAuthenticated"
        text
        :to="'/login'"
      >
        login
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        text
        :loading="isLogoutPending"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['isLogoutPending'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
