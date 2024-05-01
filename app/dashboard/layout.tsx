import Sider from 'antd/lib/layout/Sider';
import SideBar from '@/app/dashboard/side-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'flex min-h-screen bg-white'}>
      <Sider>
        <SideBar />
      </Sider>
      <div className={'min-h-screen min-w-max bg-white'}>
        <div>{children}</div>
      </div>
    </div>
  );
}
