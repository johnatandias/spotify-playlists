import axios from 'axios';
import { User, Playlists, Playlist } from './spotifyTypes';
import { convertMillisecondsToMinutesAndSeconds } from '../utils/time';
import { PlaylistItem } from '../components/PlaylistItems/PlaylistItems';

class SpotifyProvider {
  private clientId = process.env.REACT_APP_CLIENT_ID;
  readonly BASE_URL = 'https://api.spotify.com/v1';
  private accessToken = '';
  private user: User;

  public hasAccessToken(): boolean {
    return Boolean(this.accessToken);
  }

  public getAuthURI(): string {
    const { location } = window;
    const responseWith = 'response_type=token';
    const clientId = `client_id=${this.clientId}`;
    const scopes = 'scope=' + encodeURIComponent('user-read-private user-read-email playlist-read-collaborative');
    const redirectTo = `redirect_uri=${encodeURIComponent(
      location.protocol + '//' + location.host + (location.port ? '/' : '')
    )}`;
    const showDialog = 'show_dialog=true';
    return `https://accounts.spotify.com/authorize?${responseWith}&${clientId}&${scopes}&${redirectTo}&${showDialog}`;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public setUserInformation(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const user = await axios({
        method: 'get',
        url: `${this.BASE_URL}/me`,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });

      if (!user) reject(user);
      this.user = user.data;
      resolve(this.user);
    })
  }

  public getUserInformation() {
    return {
      avatar: this.user.images[0].url,
      name: this.user.display_name,
      username: this.user.id,
      followers: this.user.followers.total
    }
  }

  public async getAllPlaylists() {
    const playlists = await axios({
      method: 'get',
      url: `${this.BASE_URL}/users/${this.user.id}/playlists`,
      headers: { Authorization: `Bearer ${this.accessToken}` }
    });

    if (!playlists) return [];

    const data: Playlists = playlists.data;
    const response: { id: string, name: string, amount: number, image: string }[] = [];

    data.items.forEach(playlist => {
      response.push({
        id: playlist.id,
        name: playlist.name,
        amount: playlist.tracks.total,
        image: playlist.images[0].url
      });
    });

    return response;
  }

  public async getPlaylistInformation(id: string) {
    const data = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
      headers: { Authorization: `Bearer ${this.accessToken}` }
    });

    if (!data) return [];

    const playlist: Playlist = data.data;
    const response: PlaylistItem[] = [];

    playlist.items.forEach(item => {
      response.push({
        name: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(', '),
        time: convertMillisecondsToMinutesAndSeconds(item.track.duration_ms)
      });
    })

    return response;
  }
}

export const SpotifyService = new SpotifyProvider();
