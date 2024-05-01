import { Form } from 'antd';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import { ReactNode } from 'react';

interface IProps {
  formItems: (FormItemProps & { component: ReactNode; componentProps: any })[];
}

export default function SForm({ formItems }: IProps) {
  return (
    <Form>
      {formItems.map((items) => {
        const { name, label, rules, initialValue } = items;
        return (
          <FormItem
            label={label}
            name={name}
            key={name}
            rules={rules}
            initialValue={initialValue}
          >
            {items.component}
          </FormItem>
        );
      })}
    </Form>
  );
}
