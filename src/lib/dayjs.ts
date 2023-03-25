import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale('pt-br');
dayjs.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    m: '%d min',
    mm: '%d min',
    h: '%d h',
    hh: '%d h',
    M: '%d m',
    MM: '%d m',
  },
});
