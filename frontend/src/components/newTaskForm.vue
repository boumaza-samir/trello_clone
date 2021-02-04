<template>
  <v-card>
    <v-card-text>
      <v-sheet class="text-h6">
        Add new task
      </v-sheet>
      <v-text-field
        v-model="newTask.taskName"
        label="label"
      />
      <v-card-actions class="justify-space-between">
        <v-btn
          small
          text
          color="error"
          @click="cancel"
        >
          cancel
        </v-btn>
        <v-btn
          small
          text
          :loading="newTask.isCreatePending"
          color="success"
          @click="newTask.create().then(() => {newTask = new Task(); cancel()})"
        >
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
    activityId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    newTask: {}
  }),
  computed: {
    Task: () => models.api.Task,
  },
  created() {
    this.newTask = new this.Task();
    this.newTask.activityId = this.activityId;
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    }
  }

};
</script>
