import moment from "moment";

const prayersAvailable = ["Shacharis", "Maariv"];

const prayerCount = prayersAvailable.length

const modifierMap = {
  before8AM: (ary) => ary.slice(0, prayerCount),
  after8AM: (ary) => ary.slice(1, prayerCount + 1),
  after9PM: (ary) => ary.slice(prayerCount, prayerCount * 2)
}

export const getUpcomingDavenings = (count) => {
  const today = moment(new Date()).format("MMDDYYYY");
  const tomorrow = moment(new Date()).add(1, "day").format("MMDDYYYY");


  const now = moment(new Date);
  const after8AM = now.isAfter(moment("08:00", 'HH:mm'));
  const after9PM = now.isAfter(moment("21:00", 'HH:mm'));

  const modifierValue = after8AM ? after9PM ? 'after9PM' : 'after8AM' : 'before8AM'
  const modifierFunction = modifierMap[modifierValue]

  const daveningArray = [
    ...prayersAvailable.map((prayer) => ({
      prayer, date: today, count
    })),
    ...prayersAvailable.map((prayer) => ({
      prayer, date: tomorrow, count
    }))
  ];

  return modifierFunction(daveningArray)
};
