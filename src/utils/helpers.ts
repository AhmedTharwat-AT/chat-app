export function formatTime(timestamp: number | string) {
  const time = new Date(+timestamp);
  const isToday = time.toDateString() == new Date().toDateString();

  if (isToday) {
    return (
      "Today " +
      time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }

  return time.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function sortArrayByNames(arr: any[]) {
  const names = [...arr];
  names.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );
  return names;
}

export function divideArrayToSections(arr: any[]) {
  const sections: any = {};
  arr.forEach((item) => {
    const startingLetter = item.name[0].toLowerCase();
    if (startingLetter.match(/[a-z]/)) {
      if (!sections[startingLetter]) {
        sections[startingLetter] = [];
      }
      sections[startingLetter].push(item);
    } else {
      if (!sections.others) {
        sections.others = [];
      }
      sections.others.push(item);
    }
  });
  //move others section to the end
  const sectionsArray = Object.entries(sections);
  const index = sectionsArray.findIndex((el: any[]) => el[0] == "others");
  if (index != -1) {
    const othersSection = sectionsArray[index];
    sectionsArray.splice(index, 1);
    sectionsArray.push(othersSection);
  }

  return sectionsArray as [string, any[]][];
}
