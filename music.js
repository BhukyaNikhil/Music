import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get('/api/songs');
      setSongs(response.data);
    };

    fetchSongs();
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div>
      <h1>Music Player</h1>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            {song.title} - {song.artist}
            <button onClick={() => playSong(song)}>Play</button>
          </li>
        ))}
      </ul>
      {currentSong && (
        <div>
          <h2>Now Playing: {currentSong.title}</h2>
          <audio controls autoPlay>
            <source src={/${currentSong.filePath}} type="audio/mpeg"/>
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;