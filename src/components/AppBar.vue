<template>
  <v-app-bar color="primary" app dark>
    <v-row justify="space-between">
      <v-col cols="6">
        <v-app-bar-title>
          <h1 class="text-h4 mt-1">Countix</h1>
        </v-app-bar-title>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
        <v-menu offset-y max-width="230">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-currency-eur</v-icon>
            </v-btn>
          </template>
          <ExchangeRate />
        </v-menu>
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
import ExchangeRate from "@/components/ExchangeRate";
export default {
  name: "AppBar",
  components: {ExchangeRate},
  methods: {
    resetPaid() {
      this.$store.dispatch("resetPaid");
    }
  }
}
</script>

<style scoped>

</style>
