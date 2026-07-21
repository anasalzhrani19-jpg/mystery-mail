export type DefaultCategory = 
  | 'Speaking' 
  | 'Communication' 
  | 'Teamwork' 
  | 'Creativity' 
  | 'Critical thinking' 
  | 'Quick thinking' 
  | 'Icebreakers' 
  | 'Acting' 
  | 'Roleplay' 
  | 'Debate' 
  | 'Humor';

export type ChallengeCategory = string;

export interface Challenge {
  id: string;
  text: string;
  category: string;
  enabled: boolean;
}

export type GameState = 'IDLE' | 'TRIGGERED' | 'SHOOTING' | 'WAITING' | 'REVEALING' | 'READING';

