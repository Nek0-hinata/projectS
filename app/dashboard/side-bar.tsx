'use client';
import { Menu, MenuProps } from 'antd';
import { Key, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type MenuItem = Required<MenuProps>['items'][number];

export enum SideBarEnum {
  SignOut = 'sign_out',
  Dashboard = '/dashboard',
  Documents = '/dashboard/documents',
  Tags = '/dashboard/tags',
  ImportArticle = '/dashboard/import-article',
}

function getItemMiddleware(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItemMiddleware('数据统计', SideBarEnum.Dashboard, null),
  getItemMiddleware('数据集', SideBarEnum.Documents, null),
  getItemMiddleware('标签', SideBarEnum.Tags, null),
  getItemMiddleware('文章导入', SideBarEnum.ImportArticle, null),
  getItemMiddleware('登出', SideBarEnum.SignOut, null),
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  async function sideBarHandler(key: string) {
    if (key === SideBarEnum.SignOut) {
      await signOut();
    } else {
      router.push(key);
    }
  }

  return (
    <Menu
      items={items}
      onClick={(e) => sideBarHandler(e.key)}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={['sub1']}
      mode={'inline'}
    />
  );
}
