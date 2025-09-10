import { Suspense } from 'react';
import fs from 'node:fs/promises';

import RSCDemo from '@/components/RSCDemo';
import ClientDemo from '@/components/ClientDemo';
import DataFetchingDemo from '@/components/DataFetchingDemo';
import ServerActionsDemo from '@/components/ServerActionsDemo';
import UsePromiseDemo from '@/components/UsePromiseDemo';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf8');
      const users = JSON.parse(data);
      resolve(users);
      // reject(new Error('Could not read database'));
    }, 2000)
  );

  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>

      <ClientDemo>
        <RSCDemo />
        <DataFetchingDemo />
      </ClientDemo>
      <ServerActionsDemo />
    </main>
  );
}
