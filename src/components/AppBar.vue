<template>
  <v-app-bar color="primary" app dark>
    <v-row justify="space-between">
      <v-col cols="6">
        <v-app-bar-title>
          <h1 class="text-h4 mt-1">Countix</h1>
        </v-app-bar-title>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="mr-1" v-bind="attrs" v-on="on" @click="resetPaid">
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </template>
          <span>Reset paid</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar>
              <v-btn
                fab color="transparent"
                v-bind="attrs" v-on="on"
              >
                <v-icon>
                  mdi-account
                </v-icon>
              </v-btn>
            </v-avatar>
          </template>
          <span>Profile</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  methods: {
    resetPaid() {
      this.$store.dispatch("resetPaid");
    }
  }
}
</script>

<style scoped>

</style>
