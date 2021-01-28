<template>
  <v-card>
    <v-system-bar
      color="primary"
      dark
      class="justify-space-between"
    >
      <v-icon @click="removeBoard()">
        mdi-window-close
      </v-icon>
      <v-icon @click="bgChange">
        mdi-dots-horizontal
      </v-icon>
    </v-system-bar>
    <v-sheet>
      <v-text-field
        v-model="editBoard.name"
        class="text-h5"
        flat
        hide-details
        solo
        @blur="updateBoard"
      />
    </v-sheet>

    <v-card
      v-if="edit"
      height="250px"
      elevation="0"
    >
      <v-card-title class="d-flex justify-center align-center" primary-title>
        Change background url
      </v-card-title>
      <v-text-field
        v-model="editBoard.img"
        class="justify-center pa-5"
        flat
        hide-details
      />
      <v-card-actions class="justify-space-between">
        <v-btn text color="error" @click="bgChange">
          cancel
        </v-btn>
        <v-btn text color="success" @click="updateBoard">
          save
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-img
      v-else
      :src="editBoard.img"
      height="250px"
      @click="openBoard"
    />
    <v-card-actions>
      <v-avatar size="16">
        <v-gravatar :email="user.email ? user.email : '' " />
      </v-avatar> <span class="ml-1 text-caption">{{ user.name }} - {{ board.updatedAt | moment("from") }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';

export default {
  name: 'board',

  props: {
    img: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    board: {
      Type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editBoard: {},
      edit: false
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  created() {
    const { Board } = models.api;
    this.editBoard = new Board(this.board);
  },
  methods: {
    openBoard() {
      this.$router.push({ name: 'board', params: { boardId: this.board._id, img: this.editBoard.img } });
    },
    updateBoard() {
      this.bgChange();
      this.editBoard.update();
    },
    bgChange() {
      this.edit = !this.edit;
    },
    removeBoard() {
      this.editBoard.remove();
    }
  }
};
</script>

<style>
</style>
