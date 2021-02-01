<template>
  <v-list-item :ripple="false">
    <template v-slot:default="{ active}">
      <v-list-item-content>
        <v-system-bar
          color="transparent"
          height="30"
        >
          <v-icon medium @click.stop="removeSubtask">
            mdi-close
          </v-icon>
        </v-system-bar>

        <v-list-item-title>
          <v-list-item-action class="my-0 mx-7">
            <v-text-field
              v-model="editSubtask.title"
              class="text-subtitle-1"
              background-color="transparent"
              solo
              flat
              dense
              hide-details
              label="edit title"
              @click.stop
              @blur="updateSubtask"
            />
          </v-list-item-action>
        </v-list-item-title>
        <v-list-item-subtitle
          class="text--primary"
        >
          <v-textarea
            v-model="editSubtask.comment"
            class="my-0 mx-7"
            auto-grow
            outlined
            rows="2"
            hide-details
            @click.stop
            @blur="updateSubtask"
          />
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-checkbox
          v-model="editSubtask.completed"
          :input-value="active"
          @click.stop
          @change="updateSubtask"
        />
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import { models } from 'feathers-vuex';

export default { props: {
  subtask: {

    type: Object,
    default: () => {}
  }
},
data() {
  return {
    editSubtask: {},
  };
},
created() {
  const { Subtask } = models.api;
  this.editSubtask = new Subtask(this.subtask);
},
methods: {
  async updateSubtask() {
    try {
      await this.editSubtask.update();
    } catch (error) {
      this.updateSubtaskError = error.message;
    }
  },

  async removeSubtask() {
    try {
      await this.editSubtask.remove();
    } catch (error) {
      this.removeSubtaskError = error.message;
    }
  }

} };

</script>
