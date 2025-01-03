<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
  >
    <v-card>
      <v-toolbar>
        <v-btn
            icon="mdi-close"
            @click="dialog = false"
        ></v-btn>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
              text="Сохранить"
              variant="text"
              @click="$emit('close')"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CustomModelWindow",
  data(){
    return{
      dialog: false,
    }
  },
  methods:{
    open(){
      this.dialog = true
    }
  }
}
</script>

<style scoped>
</style>