<template>
    <div>
        <DownloadProgress :files="files" :fileCount="fileCount" v-if="downloadStart" />
        <v-card-text v-else>
            <v-row>
                <v-textarea
                    name="input"
                    :height="250"
                    :label="title"
                    no-resize
                    :value="textareaValue"
                ></v-textarea>
            </v-row>
            <v-row
                align="center"
                justify="space-between"
            >
                <v-btn
                    color="green"
                    @click="downloadFiles"
                >
                    Download All
                </v-btn>
                <v-btn
                    color="red"
                    @click="handleClose"
                >
                    Close
                </v-btn>
            </v-row>
        </v-card-text>
    </div>
</template>

<script>
import DownloadProgress from './DownloadProgress';

export default {
    name: "Results",

    data: function() {
        return {
            downloadStart: false,
            fileCount: 0
        }
    },

    props: {
        files: {
            required: true,
            type: Array,
            default: () => []
        }
    },

    components: {
        DownloadProgress
    },

    computed: {
        textareaValue() {
            return this.files.join('\n')
        },
        title() {
            return 'Links count: ' + this.files.length
        }
    },

    methods: {
        handleClose() {
            this.$emit('close');
        },

        async downloadFiles(){
            this.downloadStart = true;
            for(let i = 0; i < this.files.length; i++){
                this.fileCount = i;
                await fetch(this.files[i])
                    .then(resp => resp.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = this.files[i].match(/files\/([^/?]+)\?v=/)[1];
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(() => alert('there was an error'));
            }
            alert('Done!')
            this.$emit('close');
        }
    }
}
</script>

<style>
    textarea {
        height: 250px;
        font-size: 12px;
    }
</style>