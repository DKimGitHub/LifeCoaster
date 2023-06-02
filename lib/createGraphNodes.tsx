import { eventType } from "./types";

export function createGraphNodes(events: any) {
  var periodNodes: { x: number; y: number }[] = [];
  var yearNodes: { x: number; y: number }[] = [];

  if (events === null) {
    return { periodNodes, yearNodes };
  } else {
    //events.sort((a,b) => a.createdAt - b.createdAt)
    yearNodes.push({
      x: events[0]?.specificYear[0]?.year,
      y: events[0]?.specificYear[0]?.value,
    });

    for (let i = 1; i < events.length; i++) {
      if (events[i].type === "period") {
        if (events[i - 1].nextYear === events[i].nextYear - 1) {
          periodNodes.push({
            x: events[i].nextYear - 1,
            y: events[i].period.value,
          });
        } else {
          if (i == 1) {
            periodNodes.push({
              x: events[i - 1].nextYear + 1,
              y: events[i].period.value,
            });
          } else {
            periodNodes.push({
              x: events[i - 1].nextYear,
              y: events[i].period.value,
            });
          }
          periodNodes.push({
            x: events[i].nextYear - 1,
            y: events[i].period.value,
          });
        }
      } else if (events[i].type === "specificYear") {
        for (let y of events[i].specificYear) {
          yearNodes.push({
            x: y.year,
            y: y.value,
          });
        }
      }
    }

    return { periodNodes, yearNodes };
  }
}
