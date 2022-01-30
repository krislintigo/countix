<template>
  <v-app-bar color="primary" app dark>
    <v-row justify="space-between">
      <v-col cols="6">
        <v-app-bar-title>
          <h1 class="text-h4">Countix</h1>
        </v-app-bar-title>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
        <v-avatar color="teal">
          <v-btn fab color="orange darken-1">
            <v-icon dark>
              mdi-account
            </v-icon>
          </v-btn>
        </v-avatar>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
}
</script>

<style scoped>

</style>
