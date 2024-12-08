import { storage } from "./vault"
import { AuthResult } from "../types/auth";

let authResultCache: AuthResult | null = null;
let listeners: any[] = [];

const subscribe = (listener: any) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const setAuthResult = (authResult: AuthResult | null) => {
  authResultCache = authResult;
  storage.then((storageObj)=>{
    if (authResultCache){
      storageObj.set('authResult', authResult).then(()=>{
        emitChange();
      }).catch((e)=>{
        // Handle error
      })
    }
    storageObj.remove('authResult').then(()=>{
      emitChange();
    }).catch((e)=>{
      // Handle error
    })
  });
};

const getSnapshot = (): AuthResult | null => {
  if (authResultCache) {
    return authResultCache;
  }
  storage.then((storageObj)=>{
    storageObj.get('authResult').then((res)=>{
      return authResultCache
    }).catch((e)=>{
      console.log(e)
      return null;
    })
  });
  return null;
};

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

const initialize = async (): Promise<void> => {
  const storageObj = await storage;
  authResultCache = await storageObj.get('authResult')
};

export { initialize, subscribe, getSnapshot, setAuthResult };
