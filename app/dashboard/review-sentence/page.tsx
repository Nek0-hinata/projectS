import { getAllSentenceTag } from '@/app/lib/actions';
import { columns, IDataType } from '@/app/dashboard/review-sentence/config';
import STable from '@/app/ui/s-component/s-table';
import Header from '@/app/ui/dashboard/header';

export default async function Page() {
  const res = await getAllSentenceTag();
  const dataSource: IDataType[] = res.map((item) => {
    const {
      status,
      sentence: {
        content: sentenceContent,
        article: { title: articleTitle },
      },
      tag: { name: tagName, color: tagColor },
      sentenceId,
      tagId,
    } = item;
    return {
      key: sentenceId + '_' + tagId,
      status,
      sentenceContent,
      articleTitle,
      tagName,
      tagColor,
      tagId,
      sentenceId,
    };
  });
  return (
    <div>
      <Header title={'标注审核'} />
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </div>
  );
}
