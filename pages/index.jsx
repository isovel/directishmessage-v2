import React from 'react';
import DXMHead from '../components/DXMHead';

import styles from '../styles/Landing.module.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.onload = () => {
      if (document.cookie.split(';').some((item) => item.trim().startsWith('name='))) {
        window.location.replace('/chat');
      }

      document.getElementById('login').href = `https://discord.com/api/oauth2/authorize?client_id=837869684706639902&redirect_uri=${encodeURIComponent(window.location.protocol+'//'+window.location.hostname)}&response_type=code&scope=identify`;

      const generateRandomString = () => {
        let randomString = '';
        const randomNumber = Math.floor(Math.random() * 10);
        for (let i = 0; i < 20 + randomNumber; i++) {
          randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
        }
        return randomString;
      }

      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType, state] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('state')];

      if (!accessToken) {
        const randomString = generateRandomString();
        localStorage.setItem('oauth-state', randomString);

        document.getElementById('login').href += `&state=${encodeURIComponent(btoa(randomString))}`;
      }

      if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
        console.log('You may have been click-jacked!');
      }

      if (window.location.search.includes('code')) {
        try {
          const oauthResult = async () => await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: clientID,
              client_secret: clientSecret,
              code,
              grant_type: 'authorization_code',
              redirect_uri: `https://${request.hostname}`,
              scope: 'identify',
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
          const oauthData = async () => await oauthResult.json();
          const userResult = async () => await (await fetch('https://discord.com/api/users/@me', {
            headers: {
              authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            }
          })).json();
          userResult().then(a => {
            const isAdmin = _ => (a.id == 255515821541949440 || document.cookie.split(';').some((item) => item.trim().startsWith('flags=1')));
            document.cookie = `name=${a.username}`;
            document.cookie = `id=${a.id}`;
            document.cookie = `flags=${(isAdmin()?'1':'0')}`;
            window.location.href = '/chat';
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <DXMHead title={'landing'} />
        <div className={[styles.mainContainer, (process.env['DXM_HOSTNAME'] !== 'dm.isota.ch') && styles.development].join(' ')}>
          <div>
            <div>
              <a id={'login'} href={'#'}>
                <span>Identify Yourself</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footerWrapper" style={{display: 'none'}}>
          <a href="/chat">
            <span>or click here to chat anonymously</span>
          </a>
        </div>
      </div>
    )
  }
}
