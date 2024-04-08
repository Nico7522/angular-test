import { Subject } from 'rxjs';
import { Filter } from './product.service';

export const filter = <T, K>(
  subject: Subject<T[]>,
  filter: K,
  dataArray: T[]
) => {
  let filteredList = dataArray;

  Object.keys(filter as {}).forEach((key) => {
    if (filter[key as keyof K] !== '') {
      filteredList = filteredList.filter((item) => {
        if (
          typeof item[key as keyof T] === 'string' &&
          typeof filter[key as keyof K] === 'string'
        ) {
          return (item[key as keyof T] as string)
            .toLowerCase()
            .includes((filter[key as keyof K] as string).toLowerCase());
        }
        return false;
      });
    }
  });

  subject.next(filteredList);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().replaceAll('-', '/').substring(0, 10);
};
