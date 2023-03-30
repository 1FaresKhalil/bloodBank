import type { ReactNode } from 'react';

// import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="">
    {props.meta}

    <div className="">
      <main className="">{props.children}</main>
    </div>
  </div>
);

export { Main };
