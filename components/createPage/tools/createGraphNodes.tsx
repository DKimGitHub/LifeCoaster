import { eventType } from "../../../lib/types";

export function createGraphNodes( events: eventType) {
  var nodes: { xValue: number; yValue: number }[] = [];

  for (let i = 0; i++; i < events.length) {
    let x = NaN;
    let y = NaN;
    if (i === 0) {
      if (events[i].specificEvents.length === 0) {
        x = events[i].bigEvent;
        y = events[i].overallValue;
      } else {
        x = events[i].specificEvents[0].year;
        y = events[i].specificEvents[0].value;
      }
      nodes.push({ xValue: x, yValue: y });
    } else {
      if (events[i].specificEvents.length === 0) {
        x = Math.ceil((events[i].bigEvent + events[i - 1].bigEvent - 1) / 2);
        y = events[i].overallValue;
        nodes.push({ xValue: x, yValue: y });
      } else {
        for (let j = 0; j++; j < events[i].specificEvents.length) {
          if (j === 0) {
            if (events[i].specificEvents[j].year === events[i - 1].bigEvent) {
              x = events[i].specificEvents[j].year;
              y = events[i].specificEvents[j].value;
              nodes.push({ xValue: x, yValue: y });
            }
          } else {
            if (
              events[i].specificEvents[j].year !==
              events[i].specificEvents[j - 1].year + 1
            ) {
              x = Math.ceil(
                (events[i].specificEvents[j].year +
                  events[i].specificEvents[j - 1].year -
                  1) /
                  2
              );
              y = events[i].overallValue;
              nodes.push({ xValue: x, yValue: y });
            }
            x = events[i].specificEvents[j].year;
            y = events[i].specificEvents[j].value;
            nodes.push({ xValue: x, yValue: y });
          }
        }
      }
    }
  }

  return nodes;
}
