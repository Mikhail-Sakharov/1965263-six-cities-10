import {useEffect} from 'react';
import {useAppDispatch} from '.';
import {postFavoriteAction} from '../store/api-actions';

function useFavorite(offerId: number, postFavoriteStatus: 0 | 1): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postFavoriteAction({
      offerId,
      postFavoriteStatus
    }));
  }, [dispatch, offerId, postFavoriteStatus]);
}

export default useFavorite;
