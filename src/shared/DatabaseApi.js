import axios from "axios";

class DatabaseApi {
  constructor() {
    this.database = axios.create({ baseURL: "https://animatrix-api.vercel.app" });
  }

  async isLogged(email) {
    let query = `/login/${email}`;

    return await this.database.get(query).then((response) => {
      return response.data[0];
    });
  }

  async getImageUrl(photo_id) {
    let query = `/getImgUser/${photo_id}`;

    return await this.database.get(query).then((response) => {
      return response.data[0].photoUrl;
    });
  }

  async getFavorites(userId) {
    let query = `/getFavorites/${userId}`;

    return await this.database.get(query).then((response) => {
      return response.data;
    })
  }

  async insertRecoveryCode(email, code) {
    let query = "/recoveryPassword"
    let dataParams = {
      email: email,
      code: code
    }
    return await this.database.post(query, dataParams)
      .then(response => console.log(response))
  }

  async requestRecoveryCode(email, code) {
    let query = "/recoveryPassword";
    query += `?email=${email}&code=${code}`;

    return await axios.get(query).then((response) => {
      return response?.data[0]
    })
  }

  async adminEditUser(id, isPremium, isAdmin) {
    const query = '/admin/setNewDataOfUser';
    const params = { id, isPremium, isAdmin };

    try {
      return await this.database.put(query, params);
    } catch (error) {
      console.error(error);
    }
  }

  async setNewPassword(email, password) {
    const query = '/setNewPassword';
    const params = { email, password };

    try {
      return await this.database.put(query, params);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllUserInfo(id) {
    let query = `/getDataOfSpecificUserById/${id}`;

    try {
      return await this.database.get(query).then(response => {
        return response.data[0];
      })
    } catch (error) {
        return console.log(error)
    }
  }

  async getComments(anime_id, episode) {
    let query = `/getComments/${anime_id}/${episode}`;

    try {
      return await this.database.get(query).then(response => {
        return response.data?.comments;
      })
    } catch (error) {
        return console.log(error)
    }

  }

  async getAllUsers() {
    let query = "/admin/getAllUsers";

    try {
      return await this.database.get(query).then(response => {
        return response.data;
      })
    } catch (error) {
        return console.log(error)
    }
  }
  
  async adminRemoveUsers(user_id) {
    let query = `/admin/removeUser/${user_id}`;

    try {
      return await this.database.delete(query).then(response => {
        return response.data;
      })
    } catch (error) {
        return console.log(error)
    }
  }

  async removeFavorite(id, id_anime_api) {
    let query = "/favorite";
    query += `/${id}/${id_anime_api}`
  }

  async getPages(manga_id, chapter) {
    let query = `/getPages`;
    query += `/${manga_id}/${chapter}`

    try {
      return await this.database.get(query).then(response => {
        return response.data;
      })
    } catch (error) {
        return console.log(error)
    }
  }

  async getAllPhotos(id_obra) {
    let query = `/getAllPhotos`;
    query += `/${id_obra}`

    try {
      return await this.database.get(query).then(response => {
        return response.data;
      })
    } catch (error) {
        return console.log(error)
    }
  }

  async setNewUserPhoto(user_id, photo_id) {
    let query = `/setNewPhoto`;
    query += `/${user_id}/${photo_id}`;

    try {
      return await this.database.put(query).then(response => {
        return response.data;
      })
    } catch (error) {
        return console.log(error)
    }
  }

  async setNewNickName(user_id, newNickname) {
    const query = `/setNewNickname/${user_id}/${newNickname}`;
  
    try {
      return await this.database.put(query).then(response => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async sendComment(user_id, comment, anime_id, episode) {
    const url = "https://animatrix-api.vercel.app/sendComments";
    var actualDate = new Date();
    var day = actualDate.getDate();
    var month = actualDate.getMonth() + 1;
    var year = actualDate.getFullYear();
    var formattedDate = `${year}-${month}-${day}`;
    const params = { user_id, comment, anime_id, episode, formattedDate };

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    try {
      return await axios.post(url, params).then(response => {});
    } catch (error) {
      return;
    }
  }

}

export default new DatabaseApi();