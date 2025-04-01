export interface BoardRequest {
  name: string;
  description: string;
}
export interface BoardResponse extends BoardRequest {
  id: string;
  owner: string;
  ownerId: number;
  createdAt: string;
  commentCount: number;
}
