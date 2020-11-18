<template>
    <v-card-text>
        <v-textarea
            name="input-7-1"
            label="Files"
            :value="textareaValue"
        ></v-textarea>
    </v-card-text>
</template>

<script>
export default {
    name: "Results",
    props: {
        files: {
            required: true,
            type: Array
        }
    },
    computed: {
        textareaValue() {
            return this.files.join('\n')
        }
    }
}
</script>

<style>

</style>