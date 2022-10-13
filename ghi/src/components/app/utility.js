export function preventDefault(callback, selector) {
  selector = selector || ((x) => x);
  return (event) => {
    event.preventDefault();
    callback(selector(event));
  };
}

export function eventTargetSelector(event) {
  return event.target;
}

export default function providesList( resultsWithIds, tagType){
  return resultsWithIds
  ?[
    {type: tagType, id: 'LIST'},
    ...resultsWithIds.map(({id}) => ({ type: tagType, id})),
  ]
  :[{type: tagType, id: 'LIST'}]
}