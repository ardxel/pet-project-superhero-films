import { UserCollection, UserReduxState } from 'models/User';

const getListOfMoviesIdFromUserState: (
  userState: UserReduxState
) => number[] = (userState) => {
  return Array.from(
    new Set(
      [userState.watchlist, userState.ratings, userState.favorites]
        .map((collection) => {
          return collection.map((value) => {
            return typeof value === 'object' ? value.id : value;
          });
        })
        .flat(1)
    )
  );
};

export default getListOfMoviesIdFromUserState;
