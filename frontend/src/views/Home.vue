<template>
  <div class="home">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      item-key="_id"
      :loading="isUserLoading"
      loading-text="Loading... Please wait"
    />
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { models } from 'feathers-vuex';
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({

  }),
  computed: {
    ...mapState('users', { isUserLoading: 'isFindPending' }),

    User: () => models.api.User,
    users: vm => vm.User.findInStore().data,
    headers() {
      return [
        { value: 'email', text: 'Email' },
        { value: 'name', text: 'Name' },
        { value: 'createdAt', text: 'Created' },
        { value: 'updatedAt', text: 'Updated' }
      ];
    }
  },
  created() {
    this.User.find();
  },

};
</script>
