import { createSelector, Store } from '@ngrx/store';
import { PerWindowState } from '@jakebarnby/altair-graphql-core/build/types/state/per-window.interfaces';
import { getInitialState } from './post-request.reducer';

export const getPostRequest = (state: PerWindowState) =>
  state ? state.postRequest : { ...getInitialState() };
