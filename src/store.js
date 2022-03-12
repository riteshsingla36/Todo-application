import { createStore } from "redux";
import { reducer } from "./Redux/reducer";

export const store = createStore(reducer)