<template>
  <v-row>
    <v-col
      v-for="(activity,index) in activities"
      :key="index"
      md="2"
      cols="6"
    >
      <activity :activity="activity" />
    </v-col>
    <v-col
      v-if="newActivity"
      class="d-flex  align-center"
      md="2"
      cols="6"
    >
      <v-btn
        fab
        dark
        color="indigo"
        @click="addActivity()"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-col>
    <v-col
      v-else
      md="2"
      cols="6"
    >
      <newActivity @cancel="cancel" />
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';
import { models } from 'feathers-vuex';
import activity from '@/components/Activity.vue';
import newActivity from '@/components/newActivity.vue';

export default {
  name: 'Board',
  components: { activity, newActivity },
  data: () => ({
    newActivity: true,
  }),
  computed: {
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    Activities: () => models.api.Activities,
    activities: vm => vm.Activities.findInStore({ query: { parentBoard: vm.$route.params.boardId } }).data,
  },

  methods: {
    cancel(value) {
      this.newActivity = value;
    },
    addActivity() {
      this.newActivity = false;
    }
  }
};
</script>

<style>

</style>
