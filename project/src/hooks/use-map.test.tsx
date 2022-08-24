import {renderHook, render} from '@testing-library/react';
import {createElement, ReactNode, useRef} from 'react';
import {Map} from 'leaflet';
import useMap from './use-map';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {offers} from '../mocks/offers';
import {Provider} from 'react-redux';

type ChildrenType = {
  children: ReactNode
};

const mockOfferCity = offers[0].city.name;
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    selectedCityOffers: offers.filter((offer) => offer.city.name === mockOfferCity)
  }
});

describe('Hook: useMap', () => {
  it('should be an instance of the "Map" leaflet class', () => {
    const wrapper = ({children}: ChildrenType) => <Provider store={store}>{children}</Provider>;

    const {result} = renderHook(() => {
      const mapRef = useRef<HTMLElement | null>(null);
      const fakeMapContainerElement = createElement('div', {ref: mapRef});
      render(fakeMapContainerElement);
      return useMap(mapRef);
    }, {wrapper});

    expect(result.current).toBeInstanceOf(Map);
  });
});
