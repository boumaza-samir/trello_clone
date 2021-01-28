<template>
  <v-container>
    <v-row>
      <v-col class="pa-0" cols="10">
        <v-text-field
          v-model="editTask.taskName"
          class="text-subtitle-1 "
          solo
          flat
          hide-details
          label="edit board name"
          @blur="updateTask"
        />
      </v-col>
      <v-col class="d-flex pa-0 justify-center align-center">
        <v-icon small @click="removeTask()">
          mdi-delete
        </v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';

export default { name: 'task',
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editTask: {},
      name: '',
    };
  },

  created() {
    const { Task } = models.api;
    this.editTask = new Task(this.task);
  },
  methods: {
    updateTask() {
      this.editTask.update();
    },
    removeTask() {
      this.editTask.remove();
    }

  } };
</script>

<style>

</style>
