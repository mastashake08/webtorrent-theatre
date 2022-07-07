import * as WebTorrent from 'webtorrent'
export default class TorrentManager {
  constructor() {
    this.url = 'https://yts.mx/api/v2/'
    this.client = new WebTorrent()
  }

  async makeRequest(endpoint) {
    try {
      const response = await fetch(`${this.url}${endpoint}`)
      return response.json()
    } catch(e) {
      alert(e)
    }
  }

  async getTorrents(query='') {
    try {
      let res = {}
      if(query != '') {
        res = await makeRequest(`list_movies.json?query_term=${query}`)
      } else {
          res = await makeRequest(`list_movies.json`)
      }
      return res.json()
    } catch(e) {
    }
  }

  async getTorrent(id) {
    try {
      const res = await makeRequest(`movie_details.json?movie_id=${id}`)
      return res.json()
    } catch(e) {
    }
  }

  async streamTorrent(torrentId) {
    this.client.add(torrentId, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file
      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })

      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      file.appendTo('body')
    })
  }
}
