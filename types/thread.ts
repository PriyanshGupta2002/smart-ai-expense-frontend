export interface Thread {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ThreadsResponse {
  threads: Thread[];
}

export interface UpdateThreadPayload {
  title: string;
}
