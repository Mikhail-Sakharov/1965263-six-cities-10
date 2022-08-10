import {FormEvent, useState} from 'react';
import {COMMENT_MAX_LENGTH, INITIAL_RATING_VALUE} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postCommentAction} from '../../store/api-actions';

type ReviewsFormComponentProps = {
  offerId: number;
};

function ReviewsForm({offerId}: ReviewsFormComponentProps): JSX.Element {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(INITIAL_RATING_VALUE);
  const isSubmitButtonDisabled = comment.length < COMMENT_MAX_LENGTH || rating === INITIAL_RATING_VALUE;
  const dispatch = useAppDispatch();

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt: FormEvent) => {
      evt.preventDefault();
      dispatch(postCommentAction({
        offerId,
        comment,
        rating
      }));
      setComment('');
      setRating(INITIAL_RATING_VALUE);
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input checked={false} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={(evt) => setRating(Number(evt.target.value))}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={false} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={(evt) => setRating(Number(evt.target.value))}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={false} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={(evt) => setRating(Number(evt.target.value))}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={false} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={(evt) => setRating(Number(evt.target.value))}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={false} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={(evt) => setRating(Number(evt.target.value))}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={(evt) => {
        setComment(evt.target.value);
      }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
