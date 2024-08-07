'use client';

import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


export default function Lobby() {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [matchLink, setMatchLink] = useState('');
  const router = useRouter();


  useEffect(() => {
    // Retrieve username from localStorage if it exists
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setSavedUsername(DOMPurify.sanitize(storedUsername));
    }

  }, []);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const safeUsername = DOMPurify.sanitize(username);
    localStorage.setItem('username', safeUsername);
    setSavedUsername(safeUsername);
  }

  const resetUsername = () => {
    localStorage.removeItem('username');
    setSavedUsername('');
  }

  return (
    <div className={styles.lobbyContainer}>
      <div className='infoCard'>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} onClick={() => router.push('/')} />
        <h1>LOBBY</h1>

        { savedUsername ?
          <div className={styles.usernameWrapper}>
            <p>Playing As:</p>
            <p className={styles.username}>{savedUsername}</p>
            <button onClick={resetUsername} className='redButton'>CHANGE USERNAME</button>
          </div>
          :
          <form onSubmit={handleSubmit} className={styles.usernameInputWrapper}>
            <label className={styles.usernameLabel} htmlFor='usernameInput'>Choose A Username:</label>
            <input type="text" id='usernameInput' value={username} onChange={handleChange} className={styles.usernameInput}/>
            <button type="submit" className='redButton'>SAVE</button>
          </form>}


        <p>Here you can generate a match link and send it to another player.</p>
        <p>When they click the match link, a countdown will begin to start the match.</p>
        <p>{`At the end of the countdown, you'll both be given the same combo, and you can race to see who opens their lock first. `}</p>


      </div>



    </div>
  )
}