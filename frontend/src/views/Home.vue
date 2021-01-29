<template>
  <v-row class="mt-3">
    <draggable class="row">
      <v-col
        v-for="(board,index) in boards"
        :key=" index"
        md="2"
        cols="6"
      >
        <board :board="board" />
      </v-col>

      <v-col
        v-if="newboard"
        class="d-flex  "
        md="2"
        cols="6"
      >
        <v-btn
          color="#c1c7d054"

          dark
          block
          elevation="0"
          @click="addBoard()"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
          Add board
        </v-btn>
      </v-col>
      <v-col
        v-else
        md="2"
        cols="6"
      >
        <new-board-form @cancel="cancel" />
      </v-col>
    </draggable>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { models } from 'feathers-vuex';
import board from '@/components/board.vue';
import newBoardForm from '@/components/NewBoardForm.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Home',
  components: { board, newBoardForm, draggable },
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
