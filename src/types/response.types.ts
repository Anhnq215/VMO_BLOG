export interface IResponse<T> {
    ok?: boolean,
    data?: T | null;
    errors?: {
      code: string;
      message: string;
      extends?: { field: string; message: string }[];
    };
}