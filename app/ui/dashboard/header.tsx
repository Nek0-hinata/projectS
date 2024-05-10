import { lusitana } from '@/app/ui/fonts';

export default function Header({ title }: { title: string }) {
  return (
    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      {title}
    </h1>
  );
}
