<template>
  <v-card-text>
      {{fileCount}} / {{files.length}}
  </v-card-text>
</template>

<script>
export default {
    name: "DownloadProgress",
    props: {
        files: {
            type: Array,
            required: true
        },
        fileCount: {
            type: Number,
            required: true
        }
    }
}
</script>

<style>

</style>