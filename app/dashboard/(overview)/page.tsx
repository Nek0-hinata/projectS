import Header from '@/app/ui/dashboard/header';
import {
  getAllArticle,
  getAllSentenceTag,
  getArticleByStatus,
  getSentenceTagWithStatus,
  getUserByEmail,
} from '@/app/lib/actions';
import { ArticleStatus, Permission, TagStatus } from '@prisma/client';
import ProgressCard from '@/app/dashboard/(overview)/progress-card';
import { auth } from '@/auth';
import SDescription from '@/app/ui/s-component/s-description';
import { Tag } from 'antd';

export default async function Page() {
  const session = await auth();
  let description = {};
  if (session?.user?.email) {
    const users = await getUserByEmail(session.user.email);
    const { permission } = users;
    description = {
      username: users.username,
      email: users.email,
      permission: (
        <Tag color={permission === Permission.Admin ? 'geekblue' : 'green'}>
          {permission}
        </Tag>
      ),
      phoneNumber: users.phoneNumber,
    };
  }

  const articleAll = await getAllArticle();
  const finishedArticle = await getArticleByStatus(ArticleStatus.Finished);
  const articlePercent = finishedArticle.length / articleAll.length;

  const sentenceTagAll = await getAllSentenceTag();
  const pendingSentenceTag = await getSentenceTagWithStatus(TagStatus.Pending);
  const sentenceTagPercent =
    (sentenceTagAll.length - pendingSentenceTag.length) / sentenceTagAll.length;

  return (
    <main className={'h-full'}>
      <Header title={'仪表盘'} />
      <div className={'m-auto mb-10 mt-10 w-10/12'}>
        <SDescription items={description} />
      </div>
      <div className={'flex items-center justify-around'}>
        <ProgressCard
          title={'已标注的文章进度'}
          percent={articlePercent * 100}
        />
        <ProgressCard
          title={'已审核的标注'}
          percent={sentenceTagPercent * 100}
        />
      </div>
    </main>
  );
}
