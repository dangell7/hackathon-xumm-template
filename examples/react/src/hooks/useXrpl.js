import { useContext } from 'react';
import XrplContext from '../contexts/XrplContext';

export default function useXrpl() {
  const context = useContext(XrplContext);
  return context;
}