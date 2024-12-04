import { BryntumGanttProjectModelProps, BryntumGanttProps } from '@bryntum/gantt-react-thin';

const ganttProps : BryntumGanttProps = {
    startDate               : '2025-01-14',
    weekStartDay            : 1,
    viewPreset              : 'weekAndDayLetter',
    resourceImageFolderPath : './images/team/'
};

const ganttProjectProps : BryntumGanttProjectModelProps = {
    autoSetConstraints : true,
    // General calendar is used by default.
    calendar           : 'general',
    transport          : {
        load : {
            url : './data/launch-saas.json'
        }
    },
    autoLoad         : true,
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development-stage helper only, so please set it to false for production systems.
    validateResponse : true
};

export { ganttProps, ganttProjectProps };
