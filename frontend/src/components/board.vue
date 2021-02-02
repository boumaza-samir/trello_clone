<template>
  <v-card>
    <v-text-field
      v-model="editBoard.name"
      class="rounded-0 text-h5"
      flat
      hide-details
      solo-inverted
      @blur="updateBoard()"
    />
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
        <v-btn
          text
          :loading="editBoard.isUpdatePending"
          color="success"
          @click="editBoard.update()"
        >
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
      <v-spacer />
      <v-btn :loading="editBoard.isRemovePending" icon @click="editBoard.remove()">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';

export default {
  name: 'board',

  props: {

    board: {
      Type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      test: {},
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
    bgChange() {
      this.edit = !this.edit;
    },
    isCreatePending() {
      return this.editBoard.isCreatePending;
    },

    async updateBoard() {
      try {
        await this.editBoard.update();
      } catch (error) {
        this.updateBoardError = error.message;
      }
    },
    async removeBoard() {
      try {
        await this.editBoard.remove();
      } catch (error) {
        this.removeBoardError = error.message;
      }
    }
  }
};
</script>

<style>
</style>
