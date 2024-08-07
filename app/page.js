'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter();



  return (
    <div className={styles.pageWrapper}>
      <button className='stylizedButton' onClick={() => router.push('/single-player')}>Single Player</button>
    </div>
  )
}

