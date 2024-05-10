import AnnotateArticle from '@/app/dashboard/documents/[id]/annotate/annotate-article';
import { getAllTags, getArticleById } from '@/app/lib/actions';

interface IPage {
  params: {
    id: string;
  };
}

export default async function Page(props: IPage) {
  const { params } = props;
  const id = Number(params.id);
  const article = await getArticleById(id);
  const tagList = await getAllTags();
  return (
    <div>
      {article ? (
        <AnnotateArticle
          articleId={article.id}
          title={article.title}
          content={article.content}
          tagList={tagList}
        />
      ) : (
        <div>获取不到该文章</div>
      )}
    </div>
  );
}
