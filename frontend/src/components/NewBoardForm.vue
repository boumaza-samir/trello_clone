<template>
  <v-card>
    <v-card-text>
      <v-sheet class="text-h6">
        Add new board
      </v-sheet>
      <v-text-field
        v-model="newBoard.name"
        label="label"
      />
      <v-text-field
        v-model="newBoard.img"
        label="background"
      />
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn text color="error" @click="cancel">
        cancel
      </v-btn>
      <v-btn text color="success" @click="addNewBoard">
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'new-board-form',

  computed: {
    isCreatePending() {
      return this.newBoard.isCreatePending;
    }
  },
  created() {
    const { Board } = models.api;
    this.newBoard = new Board({});
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },
    async addNewBoard() {
      try {
        await this.newBoard.create();
        this.$emit('cancel', true);
      } catch (error) {
        this.newBoardError = error.message;
      }
    }
  }

};
</script>
