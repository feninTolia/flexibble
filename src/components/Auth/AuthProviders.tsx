'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import Button from '../Shared/Button';

const AuthProviders = () => {
  return (
    <div>
      <Button title="Sign In" type="button" onClick={() => signIn()} />
    </div>
  );
};

export default AuthProviders;
