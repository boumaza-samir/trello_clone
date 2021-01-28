<template>
  <v-card>
    <v-card-text>
      <v-card-title primary-title class="text-uppercase">
        add new task
      </v-card-title>
      <v-text-field
        v-model="newTask.taskName"
        label="label"
      />
      <v-card-actions class="justify-space-between">
        <v-btn text color="error" @click="cancel">
          cancel
        </v-btn>
        <v-btn text color="success" @click="addNewTask">
          save
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'newtaskform',
  props: {
    parentActivity: {
      type: String,
      default: ''
    }
  },
  computed: {
    isCreatePending() {
      return this.newTask.isCreatePending;
    }
  },
  created() {
    const { Task } = models.api;
    this.newTask = new Task({});
    this.newTask.parentActivity = this.parentActivity;
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },
    async addNewTask() {
      try {
        await this.newTask.create();
        this.$emit('cancel', true);
      } catch (error) {
        this.newBoardError = error.message;
      }
    }
  }

};
</script>
