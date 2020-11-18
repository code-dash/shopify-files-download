<template>
    <v-overlay :value="overlay">
        <v-dialog
            :value="true"
            max-width="600px"
            persistent
        >
            <v-card
                color="primary"
                dark
            >
                <Results :files="files" v-if="result" @close="handleClose" />
                <v-card-text v-else>
                    Processing request: {{page}}
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-overlay>
</template>

<script>
import Results from './Results.vue';

export default {
    name: "Overlay",

    props: {
        files: {
            type: Array,
            required: true
        },
        result: {
            type: Boolean,
            required: true
        },
        overlay: {
            type: Boolean,
            required: true
        },
        page: {
            type: Number,
            required: true
        }
    },

    components: {
        Results
    },

    methods: {
        handleClose() {
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>