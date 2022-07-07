import * as WebTorrent from 'webtorrent'
export default class TorrentManager {
  constructor() {
    this.url = 'https://yts.mx/api/v2/'
    this.client = new WebTorrent()
  }

  async makeRequest(endpoint) {
    try {
      const response = await fetch(`${this.url}${endpoint}`)
      return await response.json()
    } catch(e) {
      alert(e)
    }
  }

  async getTorrents(query='') {
    try {
      let res = {}
      if(query != '') {
        res = await this.makeRequest(`list_movies.json?query_term=${query}`)
      } else {
          res = await this.makeRequest(`list_movies.json`)
      }
      return res
    } catch(e) {
      console.log(e)
    }
  }

  async getTorrent(id) {
    try {
      const res = await this.makeRequest(`movie_details.json?movie_id=${id}`)
      return res
    } catch(e) {
      console.log(e)
    }
  }

  async streamTorrent(tor) {
    const magUrl = `magnet:?xt=urn:btih:${tor.torrents[0].hash}&dn=${encodeURIComponent(tor.title)}&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.openwebtorrent.com`
    console.log(magUrl)
    this.client.add(magUrl, function (torrent) {
      console.log(torrent)
      // Torrents can contain many files. Let's use the .mp4 file
      torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes)
        console.log('total downloaded: ' + torrent.downloaded)
        console.log('download speed: ' + torrent.downloadSpeed)
        console.log('progress: ' + torrent.progress)
      })
      console.log('Torrent', torrent.files)
      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })

      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      file.appendTo('div#movie')
    })
  }
}
