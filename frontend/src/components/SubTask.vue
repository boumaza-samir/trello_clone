<template>
  <v-list-item :ripple="false">
    <template v-slot:default="{ active}">
      <v-list-item-content>
        <v-btn icon :loading="editSubtask.isRemovePending" @click.stop="editSubtask.remove() ">
          <v-icon medium>
            mdi-close
          </v-icon>
        </v-btn>

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
              :loading="editSubtask.isUpdatePending"
              @click.stop
              @blur="editSubtask.update()"
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
            :loading="editSubtask.isUpdatePending"
            @click.stop
            @blur="editSubtask.update()"
          />
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-checkbox
          v-model="editSubtask.completed"
          :input-value="active"
          :loading="editSubtask.isUpdatePending"
          @click.stop
          @change="editSubtask.update()"
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
computed: {
  Subtask: () => models.api.Subtask,
},
created() {
  this.editSubtask = new this.Subtask(this.subtask);
} };

</script>
