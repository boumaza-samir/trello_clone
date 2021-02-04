<template>
  <v-app
    :style="`background-image: url('https://cdn.pixabay.com/photo/2013/07/13/12/08/background-159244__340.png')
  ;background-size: cover;`"
  >
    <snack />
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
            <v-gravatar :email="user ? user.email : '' " />
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

    <v-main
      class="px-4"
      :style="`background-image: url(${board[0] ? board[0].img : ''});background-size: cover;`"
    >
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { models } from 'feathers-vuex';
import Snack from '@/components/Snack.vue';

export default {
  name: 'App',
  components: { Snack },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['isLogoutPending']),
    ...mapState('auth', ['user']),
    Board: () => models.api.Board,
    board: vm => vm.Board.findInStore({ query: { _id: vm.$route.params.boardId } }).data,
  },
  created() {
    const { Board } = models.api;
    this.editBoard = new Board(this.board);
    this.Board.find();
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
