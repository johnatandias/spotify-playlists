import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/Loading/Loading';
import { SpotifyService } from '../../services/spotify';
import { Link } from '../../components/Link/Link';
import './Login.scss';

export const Login = ({ history }: RouteComponentProps) => {
  const token = history.location.hash.split('&')[0].replace('#access_token=', '');

  if (token) {
    SpotifyService.setAccessToken(token);
    SpotifyService.setUserInformation().then(() => {
      history.push('/playlists');
    });

    return (
      <div className="login-loading">
        <Loading width={100} height={100} />
      </div>
    )
  }

  return (
    <div className="login">
      <Logo height={50} width={50} />

      <section className="login__content">
        <div className="login__content__description">
          <span className="login__content__description__title">
            Músicas para todos.
          </span>

          <span className="login__content__description__subtitle">
            Milhões de músicas à sua escolha. E nem precisa de cartão de crédito.
          </span>

          <Link href={SpotifyService.getAuthURI()}>
            <Button label="Conectar com Spotify" className="button" />
          </Link>
        </div>

        <Logo height={500} width={500} opacity={0.3} />
      </section>
    </div>
  )
};
