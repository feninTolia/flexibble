import React, { PropsWithChildren } from 'react';

const ErrorText = ({ children }: PropsWithChildren) => {
  return <p className=" py-8 text-center text-red-900">{children}</p>;
};

export default ErrorText;
