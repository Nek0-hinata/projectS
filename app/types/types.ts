export type SideBarType = 'Dashboard' | 'Documents' | 'Tags' | 'ImportArticle';

export type SideBarUrl =
  | '/dashboard'
  | '/dashboard/documents'
  | '/dashboard/tags'
  | '/dashboard/import-article';

export type SideBarUrlWithSignOut = SideBarUrl | 'sign_out';

export type SideBarWithSignOutType = SideBarType | 'SignOut';

export const SideBarEnum: Record<
  SideBarWithSignOutType,
  SideBarUrlWithSignOut
> = {
  SignOut: 'sign_out',
  Dashboard: '/dashboard',
  Documents: '/dashboard/documents',
  Tags: '/dashboard/tags',
  ImportArticle: '/dashboard/import-article',
};
