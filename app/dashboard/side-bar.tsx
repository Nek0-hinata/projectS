'use client';
import { Menu, MenuProps } from 'antd';
import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SideBarEnum, SideBarUrlWithSignOut } from '@/app/types/types';
import { Permission } from '@prisma/client';
import { PermissionMap } from '@/auth.config';
import {
  DatabaseOutlined,
  FileDoneOutlined,
  ImportOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TagsOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

interface IProps {
  permission: Permission | undefined;
}

function getItemMiddleware(
  permission: Permission,
  label: ReactNode,
  key: SideBarUrlWithSignOut,
  icon?: ReactNode,
  children?: MenuItem[],
): MenuItem | undefined {
  if (key === 'sign_out') {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  } else if (PermissionMap[key].includes(permission)) {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  return undefined;
}

export const getItems = (permission: Permission): MenuItem[] => {
  const getItemMiddlewareWithPermission = getItemMiddleware.bind(
    null,
    permission,
  );
  const itemList = [
    getItemMiddlewareWithPermission(
      '数据统计',
      SideBarEnum.Dashboard,
      <PieChartOutlined />,
    ),
    getItemMiddlewareWithPermission(
      '数据集',
      SideBarEnum.Documents,
      <DatabaseOutlined />,
    ),
    getItemMiddlewareWithPermission('标签', SideBarEnum.Tags, <TagsOutlined />),
    getItemMiddlewareWithPermission(
      '文章导入',
      SideBarEnum.ImportArticle,
      <ImportOutlined />,
    ),
    getItemMiddlewareWithPermission(
      '标注审核',
      SideBarEnum.ReviewSentence,
      <FileDoneOutlined />,
    ),
    getItemMiddlewareWithPermission(
      '登出',
      SideBarEnum.SignOut,
      <LogoutOutlined />,
    ),
  ];

  return itemList.filter(Boolean) as MenuItem[];
};

export default function SideBar(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { permission } = props;

  async function sideBarHandler(key: string) {
    if (key === SideBarEnum.SignOut) {
      await signOut();
    } else {
      router.push(key);
    }
  }

  if (permission) {
    return (
      <Menu
        items={getItems(permission)}
        onClick={(e) => sideBarHandler(e.key)}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['sub1']}
        mode={'inline'}
      />
    );
  }
}
