/**
 * Common type/interface shapes between layers.
 * Enterprise type of app, usually has a need to transform types  - e.g. login shape in app can be different than login shape for network api request
 * In this case, there is no such request in the assignment for doing so, therefore I took a liberty to unify these in common folder
 */

export interface LoginInput {
  nickname: string;
  password: string;
}

export type User = {
  id: number;
  nickname: string;
};
