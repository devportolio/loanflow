import { atom } from 'recoil';

export const authState = atom({
   key: 'authState',
   default: {
       user: null,
       token: window.localStorage.getItem('ACCESS_TOKEN')
   }
})