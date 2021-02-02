<template>
  <v-card>
    <v-card-text>
      <v-sheet class="text-h6">
        Add new activity
      </v-sheet>
      <v-text-field
        v-model="newActivity.activityName"
        label="label"
      />
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn text color="error" @click="cancel">
        cancel
      </v-btn>
      <v-btn
        :loading="newActivity.isCreatePending"
        text
        color="success"
        @click="newActivity.create().then( () => {newActivity = new Activities();cancel() })"
      >
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { models } from 'feathers-vuex';

export default {
  name: 'new-activity',

  computed: {
    Activities: () => models.api.Activities,
  },
  created() {
    this.newActivity = new this.Activities();
    this.newActivity.parentBoard = this.$route.params.boardId;
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },

  }

};
</script>
