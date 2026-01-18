export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration?: number;
};

export type Folder = {
  name: string;
  tracks: Track[];
};

export const audioLibrary: Folder[] = [
  {
    name: "Exercise",
    tracks: [
      {
        id: "4raws",
        title: "4 Raws",
        artist: "EsDeeKid",
        src: "/audio/4Raws.mp3",
      },
      {
        id: "Century",
        title: "Century",
        artist: "EsDeeKid",
        src: "/audio/Century.mp3",
      },
      {
        id: "phantom",
        title: "Phantom",
        artist: "EsDeeKid",
        src: "/audio/Phantom.mp3",
      },
      // add more tracks
    ],
  },
  {
    name: "Chill",
    tracks: [
      {
        id: "chill1",
        title: "Chill Track",
        artist: "Artist",
        src: "/audio/chill1.mp3",
      },
    ],
  },
];
