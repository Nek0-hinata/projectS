'use client';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';
import { useRef, useState } from 'react';
import { useTextSelection } from 'ahooks';

export default function Page() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const a = useTextSelection(ref.current);
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount && selection?.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setStart(range.startOffset);
      setEnd(range.endOffset);
      console.log(range);
    }
  };
  return (
    <>
      <div onMouseUp={handleMouseUp} ref={ref}>
        aabcsdashfjldsaewiorqe
      </div>
      <Button onClick={() => signOut()}>退出登录</Button>
      <div>
        {a.text} {a.left} {a.right} {start} {end}
      </div>
    </>
  );
}
