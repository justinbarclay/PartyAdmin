const initialState = {
  state: true
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        state: action.state
      } 
    default:
      return state
  }
}

export default auth