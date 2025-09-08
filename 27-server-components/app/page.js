import RSCDemo from '@/components/RSCDemo';
import ClientDemo from '@/components/ClientDemo';
import DataFetchingDemo from '@/components/DataFetchingDemo';

export default function Home() {
  return (
    <main>
      <ClientDemo>
        <RSCDemo />
        <DataFetchingDemo />
      </ClientDemo>
    </main>
  );
}
