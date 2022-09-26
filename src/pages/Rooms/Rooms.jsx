import React, { useState } from 'react';

import { useRooms } from '../../hooks/useRooms';
import styles from './Rooms.module.css';

import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import RoomCard from '../../components/RoomCard/RoomCard';
import CreateRoomButton from '../../components/shared/CreateRoomButton/CreateRoomButton';

const Rooms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { rooms, error } = useRooms();

  const filteredRooms = search
    ? rooms.filter((r) => r.topic.toLowerCase().includes(search.toLowerCase()))
    : rooms;

  return (
    <main className="container">
      <div className={styles.roomHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.heading}>All voice rooms</h1>
          <div className={styles.searchBoxWrapper}>
            <img src="/images/search.svg" alt="Search icon" />
            <input
              type="text"
              className={styles.searchBox}
              placeholder="Search a room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <CreateRoomButton type="button" onClick={() => setIsOpen(true)} />
      </div>

      <section className={styles.roomsWrapper}>
        {filteredRooms.length > 0 &&
          !error &&
          filteredRooms.map((room, index) => (
            <RoomCard room={room} key={room.id} />
          ))}
      </section>
      {search && filteredRooms.length == 0 && (
        <section className={styles.emptyList}>
          <h1 className={styles.emptyListText}>Oops! Try Something Else.</h1>
          <p style={{ fontSize: '20px' }}>Zero Matches.</p>
        </section>
      )}
      {isOpen && <AddRoomModal onModalClose={() => setIsOpen(false)} />}
    </main>
  );
};

export default Rooms;
