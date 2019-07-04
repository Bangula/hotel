const initialState = {
  promotions: [],
  rooms: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROMOTION":
      return {
        ...state,
        promotions: [...state.promotions, action.payload]
      };
    case "ADD_ROOM":
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    default:
      return state;
  }
};
