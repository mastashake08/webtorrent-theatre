<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="movie"></div>
    <p>
      Check the latest movies in your browser for free!
      <input v-on:keyup="search(query)" v-model="query" />
    </p>
    <h3>Movies</h3>
    <ul v-if="torrents.data">
      <li v-for="(item) in torrents.data.movies" :key="item.id">
        <img :src="item.medium_cover_image"/>
        <p>
          {{item.title}}
          <button v-on:click="torManager.streamTorrent(item)">Watch</button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import TorrentManager from '../classes/TorrentManager'
export default {
  name: 'HelloWorld',
  data () {
    return {
      torrents: [],
      torManager: {},
      query: ''
    }
  },
  props: {
    msg: String
  },
  async created () {
    this.torManager = new TorrentManager()
    this.torrents = await this.torManager.getTorrents()
  },
  methods: {
    async search () {
      console.log('search')
      this.torrents = await this.torManager.getTorrents(this.query)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
