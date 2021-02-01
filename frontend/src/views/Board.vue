<template>
  <div>
    <v-row class="mt-3">
      <draggable class="row">
        <v-col
          v-for="(activity,index) in activities"
          :key="index + uuid()"
          md="2"
          cols="6"
        >
          <activity :activity="activity" />
        </v-col>

        <v-col
          v-if="newActivity"
          class="d-flex "
          md="2"
          cols="6"
        >
          <v-btn
            color="#f3f3f538"
            class=" grey--text text--lighten-2"
            dark
            block
            elevation="0"
            @click="addActivity()"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
            Add activity
          </v-btn>
        </v-col>
        <v-col
          v-else
          md="2"
          cols="6"
        >
          <newActivity @cancel="cancel" />
        </v-col>
      </draggable>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { models } from 'feathers-vuex';
import activity from '@/components/Activity.vue';
import newActivity from '@/components/newActivity.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Board',
  components: { activity, newActivity, draggable },
  data: () => ({
    newActivity: true,
  }),
  computed: {
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    Activities: () => models.api.Activities,
    activities: vm => vm.Activities.findInStore({ query: { parentBoard: vm.$route.params.boardId } }).data,
  },
  created() {
    this.Activities.find();
    console.log('activities', this.activities);
  },
  methods: {
    uuid() {
      return Math.random().toString(36).slice(-6);
    },
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
