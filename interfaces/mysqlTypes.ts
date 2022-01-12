
declare module 'express-session' {
  interface SessionData {
    user_id: number | undefined;
  }
};


export type UserObj = {
  id: number,
  login: string,
  pass: string
};

export type VALUES = Array<string | boolean | number | undefined>;

export type Task = {
  id: number,
  text: string,
  checked: boolean
};




