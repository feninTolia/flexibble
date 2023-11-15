'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '../Shared/Button';

const AuthProviders = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Button
        title="Sign In"
        type="button"
        loading={isLoading}
        onClick={() => {
          setIsLoading(true);
          signIn();
        }}
      />
    </div>
  );
};

export default AuthProviders;
