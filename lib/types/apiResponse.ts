export interface TransferResponse {
  input_image: string;
  message: string;
  status_code: number;
  stylized_image: string;
}

export type BackendResponse = Record<string, unknown>;