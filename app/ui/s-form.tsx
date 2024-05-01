import { Button, Form } from 'antd';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import type { FormProps } from 'antd/lib/form/Form';
import { ComponentType } from 'react';

export type FormItemType = FormItemProps & {
  name: string;
  component: ComponentType<any>;
  componentProps?: any;
};

interface IProps<T> {
  formItems: FormItemType[];
  onFinish?: FormProps<T>['onFinish'];
  className?: string;
}

export default function SForm<T>({
  formItems,
  className,
  onFinish,
}: IProps<T>) {
  return (
    <Form className={className} layout={'vertical'} onFinish={onFinish}>
      {formItems.map((item) => {
        const { name, component: Component } = item;
        return (
          <FormItem key={name} {...item}>
            {<Component {...item.componentProps} />}
          </FormItem>
        );
      })}
      <FormItem>
        <Button type={'primary'} htmlType={'submit'}>
          提交
        </Button>
      </FormItem>
    </Form>
  );
}
