export interface SymptomData {
  intensity: number; // 1-10
  mood: string;
  sleepQuality: string;
  hotFlashes: string; // Novo
  energyLevel: string; // Novo
  notes: string;
}

export interface AIAdviceResponse {
  advice: string;
  actionableSteps: string[];
}

export enum ChecklistStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  status: ChecklistStatus;
}