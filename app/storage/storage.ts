import {MMKV} from 'react-native-mmkv';

export const mmkv = new MMKV();

export function loadString(key: string) {
  return mmkv.getString(key) ?? '';
}

export function saveString(key: string, value: string) {
  mmkv.set(key, value);
}

export function remove(key: string) {
  mmkv.delete(key);
}

export function clear() {
  mmkv.clearAll();
}
