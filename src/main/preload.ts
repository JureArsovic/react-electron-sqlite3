// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Article } from './services/Database.service';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  insertArticle: (article: Article) => ipcRenderer.invoke('article:insert', article),
  deleteArticle: (id: number) => ipcRenderer.invoke('article:delete', id),
  getAllArticles: () => ipcRenderer.invoke('article:getAllArticles'),
  searchArticles: (searchquery: string) => ipcRenderer.invoke('article:searchArticles', searchquery),
  getArticleById: (id: number) => ipcRenderer.invoke('article:getArticleById', id),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
