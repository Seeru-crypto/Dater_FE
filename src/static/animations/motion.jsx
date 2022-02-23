const leftSideTransition = {
    initial: {
        x: "-100vh"
    },
    animate: {
        x: 0
    },
    transition: {
        duration: 0.5,
        type: "tween"
    }
}
const rightSideTransition = {
    initial: {
        x: "100vh"
    },
    animate: {
        x: 0
    },
    transition: {
        duration: 0.5,
        type: "tween"
    }
}
const addEventModalTransition = {
    initial: {
        opacity:0,
        x:"-100vh"
    },
    animate: {
        x:0,
        opacity: 1,
        scale:1
    },
    transition: {
        duration: 0.2,
        type: "tween"
    }
}
const adminTableTransition = {
    initial: {
        opacity:0,
        y:"100vh"
    },
    animate: {
        y:0,
        opacity: 1,
        scale:1
    },
    transition: {
        duration: 0.5,
        type: "tween"
    }
}

const adminButtonTransition = {
    initial: {
        opacity:0
    },
    animate: {
        opacity: 1
    }
}

const eventList = {
    initial: {
        opacity:0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 0.5
    }
}







export {
    leftSideTransition, rightSideTransition, addEventModalTransition, adminButtonTransition, adminTableTransition, eventList
}