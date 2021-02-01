<template>
  <v-container>
    <v-row>
      <v-col class="pt-1 pl-1" cols="10">
        <v-icon class="ml-2" small @click="removeTask()">
          mdi-window-close
        </v-icon>
      </v-col>
    </v-row>
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
        <v-dialog
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              :content="2"
              rigth
              overlap
            >
              <v-icon
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                mdi-card-text-outline
              </v-icon>
            </v-badge>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
                elevation="0"
              >
                <span class="text-h4">Task : {{ editTask.taskName }}</span>
              </v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-1">
                  <subtasks :task="task" />
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { models } from 'feathers-vuex';
import subtasks from '@/components/Subtasks.vue';

export default { name: 'task',
  components: { subtasks },
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
    async updateTask() {
      try {
        await this.editTask.update();
      } catch (error) {
        this.updateTaskError = error.message;
      }
    },
    async removeTask() {
      try {
        await this.editTask.remove();
      } catch (error) {
        this.removeTaskError = error.message;
      }
    }

  } };
</script>

<style>

</style>
