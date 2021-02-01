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
        :loading="isCreatePending"
        text
        color="success"
        @click="addNewActivity"
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
    isCreatePending() {
      return this.newActivity.isCreatePending;
    }
  },
  created() {
    const { Activities } = models.api;
    this.newActivity = new Activities({});
    this.newActivity.parentBoard = this.$route.params.boardId;
  },
  methods: {

    cancel() {
      this.$emit('cancel', true);
    },
    async addNewActivity() {
      console.log('addNewBoard', this.newActivity);
      try {
        await this.newActivity.create();
        this.$emit('cancel', true);
      } catch (error) {
        this.newActivityError = error.message;
      }
    }
  }

};
</script>
