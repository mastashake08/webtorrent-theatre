<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="movie">
      <p v-if="torrent.downloaded">
        Download Progress: {{torrent.progress * 100}}%
      </p>
    </div>
    <p>
      Check the latest movies in your browser for free!
      <input placeholder="Search Term" v-on:keyup="search(query)" v-model="query" />
    </p>
    <h3>Movies</h3>
    <ul v-if="torrents.data">
      <li v-for="(item) in torrents.data.movies" :key="item.id">
        <img :src="item.medium_cover_image"/>
        <p>
          {{item.title}}
          <button v-on:click="stream(item)">Watch</button>
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
      query: '',
      torrent: {}
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
    stream (item) {
      let that = this
      this.torManager.streamTorrent(item, function (bytes, torrent) {
        that.torrent = torrent
        console.log('just downloaded: ' + bytes)

        console.log('total downloaded: ' + torrent.downloaded)
        console.log('download speed: ' + torrent.downloadSpeed)
        console.log('progress: ' + torrent.progress)
      })
    },
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
