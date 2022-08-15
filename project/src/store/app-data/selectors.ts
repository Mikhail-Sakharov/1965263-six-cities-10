import {NameSpace} from '../../const';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {State} from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getSelectedOffer = (state: State): Offer | null => state[NameSpace.Data].selectedOffer;
export const getNearestOffers = (state: State): Offer[] => state[NameSpace.Data].nearestOffers;
export const getComments = (state: State): Review[] => state[NameSpace.Data].comments;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getActiveSortOption = (state: State): string => state[NameSpace.Data].activeSortOption;
export const getErrorMessage = (state: State): string | null => state[NameSpace.Data].error;
export const getCurrentCity = (state: State): string => state[NameSpace.Data].city;
export const getSelectedCityOffers = (state: State): Offer[] => state[NameSpace.Data].selectedCityOffers;
