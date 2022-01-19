import moment from "moment";


const modifierMap = {
  before8AM: (ary) => ary.slice(0, 2),
  after8AM: (ary) => ary.slice(1, 3),
  after9PM: (ary) => ary.slice(2, 4)
}

export const getUpcomingDavenings = () => {
  const today = moment(new Date()).format("MMDDYYYY");
  const tomorrow = moment(new Date()).add(1, "day").format("MMDDYYYY");
  const types = ["Shacharis", "Maariv"];

  const now = moment(new Date);
  let after8AM = now.isAfter(moment("08:00", 'HH:mm'));
  let after9PM = now.isAfter(moment("20:00", 'HH:mm'));

  const modifierValue = after8AM ? after9PM ? 'after9PM' : 'after8AM' : 'before8AM'
  const modifierFunction = modifierMap[modifierValue]

  const daveningArray = [
    ...types.map((prayer) => ({
      prayer, date: today
    })),
    ...types.map((prayer) => ({
      prayer, date: tomorrow
    }))
  ];

  return modifierFunction(daveningArray)
};
