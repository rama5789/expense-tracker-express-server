let url =
  '/api/v1/expenses/:id/blabla/:id2/blabla/:operation/:id/blabla/:id3/blabla/:myId/';
console.log(url);

const reqQuery = {
  operation: 'findExpenseById',
  myId: '11',
  id: '22',
  id2: '33',
  id3: '44',
  id4: '55',
};
const queryKeys = Object.keys(reqQuery);

let x = '';
for (const key of queryKeys) {
  if (key !== 'operation') {
    const value = query[key];
    console.log(key, value);

    const regex = new RegExp(`/:${key}/`, 'g');
    x = url.replace(regex, `/${value}/`);
    console.log(x);

    url = x;
  }
}

console.log(url);
