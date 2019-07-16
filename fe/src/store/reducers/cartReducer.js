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
    case "DELETE_ROOM":
      let roomId = action.payload;
      let newArr = state.rooms.filter(item => {
        return item.room_id !== roomId;
      });
      return {
        ...state,
        rooms: newArr
      };
    case "DELETE_PROMOTION":
      let promotionId = action.payload;
      let newArr1 = state.promotions.filter(item => {
        return item.promotion_id !== promotionId;
      });
      return {
        ...state,
        promotions: newArr1
      };
    case "RESERVATION_COMPLETED":
      return {
        ...state,
        promotions: [],
        rooms: []
      };
    default:
      return state;
  }
};
