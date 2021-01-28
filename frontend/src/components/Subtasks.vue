<template>
  <v-card
    class="mx-auto"
    elevation="0"
    tile
  >
    <v-card-title primary-title>
      Subtasks
    </v-card-title>
    <v-progress-linear color="green" height="10" :value="(selected.length/tasks.length)*100 ">
      <span class="text-caption">{{ Math.ceil((selected.length/tasks.length)*100) }}%</span>
    </v-progress-linear>
    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="blue--text"
        multiple
      >
        <template v-for="(task, index) in tasks">
          <v-list-item :key="task.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="task.title" />

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="task.headline"
                />

                <v-list-item-subtitle v-text="task.subtitle" />
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="task.action" />

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-check-outline
                </v-icon>

                <v-icon
                  v-else
                  color="green darken-3"
                >
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < tasks.length - 1"
            :key="index"
          />
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'Subtasks',
  data() {
    return {
      selected: [2],
      tasks: [
        {
          action: '15 min',
          headline: '',
          subtitle: '',
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: 'Wish I could come, but I\'m out of town this weekend.',
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
    };
  }
};
</script>

<style>

</style>
