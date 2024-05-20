import { bootstrap, startServer } from '../@hydra-js/core';

export default async () =>
  bootstrap(() => {
    startServer();
  });
