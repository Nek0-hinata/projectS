import { CreateTagForm } from '@/app/dashboard/tags/create/client-component';
import { getTagById } from '@/app/lib/actions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  let initialValue;
  let error = false;
  if (searchParams?.id) {
    const id = Number(searchParams.id);
    const tag = await getTagById(id);
    if (!tag) {
      error = true;
    } else {
      initialValue = {
        name: tag.name,
        color: tag.color,
      };
    }
  }
  return (
    <div>
      <h1>
        {searchParams?.id ? `正在编辑tagId=${searchParams.id}` : '新增标签'}
      </h1>
      <div className={'m-auto mt-10 w-1/2'}>
        {error ? (
          <div className={'text-red-600'}>
            tag不存在，请检查该tag是否已被删除
          </div>
        ) : (
          <CreateTagForm initialValue={initialValue} />
        )}
      </div>
    </div>
  );
}
