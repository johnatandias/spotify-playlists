import React, { Fragment } from 'react';
import './PlaylistItems.scss';

export interface PlaylistItem {
  name: string,
  artist: string,
  time: string
}

export const PlaylistItems = ({ items, className = '' }: { items: PlaylistItem[], className?: string }) => (
  <div className={`playlistItems ${className}`}>
    {items.map(({ name, artist, time }: PlaylistItem, index: number) => (
      <Fragment key={index}>
        <div className="playlistItems__nameAndTime">
          <span className="playlistItems__nameAndTime__name">{name}</span>
          <span className="playlistItems__nameAndTime__time">{time}</span>
        </div>
        <span className="playlistItems__artist">{artist}</span>
      </Fragment>
    ))}
  </div>
);
