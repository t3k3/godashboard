import Link from 'next/link';

export default function Admin() {
  return (
    <main>
      Admin
      <Link href={'/admin/logout'}>
        <button className='p-2 bg-red-400 rounded-lg text-white'>
          Çıkış Yap
        </button>
      </Link>
    </main>
  );
}
