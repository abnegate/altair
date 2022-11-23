import { createSelector, Store } from '@ngrx/store';
import { PerWindowState } from '@jakebarnby/altair-graphql-core/build/types/state/per-window.interfaces';
import { getInitialHeadersState } from './headers.reducer';

export const getHeaders = (state: PerWindowState) =>
  state ? state.headers : { ...getInitialHeadersState() };
