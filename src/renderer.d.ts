// src/renderer.d.ts

import { ElectronHandler } from './main/preload';
// Augment the window interface
declare global {
  interface Window {
    electron: ElectronHandler;
  }
}
