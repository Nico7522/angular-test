export type ViewModel<T> =
  | { status: 'loading' }
  | { status: 'result'; result: T }
  | { status: 'error'; error: any };

export interface VmSignal<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
