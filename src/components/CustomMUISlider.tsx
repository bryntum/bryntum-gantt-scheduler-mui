
import React, { Component } from 'react';
import { Slider } from '@mui/material';
import { BryntumGantt } from '@bryntum/gantt-react-thin';
import { EditorConfig } from '@bryntum/core-thin';

export default class CustomMUISlider extends Component<{ ref: BryntumGantt, instance: EditorConfig }> {
    state = { value : this.props.instance.features.cellEdit.editor?.initialValues?.percentDone || 0 };

    // eslint-disable-next-line
    getValue(value: number) {
        return this.state.value;
    }

    setValue(value: number) {
        return new Promise(resolve => this.setState({ value }, () => resolve(value)));
    }

    isValid() {
        return true;
    }

    focus() {

    }

    onChangeHandler(_ : Event, value: number | number[]) {
        const editor = this.props.instance.features.cellEdit.editor;
        const { record, dataField } = editor;
        record[dataField] = value;
    }

    render() {
        return (
            <Slider
                value={this.state.value}
                aria-label="percent completed"
                onChange={this.onChangeHandler.bind(this)}
                size='small' sx={{ my : 1 }}
            />
        );
    }
}
