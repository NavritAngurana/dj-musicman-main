export type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  artwork?: string;
  src: string;
  duration?: number;
  bpm?: number;
};

export type Folder = {
  name: string;
  tracks: Track[];
};

export const audioLibrary: Folder[] = [
  {
    name: "LocalTest",
    tracks: [
      {
        id: 1,
        title: "Dirtmouth",
        artist: "Christopher Larkin",
        src: "/audio/Dirtmouth.mp3",
        artwork: "/Hkcv.jpg",
        album: "Hollow Knight (original Soundtrack)",
        duration: 115,
        bpm: 85,
      },
      {
        id: 2,
        title: "City Of Tears",
        artist: "Christopher Larkin",
        src: "/audio/CityofTears.mp3",
        artwork: "/Hkcv.jpg",
        album: "Hollow Knight (original Soundtrack)",
        duration: 178,
        bpm: 100,
      },
      {
        id: 3,
        title: "Mantis Lords",
        artist: "Christopher Larkin",
        src: "/audio/MantisLords.mp3",
        artwork: "/Hkcv.jpg",
        album: "Hollow Knight (original Soundtrack)",
        duration: 106,
        bpm: 144,
      },
      // add more tracks
    ],
  },
  {
    name: "Youtube",
    tracks: [
      {
        id: 4,
        title: "Seven",
        artist: "Men I Trust",
        album: "Oncle Jazz",
        src: "https://www.youtube.com/watch?v=ulPq2FXiONE",
        duration: 226,
        bpm: 97,
      },
      {
        id: 5,
        title: "Tell me",
        album: "star",
        artist: "2Hollis",
        src: "https://www.youtube.com/watch?v=ulPq2FXiONE",
        duration: 237,
        bpm: 146,
      },
      {
        id: 6,
        title: "Sweden",
        artist: "C418",
        album: "minecraft volume alpha",
        src: "https://www.youtube.com/watch?v=aBkTkxKDduc",
        duration: 216,
        bpm: 60,
      },
    ],
  },
];
