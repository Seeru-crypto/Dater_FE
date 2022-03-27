const leftSideTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};
const rightSideTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};
const addEventModalTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};
const adminTableTransition = {
  initial: {
    opacity: 0,
    y: '100vh',
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
    type: 'tween',
  },
};

const adminButtonTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};

const eventList = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};

export { leftSideTransition, rightSideTransition, addEventModalTransition, adminButtonTransition, adminTableTransition, eventList };
