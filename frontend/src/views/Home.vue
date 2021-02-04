<template>
  <v-row class="mt-3">
    <draggable class="row">
      <v-col
        v-for="(board,index) in boards"
        :key="uuid()+ index"
        md="2"
        cols="6"
      >
        <board-card :board="board" />
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
import BoardCard from '@/components/BoardCard.vue';
import newBoardForm from '@/components/NewBoardForm.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Home',
  components: { BoardCard, newBoardForm, draggable },
  data: () => ({
    newboard: true,
  }),
  computed: {
    ...mapState('users', { isBoardLoading: 'isFindPending' }),

    Board: () => models.api.Board,
    boards: vm => vm.Board.findInStore().data,
  },
  created() {
    this.Board.find();
  },
  methods: {
    uuid() {
      return Math.random().toString(36).slice(-6);
    },
    cancel(value) {
      this.newboard = value;
    },
    addBoard() {
      this.newboard = false;
    }
  }
};
</script>
