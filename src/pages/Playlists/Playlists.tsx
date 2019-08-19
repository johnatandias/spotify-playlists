import React, { useState, useEffect, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { Logo } from '../../components/Logo/Logo';
import { Profile } from '../../components/Profile/Profile';
import { Playlist } from '../../components/Playlist/Playlist';
import { SpotifyService } from '../../services/spotify';
import './Playlists.scss';

export interface Playlist {
  id: string,
  name: string,
  amount: number,
  image: string
}

export const Playlists = ({ history }: RouteComponentProps) => {
  useEffect(() => {
    getUserPlaylist()
  }, []);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const getUserPlaylist = async () => {
    const playlists = await SpotifyService.getAllPlaylists();
    setPlaylists(playlists);
  }

  const goToPlaylistPage = ({ id, name, amount, image }: Playlist) => {
    history.push({
      pathname: '/playlist',
      state: { id, name, amount, image }
    });
  }

  return (
    <div className="playlists">
      <Logo height={50} width={50} className="playlists__logo" />

      <section className="playlists__content">
        <Profile {...SpotifyService.getUserInformation()} />

        <div className="playlists__content__items">
          {
            playlists.map(playlist => (
              <Fragment key={playlist.id}>
                <Playlist {...playlist} onClick={goToPlaylistPage} />
              </Fragment>
            ))
          }
        </div>
      </section>
    </div>
  )
}