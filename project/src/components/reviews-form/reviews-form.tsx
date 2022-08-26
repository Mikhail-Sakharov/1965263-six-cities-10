import React, {ChangeEvent, FormEvent, useState} from 'react';
import {CommentLength, INITIAL_RATING_VALUE, ratingValues} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postCommentAction} from '../../store/api-actions';

type ReviewsFormComponentProps = {
  offerId: number;
};

function ReviewsForm({offerId}: ReviewsFormComponentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(INITIAL_RATING_VALUE);
  const isSubmitButtonDisabled = comment.length < CommentLength.MIN || comment.length > CommentLength.MAX || rating === INITIAL_RATING_VALUE;

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postCommentAction({
      offerId,
      comment,
      rating
    }));
    setComment('');
    setRating(INITIAL_RATING_VALUE);
  };

  const handleRatingInputChange = (evt: ChangeEvent<HTMLInputElement>) => setRating(Number(evt.target.value));

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingValues.map((value) => (
            <React.Fragment key={value}>
              <input checked={rating === value} className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" onChange={handleRatingInputChange}/>
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleTextAreaChange}>
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
