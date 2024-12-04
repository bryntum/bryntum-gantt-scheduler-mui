import { useRef, useState, useEffect, LegacyRef } from 'react';
import { BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react-thin';
import { BryntumScheduler } from '@bryntum/scheduler-react-thin';
import { ganttProps, ganttProjectProps } from '../ganttConfig';
import { Box, Button, Tooltip } from '@mui/material';
import { schedulerProps } from '../schedulerConfig';
import { BryntumSplitter } from '@bryntum/core-react-thin';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import CustomMUISlider from './CustomMUISlider';
import { EditorConfig } from '@bryntum/core-thin';
import './BryntumGanttScheduler.css';


export default function BryntumGanttScheduler() {

    const ganttProjectRef = useRef<BryntumGanttProjectModel>(null);
    const ganttRef = useRef<BryntumGantt>(null);
    const schedulerRef = useRef<BryntumScheduler>(null);

    const [columns] = useState([
        { type : 'sequence', minWidth : 50, width : 50, text : '', align : 'right', resizable : false },
        { type : 'name', width : 280 },
        {
            type      : 'percent',
            text      : '% Completed',
            field     : 'percentDone',
            showValue : false,
            width     : 160,
            editor    : (ref: (LegacyRef<CustomMUISlider> | undefined) & BryntumGantt, instance: EditorConfig) => <CustomMUISlider instance={instance} ref={ref} />
        },
        { type : 'resourceassignment', text : 'Assigned Resources', showAvatars : true, width : 160 }
    ]);

    function onZoom(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (ganttRef.current) {
            const action = e.currentTarget.id as 'zoomIn' | 'zoomOut';
            ganttRef.current.instance[action]();
        }
    };

    useEffect(() => {
        if (ganttRef.current && schedulerRef.current) {
            ganttRef.current.instance.addPartner(schedulerRef.current.instance);
        }
    }, []);

    return (
        <Box
            sx={{
                height        : '100%',
                display       : 'flex',
                flex          : 1,
                flexDirection : 'column' }}
        >
            <Box sx={{ display : 'flex', background : '#fafafa', borderBottom : '1px solid var(--mui-palette-divider);', gap : 1, justifyContent : 'flex-end', py : 2, px : 2 }}>
                <Tooltip title="Zoom in">
                    <Button
                        id="zoomIn"
                        variant="outlined"
                        sx={{
                            color       : 'var(--mui-palette-action-active)',
                            borderColor : 'var(--mui-palette-action-active)',
                            '&:hover'   : {
                                borderColor : 'var(--mui-palette-action-active)'
                            }
                        }}
                        onClick={(e) => onZoom(e) }
                    >
                        <ZoomIn />
                    </Button>
                </Tooltip>
                <Tooltip title="Zoom out">
                    <Button
                        id="zoomOut"
                        variant="outlined"
                        sx={{
                            color       : 'var(--mui-palette-action-active)',
                            borderColor : 'var(--mui-palette-action-active)',
                            '&:hover'   : {
                                borderColor : 'var(--mui-palette-action-active)'
                            }
                        }}
                        onClick={(e) => onZoom(e) }
                    >
                        <ZoomOut />
                    </Button>
                </Tooltip>
            </Box>

            <BryntumGanttProjectModel
                ref={ganttProjectRef}
                {...ganttProjectProps}
            />

            <BryntumGantt
                project={ganttProjectRef}
                ref={ganttRef}
                {...ganttProps}
                columns={columns}
            />
            <BryntumSplitter />
            <BryntumScheduler
                project={ganttProjectRef}
                ref={schedulerRef}
                {...schedulerProps}
            />
        </Box>
    );
}
