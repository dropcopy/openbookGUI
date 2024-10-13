import React, {useContext, useEffect, useState} from 'react';
import {useLocalStorageState,} from './utils';
import BN from 'bn.js';


export function usePriorityFee() {
  const [priorityFee, setPriorityFee] = useLocalStorageState<number>('priorityFee', 0);
  return { priorityFee, setPriorityFee };
} 

