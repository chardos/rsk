import { VOLLEYBALL, SOCCER } from "../actions/sports";

export default function sports(state = {}, action) {
  switch (action.type) {
    case VOLLEYBALL:
      return state;

    case SOCCER:
      return state;

    default:
      return state;
  }
}
