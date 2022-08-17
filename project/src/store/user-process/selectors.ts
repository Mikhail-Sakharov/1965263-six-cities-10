import {State} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
