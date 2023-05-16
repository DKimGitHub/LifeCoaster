import { eventType } from "./types";

export function createGraphNodes(events: eventType) {
  var periodNodes: { xValue: number; yValue: number }[] = [];
  var yearNodes: { xValue: number; yValue: number }[] = [];

  for (let i = 0; i < events.length; i++) {
    if (events[i].type === "period") {
      if (events[i - 1].nextYear === events[i].nextYear - 1) {
        periodNodes.push({
          xValue: events[i].nextYear,
          yValue: events[i].period.value,
        });
      } else {
        if (i == 1) {
          periodNodes.push({
            xValue: events[i - 1].nextYear + 1,
            yValue: events[i].period.value,
          });
        } else {
          periodNodes.push({
            xValue: events[i - 1].nextYear,
            yValue: events[i].period.value,
          });
        }
        periodNodes.push({
          xValue: events[i].nextYear - 1,
          yValue: events[i].period.value,
        });
      }
    } else if (events[i].type === "specificYear") {
      for (let y of events[i].specificYear) {
        yearNodes.push({
          xValue: y.year,
          yValue: y.value,
        });
      }
    }
  }

  return { periodNodes, yearNodes };
}
