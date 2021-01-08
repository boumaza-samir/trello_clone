<template>
  <v-container fluid class="fill-height">
    <v-row align-content="center" justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title primary-title>
            Signup
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="signupError"
              type="error"
            >
              {{ signupError }}
            </v-alert>
            <v-text-field v-model="user.name" label="Name" />
            <v-text-field v-model="user.email" label="E-mail" />
            <v-text-field v-model="user.password" label="Password" type="password" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              :loading="isCreatePending"
              @click="signup"
            >
              Signup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { models } from 'feathers-vuex';

export default {
  data() {
    return {
      user: { name: '', email: '', password: '' },
      signupError: '',
    };
  },
  computed: {
    isCreatePending() {
      return this.user.isCreatePending;
    }
  },
  created() {
    const { User } = models.api;
    this.user = new User({});
  },
  methods: {

    async signup() {
      try {
        await this.user.create();
        this.$router.push('/login');
      } catch (error) {
        this.signupError = error.message;
      }
    }
  }

};
</script>
