import {map} from 'rxjs/internal/operators';

export const logValue = map((value) => {
  console.log(value);
  return value;
});
