import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export const useAccessToken = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const token = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });
        await setAccessToken(token);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return [accessToken, isLoading];
};
