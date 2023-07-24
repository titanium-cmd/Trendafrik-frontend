import { USER_INFO_KEY } from "src/constants";
import { BaseState } from "src/models/store";
import { User } from "src/models/user";

export const getUser = () => JSON.parse(localStorage.getItem(USER_INFO_KEY)!) as User;

export const asyncIsPending = (state: BaseState) => {
  state.status = 'pending';
}

export const asyncIsRejected = (state: BaseState, action: any) => {
  console.log('REJECTED:: ', action);
  state.status = 'rejected';
  state.message = action.payload?.message;
}

export const asyncIsFulfilled = (state: BaseState, action: any) => {
  console.log('FULFILLED:: ', action.payload?.message);
  state.status = 'fulfilled';
  state.stage = action.payload?.stage;
  state.message = action.payload?.message;
}