import { createGraphNodes } from "./createGraphNodes";

export function timeSince(date: Date) {
  var seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
export function randomName(id: string) {
  let hash = 0,
    i,
    chr;
  if (id.length === 0) return hash;
  for (i = 0; i < id.length; i++) {
    chr = id.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  let ranNum = Math.abs(hash%28);
  let names = ["Jimmy", "John", "Michael", "David", "Will", "Joseph", "Tommy", "Chris", "Daniel", "Matt", "Tony", "Paul", "Ahmed", "Ali", "Brian", "Eric", "Scott", "Rachel", "Sarah", "Laura", "Liam", "Olivia", "Emma", "Ben", "Alex", "Noah", "Saad", "David"];
  return names[ranNum];
}
export function eventsToNodes(events: any) {
  const temp = createGraphNodes(events);
  const nodes = temp
    ? temp.periodNodes
        .concat(temp.yearNodes)
        .sort((a, b) => a.x- b.x)
    : [];
    return nodes;
}
