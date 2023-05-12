export interface IAuthError extends Error {
  status: number;
  errors: any[];
}