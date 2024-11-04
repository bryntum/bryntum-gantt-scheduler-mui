import { BryntumSchedulerProps } from '@bryntum/scheduler-react-thin';
import { EventModel } from '@bryntum/scheduler-thin';

type Record =  {
    events: EventModel[];
}

const schedulerProps : BryntumSchedulerProps = {
    rowHeight           : 45,
    eventColor          : 'blue',
    resourceImagePath   : './images/team/',
    dependenciesFeature : true,

    columns : [
        {
            type           : 'resourceInfo',
            field          : 'name',
            text           : 'Resource',
            showEventCount : false,
            width          : 330
        },
        {
            text     : 'Assigned tasks',
            field    : 'events.length',
            width    : 160,
            editor   : false,
            align    : 'right',
            renderer : ({ value }: { value: number }) => `${value} task${value !== 1 ? 's' : ''}`
        },
        {
            text     : 'Assigned work days',
            width    : 160,
            editor   : false,
            align    : 'right',
            renderer : ({ record }: { record: Record }) => record.events.map(event => event.duration).reduce((total, current) => {
                return total + current;
            }, 0) + ' days'
        }
    ]
};

export { schedulerProps };
