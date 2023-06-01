import Link from 'next/link';

export default function Nav() {
  return (
    <header className="p-5 bg-background">
      <nav className="flex justify-between">
        <div>
          <Link href="/home" className="text-white text-lg font-bold">
            {/* Placeholder for Logo */}
            {/* <img src="/path/to/logo.png" alt="Logo" className="h-10 w-auto" /> */}
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
