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
      <v-btn
        :loading="newSubtask.isCreatePending"
        text
        color="success"
        @click="newSubtask.create().then(()=> {newSubtask = new Subtask(); cancel()})"
      >
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
  data: () => ({
    newSubtask: {},
  }),
  computed: {
    Subtask: () => models.api.Subtask,
  },
  created() {
    this.newSubtask = new this.Subtask();
    this.newSubtask.completed = false;
    this.newSubtask.parentTask = this.task._id;
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },

  }
};
</script>
