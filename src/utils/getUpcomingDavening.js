import moment from "moment";

const prayersAvailable = ["Shacharis", "Maariv"];

const prayerCount = prayersAvailable.length

const modifierMap = {
  before8AM: (ary) => ary.slice(0, prayerCount),
  after8AM: (ary) => ary.slice(1, prayerCount + 1),
  after9PM: (ary) => ary.slice(prayerCount, prayerCount * 2)
}

export const getUpcomingDavenings = () => {
  const today = moment(new Date()).format("MMDDYYYY");
  const tomorrow = moment(new Date()).add(1, "day").format("MMDDYYYY");


  const now = moment(new Date);
  let after8AM = now.isAfter(moment("08:00", 'HH:mm'));
  let after9PM = now.isAfter(moment("20:00", 'HH:mm'));

  const modifierValue = after8AM ? after9PM ? 'after9PM' : 'after8AM' : 'before8AM'
  const modifierFunction = modifierMap[modifierValue]

  const daveningArray = [
    ...prayersAvailable.map((prayer) => ({
      prayer, date: today
    })),
    ...prayersAvailable.map((prayer) => ({
      prayer, date: tomorrow
    }))
  ];

  return modifierFunction(daveningArray)
};
