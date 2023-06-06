import Link from 'next/link';
import Head from 'next/head'

export default function Nav() {
  return (
    <header className="p-5 bg-primary">
      <Head>
        <title>HeartBeat | One Heart Beat, Bridging Nursing's Gap</title>
      </Head>
      <nav className="flex justify-between">
        <div>
          <Link href="/home" className="text-white text-lg font-bold">
            <img src="/logo-transparent-background.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/jobs" className="text-white text-lg">Jobs</Link>
          <Link href="/login" className="text-white text-lg">Login</Link>
          <Link href="/signup" className="text-white text-lg">Signup</Link>
        </div>
      </nav>
    </header>
  );
}
