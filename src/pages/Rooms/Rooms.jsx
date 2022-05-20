import React, { useState } from 'react';
import styles from './Rooms.module.css';
import RoomCard from '../../components/RoomCard/RoomCard';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import CreateRoomButton from '../../components/shared/CreateRoomButton/CreateRoomButton';

const rooms = [
  {
    id: 1,
    topic: 'Some beasutiful topic that nobody cares',
    speakers: [
      { id: 1, name: 'Nilotpal Deka', avatar: '/images/monkey-avatar.svg' },
      { id: 2, name: 'Mojahidul Islam', avatar: '/images/monkey-avatar.svg' },
    ],
    totalPeople: 45,
  },
  {
    id: 2,
    topic: 'Some beasutiful topic that nobody cares',
    speakers: [
      { id: 3, name: 'Nilotpal Deka', avatar: '/images/monkey-avatar.svg' },
      { id: 4, name: 'Mojahidul Islam', avatar: '/images/monkey-avatar.svg' },
    ],
    totalPeople: 45,
  },
  {
    id: 3,
    topic: 'Some beasutiful topic that nobody cares',
    speakers: [
      { id: 5, name: 'Nilotpal Deka', avatar: '/images/monkey-avatar.svg' },
      { id: 6, name: 'Mojahidul Islam', avatar: '/images/monkey-avatar.svg' },
    ],
    totalPeople: 45,
  },
  {
    id: 4,
    topic: 'Some beasutiful topic that nobody cares',
    speakers: [
      { id: 7, name: 'Nilotpal Deka', avatar: '/images/monkey-avatar.svg' },
      { id: 8, name: 'Mojahidul Islam', avatar: '/images/monkey-avatar.svg' },
    ],
    totalPeople: 45,
  },
];

const Rooms = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              placeholder="Search a room"
            />
          </div>
        </div>
        <CreateRoomButton type="button" onClick={() => setIsOpen(true)} />
      </div>

      <section className={styles.roomsWrapper}>
        {rooms.map((room, index) => (
          <>
            <RoomCard room={room} key={index} />
            <RoomCard room={room} key={index * room.id} />
          </>
        ))}
      </section>
      {isOpen && <AddRoomModal onModalClose={() => setIsOpen(false)} />}
    </main>
  );
};

export default Rooms;
