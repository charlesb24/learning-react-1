import { useRouter } from 'next/router';

export default function PostPage() {
  const router = useRouter();
  const postId = router.query.postId;

  return (
    <>
      <h1>News - Post Page</h1>
      <span>{ postId }</span>
    </>
  );
}