<template>
  <div>
    <v-row>
      <v-col
        v-for="(board,index) in boards"
        :key="board.name + index"
        md="2"
        cols="6"
      >
        <board :board="board" />
      </v-col>
      <v-col
        v-if="newboard"
        class="d-flex  align-center"
        md="2"
        cols="6"
      >
        <v-btn
          fab
          dark
          color="indigo"
          @click="addBoard()"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        v-else
        md="2"
        cols="6"
      >
        <new-board-form @cancel="cancel" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { models } from 'feathers-vuex';
import board from '@/components/board.vue';
import newBoardForm from '@/components/NewBoardForm.vue';

export default {
  name: 'Home',
  components: { board, newBoardForm },
  data: () => ({
    newboard: true,
  }),
  computed: {
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    Board: () => models.api.Board,
    boards: vm => vm.Board.findInStore().data,
  },
  created() {
    this.Board.find();
  },
  methods: {
    cancel(value) {
      this.newboard = value;
    },
    addBoard() {
      this.newboard = false;
    }
  }
};
</script>
