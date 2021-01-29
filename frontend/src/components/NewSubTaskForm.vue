<template>
  <v-card>
    <v-card-text>
      <v-sheet class="text-h6">
        Add new subtask
      </v-sheet>
      <v-text-field
        v-model="newSubtask.title"
        label="title"
      />
      <v-textarea
        v-model="newSubtask.comment"
        auto-grow
        outlined
        rows="2"
      />
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn text color="error" @click="cancel">
        cancel
      </v-btn>
      <v-btn text color="success" @click="addNewSubTask">
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'new-subtask-form',
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isCreatePending() {
      return this.newBoard.isCreatePending;
    }
  },
  created() {
    console.log(models.api);
    const { Subtask } = models.api;
    this.newSubtask = new Subtask({});
    this.newSubtask.completed = false;
    this.newSubtask.parentTask = this.task._id;
    console.log('this.task', this.newSubtask);
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },
    async addNewSubTask() {
      console.log('addNewBoard', this.newSubtask);
      try {
        await this.newSubtask.create();
        this.cancel();
      } catch (error) {
        console.log(error.message);
        this.newBoardError = error.message;
      }
    }
  }

};
</script>
