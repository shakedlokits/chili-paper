import { Poem, Title } from './components';
import { print } from '../lib';

void print({
  drawings: [
    new Title(),
    new Poem(),
  ],
  debug: true,
});