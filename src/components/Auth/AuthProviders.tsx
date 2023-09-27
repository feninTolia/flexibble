'use client';
import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Button from '../Shared/Button';

interface IProvider {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signInUrlParams: Record<string, string> | undefined;
}
type IProviders = Record<string, IProvider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<IProviders | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();

      setProviders(res as IProviders | null);
    })();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, idx) => (
          <Button
            title="Sign In"
            type="button"
            key={idx}
            onClick={() => signIn()}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default AuthProviders;
