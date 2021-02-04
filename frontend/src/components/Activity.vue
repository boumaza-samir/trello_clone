<template>
  <v-card class="pa-2" color="#ebecf0">
    <v-chip
      label
      pill
      small
      class="mr-0 text-bold"
      color="primary"
    >
      <strong v-if="activity.tasks.length < 1">  {{ activity.tasks.length }} task</strong>
      <strong v-else>  {{ activity.tasks.length }} tasks</strong>
    </v-chip>

    <v-sheet>
      <v-text-field
        v-model="editActivity.activityName"
        background-color="#ebecf0"
        class="text-subtitle-1 rounded0"
        solo
        flat
        hide-details
        label="edit board name"
        :loading="editActivity.isUpdatePending"
        @blur="editActivity.update()"
      />
    </v-sheet>
    <v-btn
      block
      x-small
      text
      elevation="0"
      class="pa-1 text-left"
      @click="addTask"
    >
      <v-icon small>
        mdi-plus
      </v-icon>
      add task
    </v-btn>
    <newtaskform v-if="!newtask" :activity-id="activity._id" @cancel="cancel" />
    <draggable class="card">
      <v-card
        v-for="(task,index) in activity.tasks"
        :key="index + uuid()"
        class="my-2"
        elevation="1"
      >
        <task
          :task="task"
        />
      </v-card>
    </draggable>
    <v-card-actions>
      <v-btn icon :loading="editActivity.isRemovePending" @click="editActivity.remove()">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';

import task from '@/components/Task.vue';
import newtaskform from '@/components/newTaskForm.vue';
import draggable from 'vuedraggable';

export default {
  name: 'activity',

  components: { task, newtaskform, draggable },
  props: {
    img: {
      type: String,
      default: ''
    },
    activity: {
      Type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newtask: true,
      editActivity: {},
    };
  },

  computed: {
    Activities: () => models.api.Activities,
  },
  created() {
    this.editActivity = this.activity.clone();
  },
  methods: {
    uuid() {
      return Math.random().toString(36).slice(-6);
    },
    cancel(value) {
      this.newtask = value;
    },
    addTask() {
      this.newtask = !this.newtask;
    },

  }
};
</script>

<style>
</style>
