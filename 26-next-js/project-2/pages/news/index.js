import Link from 'next/link';

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li><Link href="/news/next-js-pages">NextJS Pages Router</Link></li>
        <li><Link href="/news/next-js-app">NextJS App Router</Link></li>
      </ul>
    </>
  );
}