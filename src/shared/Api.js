import axios from 'axios'

class Api {
  constructor() {
    this.kitsu = axios.create({ baseURL: 'https://kitsu.io/api/edge' })
    this.gogoanime = axios.create({ baseURL: 'https://api-to-use-in-tcc.vercel.app/anime/gogoanime/' })
  }

  async getCategoryId(slug) {
    let query = `/categories?filter[slug]=${slug}`
    return await this.kitsu.get(query).then(response => {
      return response.data.data[0].id
    })
  }

  async getTrending() {
    let query = `/trending/anime?limit=20`
    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getMangaTrending() {
    let query = `/trending/anime?limit=20`
    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getByCategory(category) {
    const categoryId = await this.getCategoryId(category)
    let query = `/trending/anime?limit=20`
    query += `&in_category=true&category=${categoryId}`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getMangaByCategory(category) {
    const categoryId = await this.getCategoryId(category)
    let query = `/trending/manga?limit=10`
    query += `&in_category=true&category=${categoryId}`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getUpcoming() {
    let query = `/anime?page[limit]=20`
    query += `&filter[status]=upcoming`
    query += `&sort=-userCount`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getEpisodes(animeId, limit = 10, offset = 0) {
    let query = `/anime/${animeId}/episodes`
    query += `?page[limit]=${limit}`
    query += `&page[offset]=${offset}`

    return await this.kitsu.get(query).then(response => {
      return response.data
    })
  }
  
  async getAllEpisodes(animeId, limit = 10, offset = 0) {
    let incrementedOffset = offset * 20;
    let query = `/anime/${animeId}/episodes`
    query += `?page[limit]=${limit}`
    query += `&page[offset]=${incrementedOffset}`

    return await this.kitsu.get(query).then(response => {
      return response.data
    })
  }

  async getGenres(animeId) {
    let query = `/anime/${animeId}/genres`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getCategories(animeId) {
    let query = `/anime/${animeId}/categories`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getStreamingUrl(episode) {
    try {
      let query = `https://animatrix-api.vercel.app/getEpisode/${episode}`;
      const response = await axios(query);
      return response.data;
    } catch (error) {
      return "Unable to get link"
    }
  }
  
  async search(text, limit = 10, offset = 0) {
    if (!text) {
      return
    }

    let query = `/anime?filter[text]=${text}`
    query += `&page[limit]=${limit}`
    query += `&page[offset]=${offset}`

    return await this.kitsu.get(query).then(response => {
      return response.data.data
    })
  }

  async getIdInGogoAnimeApi(text, offset = 0) {
    let query = `/${text}?page=${offset}`;

    
    return await this.gogoanime.get(query).then(response => {
      return response.data;
    });
  }

  async getInfo(id) {
    const query = `/info/${id}`


    return await this.gogoanime.get(query).then(response => {
      return response.data;
    })
  }

  async getInfoByKitsu(id) {
    const query = `/anime/${id}`


    return await this.kitsu.get(query).then(response => {
      return response.data;
    })
  }

  async getInfoOfMangaByKitsu(id) {
    const query = `/manga/${id}`


    return await this.kitsu.get(query).then(response => {
      return response.data;
    })
  }
}

export default new Api()