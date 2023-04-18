
import { Inter } from 'next/font/google'
import Product from '@/components/Product';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h3 className='font-bold text-4xl mb-20'>Products</h3>
      <Product />
    </main>
  );
}
