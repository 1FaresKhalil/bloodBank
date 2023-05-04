import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

type LoadingProps = {
  text: string;
};
export default function CircularIndeterminate(props: LoadingProps) {
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <CircularProgress size={60} />
      <h2 className="font-font-size-24">{props.text}</h2>
    </div>
  );
}
