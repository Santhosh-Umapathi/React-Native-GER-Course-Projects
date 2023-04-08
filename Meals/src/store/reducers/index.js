import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (item) => item.id === action.payload
      );

      if (existingIndex >= 0) {
        const updateFavMeals = [...state.favoriteMeals];
        updateFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updateFavMeals };
      } else {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(
            state.meals.find((item) => item.id === action.payload)
          ),
        };
      }

    case SET_FILTERS:
      const appliedFilters = action.payload;
      const updatedFilteredMeals = state.meals.filter((item) => {
        if (appliedFilters.glutenFree && !item.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !item.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !item.isVegan) {
          return false;
        }
        if (appliedFilters.vegeterian && !item.isVegeterian) {
          return false;
        }
        return true;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};

export default mealsReducer;
