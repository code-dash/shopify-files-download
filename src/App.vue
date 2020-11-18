<template>
  <v-app>
    <v-main>
      <Overlay :files="files" :page="page" :result="result" :overlay="overlay" @close="handleClose" />

      <v-btn
        dark
        absolute
        top
        right
        fab
        color="blue"
        @click="handleClick"
      >
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Overlay from './components/Overlay';

export default {
  name: 'App',
  /**
   * Data
   */
  data: function () {
    return {
      overlay: false,
      files: [],
      CSRFToken: null,
      page: 0,
      result: false
    }
  },

  components: {
    Overlay
  },

  /**
   * Methods
   */
  methods: {
    /**
     * Get CSRF Token
     *
     * @return  {[type]}  [return description]
     */
    getCSRFToken(){
      const meta = document.querySelector('[name="csrf-token"]');
      if(meta) {
        this.CSRFToken = meta.getAttribute('content')
      }
    },

    /**
     * Get Next link url
     *
     * @param   {Node}  target    the document
     *
     * @return  {String|Boolean}          returns the next url or false
     */
    nextPageLink(target) {
      const link = target.querySelector('.js-pagination-link.js-next-btn:not(.disabled)');
      if(link){
        return link.getAttribute('href').replace('limit=50', 'limit=250')
      }
      return false;
    },

    /**
     * Get links
     *
     * @param   {Node}  target    the document
     *
     * @return  {void}
     */
    getLinks(target) {
      target.querySelectorAll('#assets-table .next-input-wrapper input.next-input').forEach((input) => {
        this.files.push(input.value);
      })
    },

    /**
     * Request files page
     *
     * @param   {String}  url  the url for the next page
     *
     * @return  {void}
     */
    request(url) {
      this.page += 1;
      fetch(url, {
          credentials: "include",
          headers: {
            "x-csrf-token": this.CSRFToken,
            "content-type": "application/x-www-form-urlencoded",
            "x-requested-with": "XMLHttpRequest",
            "x-shopify-web": 1,
            "x-xhr-referer": `https://${window.location.host}/admin/settings/files`
          }
      }).then(res => res.text()).then(res => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, 'text/html');
        this.init(doc);
      })
    },

    /**
     * Init the function
     *
     * @param   {Node}  target    the document
     *
     * @return  {void}
     */
    init(target = document){
      this.getLinks(target);
      if(this.nextPageLink(target)){
        this.request(this.nextPageLink(target))
      } else {
        this.result = true;
        this.overlay = false;
      }
    },

    handleClick() {
      this.getCSRFToken();
      this.init();
      this.overlay = true;
    },

    handleClose() {
      this.overlay = false;
    }
  }
};
</script>

<style lang="scss">
  #shopify-files-download-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 74px;
    height: 70px;
  }

  .v-btn--fab.v-size--default.v-btn--absolute.v-btn--top {
    top: 0 !important;
  }

  #shopify-files-download-wrapper {
    font-size: 16px;

    .toggle-main-nav {
      position: fixed;
      top: 50%;
      right: 0;
    }

    .v-overlay,
    .v-application--wrap {
      z-index: 9999 !important;
    }
  }

  // Fixes for the vuetify global styles breaking Shopify
  html {
    font-size: 62.5% !important;
  }
</style>