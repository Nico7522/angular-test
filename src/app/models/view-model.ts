import { ApiResponse } from './api-response';

export type ViewModel<T> =
  | { status: 'loading' }
  | { status: 'result'; result: T }
  | { status: 'error'; error: any };

export interface VmSignal<T> {
  data: ApiResponse<T> | null;
  loading: boolean;
  error: string | null;
}
