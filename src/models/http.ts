export interface HttpError<T = any> {
  status: number;
  data?: T;
}
