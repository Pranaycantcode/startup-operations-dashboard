export interface Activity {
  id: number;
  type: string;
  message: string;
  entity: string;
  entityId?: number | null;
  createdAt: string;
}