export interface Friend {
  name: string;
  photo: string;
  instagram: string;
  whatsapp: string;
  quote: string;
}

export interface Testimonial {
  name: string;
  relation: string;
  quote: string;
  avatar: string;
}

export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  isMe?: boolean;
}

export interface UserStats {
  name: string;
  avatar: string;
  messagesSent: number;
  timeSpent: number;
  sectionsVisited: string[];
  musicPlayed: number;
  imagesCreated: number;
}
