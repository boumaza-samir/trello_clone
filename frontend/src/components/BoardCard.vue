<template>
  <v-card hover>
    <v-card-title>
      <v-text-field
        v-model="editBoard.name"
        class="rounded-0 text-h6"
        flat
        dense
        color="transparent"
        hide-details
        solo
        :loading="editBoard.isUpdatePending"
        @blur="editBoard.update()"
      >
        <template v-slot:prepend>
          <v-avatar size="30">
            <v-gravatar :email="user.email ? user.email : '' " />
          </v-avatar>
        </template>
      </v-text-field>
    </v-card-title>

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
    <v-card-actions class="justify-space-between">
      <v-btn :loading="editBoard.isRemovePending" icon @click="editBoard.remove()">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';

export default {
  name: 'BoardCard',

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
    Board: () => models.api.Board,
  },
  created() {
    this.editBoard = new this.Board(this.board);
  },
  methods: {
    openBoard() {
      this.$router.push({ name: 'board', params: { boardId: this.board._id } });
    },
    bgChange() {
      this.edit = !this.edit;
    },
  }
};
</script>

<style>
</style>
