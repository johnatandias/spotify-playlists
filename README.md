# Spotify Playlist

[![CircleCI](https://circleci.com/gh/johnatandias/spotify-playlists/tree/master.svg?style=svg)](https://circleci.com/gh/johnatandias/spotify-playlists/tree/master)

[Live Preview](https://playlist-spotify.herokuapp.com)

A simple application to show a user's playlists on spotify.

## Built with

- [Create React App](https://create-react-app.dev/) - Set up a modern web app by running one command.
- [React router](https://reacttraining.com/react-router/) - Declarative routing for React.
- [TypeScript](https://www.typescriptlang.org) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Sass](https://sass-lang.com/) - CSS with superpowers.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.

[BEM](http://getbem.com) standard was used in CSS.

## Requirements to run with Container Docker

### Installation Docker

Follow the official [documentation steps](https://docs.docker.com/install/)

### Installation Compose

Follow the official [documentation steps](https://docs.docker.com/compose/install/)

### Run Docker without sudo (Optional)

```console
$ sudo usermod -aG docker $(whoami)
```

> _Note:_ Restart your computer to make changes

## Run container

### Execution container

```console
$ docker-compose up -d
```

### Run rebuild Container

If there is any change in the container, run the command with container stopped

```console
$ docker-compose up -d --build
```

### Enter in container console

```console
$ docker-compose exec app sh
```

### Stop the container

```console
$ docker-compose down
```
