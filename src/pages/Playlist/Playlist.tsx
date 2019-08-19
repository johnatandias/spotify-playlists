import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Logo } from '../../components/Logo/Logo';
import { Playlist as PlaylistInformation } from '../../components/Playlist/Playlist';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Profile } from '../../components/Profile/Profile';
import { Back } from '../../components/Back/Back';
import { PlaylistItems, PlaylistItem } from '../../components/PlaylistItems/PlaylistItems';
import { SpotifyService } from '../../services/spotify';
import './Playlist.scss';

export const Playlist = ({ history }: RouteComponentProps) => {
  useEffect(() => {
    getPlaylistData();
    // eslint-disable-next-line
  }, []);

  const getPlaylistData = async () => {
    const musics = await SpotifyService.getPlaylistInformation(history.location.state.id);
    setMusics(musics);
  }

  const [musics, setMusics] = useState<PlaylistItem[]>([]);
  const [filtered, setFiltered] = useState<PlaylistItem[]>([]);

  const onSearch = (value: string) => {
    if (!value.length) return setFiltered([]);

    const items = musics.filter(({ name, artist }) => (
      name.toLowerCase().includes(value.toLowerCase()) ||
      artist.toLowerCase().includes(value.toLowerCase())
    ));

    setFiltered(items);
  }

  return (
    <div className="playlist">
      <div className="playlist__info">
        <Logo height={50} width={50} className="playlist__info__logo" />

        <PlaylistInformation
          name={history.location.state.name}
          image={history.location.state.image}
          amount={history.location.state.amount}
          className="playlist__info__playlist"
        />
      </div>

      <section className="playlist__content">
        <Back
          height={35}
          width={35}
          className="playlist__content__backNavigation"
          onClick={() => history.goBack()}
        />

        <SearchBar onSearch={onSearch} placeholder="Pesquisar..." />

        <PlaylistItems
          items={filtered.length ? filtered : musics}
          className="playlist__content__tracks"
        />
      </section>

      <Profile
        {...SpotifyService.getUserInformation()}
        className="playlist__profile"
        minimal
      />
    </div>
  );
};
