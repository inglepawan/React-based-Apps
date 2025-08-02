import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextDef';

export const useAuth = () => {
  return useContext(AuthContext);
};