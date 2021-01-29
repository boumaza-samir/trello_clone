<template>
  <v-card class="pa-2" color="#ebecf0">
    <v-system-bar
      color="#ebecf0"
      dark
      class="justify-space-between"
    >
      <v-icon color="black" @click="removeActivity()">
        mdi-window-close
      </v-icon>

      <v-chip
        label
        pill
        small
        class="ma-2 text-bold"
        color="primary"
      >
        <strong v-if="tasks.length < 1">  {{ tasks.length }} task</strong>
        <strong v-else>  {{ tasks.length }} tasks</strong>
      </v-chip>
    </v-system-bar>
    <v-sheet>
      <v-text-field
        v-model="editActivity.activityName"
        background-color="#ebecf0"
        class="text-subtitle-1"
        solo
        flat
        hide-details
        label="edit board name"
        @blur="updateActivity"
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
    <newtaskform v-if="!newtask" :parent-activity="activity._id" @cancel="cancel" />
    <draggable class="card">
      <v-card
        v-for="(task,index) in tasks"
        :key="index + uuid()"
        class="my-2"
        elevation="1"
      >
        <task
          :task="task"
        />
      </v-card>
    </draggable>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';
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

    ...mapState('auth', ['user']),
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    Task: () => models.api.Task,
    tasks: vm => vm.Task.findInStore({ query: { parentActivity: vm.activity._id } }).data,
  },
  created() {
    const { Activities } = models.api;
    this.editActivity = new Activities(this.activity);
    this.Task.find();
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

    updateActivity() {
      this.editActivity.update();
    },
    removeActivity() {
      this.editActivity.remove();
    }
  }
};
</script>

<style>
</style>
