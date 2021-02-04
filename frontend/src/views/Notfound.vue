<template>
  <v-container>
    <v-row class="text--white align-center justify-center">
      <v-col>
        <v-card
          color="transparent"
          elevation="0"
          class="white--text text-center  d-flex flex-column align-center justify-center"
          style="font-size: 300px"
        >
          404
          <v-card-actions>
            <v-btn
              color="success"
              rounded
              elevation="0"
              @click="$router.push({ path: '/'})"
            >
              go to home page
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
