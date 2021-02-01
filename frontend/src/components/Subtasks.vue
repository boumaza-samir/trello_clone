<template>
  <v-card
    class="mx-auto"
    elevation="0"
    tile
  >
    <v-card-title primary-title>
      there is {{ subtasks.length }} subtasks
    </v-card-title>

    <!--     <v-progress-linear color="green" height="10" :value="(selected.length/subtasks.length)*100 ">
      <span class="text-caption">{{ Math.ceil((selected.length/subtasks.length)*100) }}%</span>
    </v-progress-linear> -->

    <v-btn block text @click="addSubtask">
      <v-icon>mdi-plus</v-icon> new subtask
    </v-btn>

    <newSubtask v-if="!newSubtask" :task="task" @cancel="cancel" />

    <v-list>
      <v-list-item-group
        v-model="selected"
        active-class="blue--text"
        multiple
      >
        <template
          v-for="(subtask, index) in subtasks"
        >
          <v-list-item :key="uuid()+index">
            <subtask
              two-line
              :subtask="subtask"
            />
            <v-divider
              v-if="index < subtasks.length - 1"
              :key="index"
            />
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import newSubtask from '@/components/NewSubTaskForm.vue';
import { models } from 'feathers-vuex';
import { mapState } from 'vuex';
import subtask from '@/components/SubTask.vue';

export default {
  name: 'Subtasks',
  components: { newSubtask, subtask },
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

      newSubtask: true,
      selected: [],

    };
  },
  computed: {
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    Subtasks: () => models.api.Subtask,
    subtasks: vm => vm.Subtasks.findInStore({ query: { parentTask: vm.task._id } }).data,
  },
  created() {
    this.Subtasks.find();
  },
  methods: {
    uuid() {
      return Math.random().toString(36).slice(-6);
    },
    selectedItem(value) {
      this.selected = value;
    },
    cancel(value) {
      this.newSubtask = value;
    },
    addSubtask() {
      this.newSubtask = !this.newSubtask;
    }
  }
};

</script>

<style>

</style>
