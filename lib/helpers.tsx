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

export function eventsToNodes(events: any) {
  const temp = createGraphNodes(events);
  console.log(temp)
  const nodes = temp
    ? temp.periodNodes
        .concat(temp.yearNodes)
        .sort((a, b) => a.x- b.x)
    : null;
    console.log(nodes);
    return nodes;
}
