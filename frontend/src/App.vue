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
          src="@/assets/bewave.png"
          transition="scale-transition"
          width="50"
        />
        <span class="text-h4">Formation : Trello Clone</span>
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

      <v-menu
        v-if="isAuthenticated"
        bottom
        left
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-bind="attrs"
            v-on="on"
          >
            <v-gravatar :email="user.email ? user.email : '' " />
          </v-avatar>
        </template>

        <v-list class="pa-0">
          <v-list-item>
            <v-btn
              class="pa-0 text-overline"
              text
              :loading="isLogoutPending"
              @click="logout"
            >
              Logout<v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main :style="`background-image: url(${this.$route.params.img});background-size: cover;`">
      <v-container
        fluid
      >
        <router-view />
      </v-container>
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
    ...mapState('auth', ['isLogoutPending']),
    ...mapState('auth', ['user']),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
