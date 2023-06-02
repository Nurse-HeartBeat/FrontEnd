import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect} from 'react';
import { Router, useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const redirectRoute = '/home';
    router.push(redirectRoute);
  })
  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
          <div className="mt-4">
            <div className="inline-block animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12">...</div>
          </div>
        </div>
      </div>
    </main>
  )
}
