'use client';
import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

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
          <button key={idx} onClick={() => signIn()}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  return <div>AuthProviders</div>;
};

export default AuthProviders;
