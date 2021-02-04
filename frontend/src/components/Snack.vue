<template>
  <v-snackbar
    v-model="open"
    :color="type"
    :multi-line="multi"
    :timeout="5000"
    v-bind="$attrs"
    top
  >
    {{ message }}

    <template v-slot:action="{ }">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const LEVEL = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

export default {
  data() {
    return {
      open: false,
      type: LEVEL.INFO,
      message: '',
      multi: false,
    };
  },

  computed: {
    ...mapState([
      'messages',
    ]),
  },

  watch: {
    messages(messages, oldMessages) {
      if (messages.length === 0 || messages.length < oldMessages.length) {
        return;
      }
      const { snack, level } = [...messages].pop();
      this.type = level;
      this.message = snack.name ? `${snack.name}: ` : '';
      this.message += snack.message;
      this.show(true);
    },
  },

  methods: {
    ...mapActions({
      acknowledgeLastSnack: 'popSnack',
    }),

    /**
     * Shows or hides the snackbar component.
     *
     * @param {boolean} open Show or hide the component.
     */
    show(open) {
      this.multi = this.message.indexOf('\n') !== -1;
      this.message = this.message.replace('\n', '<br>');

      this.open = open;
    },

    /**
     * Shows a success type message snackbar.
     *
     * @param {string} message Message to display in the component.
     */
    success(message) {
      this.type = LEVEL.SUCCESS;
      this.message = message;
      this.show(true);
    },

    /**
     * Shows a warning type message snackbar.
     *
     * @param {string} message Message to display in the component.
     */
    warn(message) {
      this.type = LEVEL.WARNING;
      this.message = message;
      this.show(true);
    },

    /**
     * Shows an error type message snackbar.
     *
     * @param {string} message Message to display in the component.
     */
    error(message) {
      this.type = LEVEL.ERROR;
      this.message = message;
      this.show(true);
    },

    /**
     * Closes the snackbar component.
     */
    close() {
      this.show(false);
      this.acknowledgeLastSnack();
    },
  },
};
</script>
