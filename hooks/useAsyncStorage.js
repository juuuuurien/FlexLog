import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (key, defaultValue) => {
  const [storageValue, updateStorageValue] = useState(defaultValue);
  const [updated, setUpdated] = useState(false);

  async function getStorageValue() {
    let value = defaultValue;
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
    } catch (e) {
      console.warn(e);
    } finally {
      updateStorageValue(value);
      setUpdated(true);
    }
  }

  async function updateStorage(newValue) {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setUpdated(false);
      getStorageValue();
    }
  }

  useEffect(() => {
    getStorageValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return [storageValue, updateStorage];
};
