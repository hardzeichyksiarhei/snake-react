
import React, { useState, useRef } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';

import './Snake.sass'

const Settings = (props: { onSave: Function }) => {
    const inputRow = useRef<HTMLInputElement>(null);
    const inputCol = useRef<HTMLInputElement>(null);

    const [isValidRow, setIsValidRow] = useState(true)
    const [isValidCol, setIsValidCol] = useState(true)

    const validationRule = {
        min: 8,
        max: 30
    }

    const settingsSave = () => {
        setIsValidRow(true)
        setIsValidCol(true)

        if (!inputRow.current || !inputCol.current) return
        let row = +inputRow.current.value;
        let col = +inputCol.current.value;

        if (row < validationRule.min || row > validationRule.max) {
            setIsValidRow(false)
            return
        }
        if (col < validationRule.min || col > validationRule.max) {
            setIsValidCol(false)
            return
        }

        const settings = { row, col }
        props.onSave(settings)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        id="row"
                        label="Row"
                        fullWidth
                        margin="normal"
                        inputRef={inputRow}
                        helperText={`Min: ${validationRule.min}, Max: ${validationRule.max}`}
                        error={!isValidRow}
                        type="number"
                        defaultValue="16"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="col"
                        label="Col"
                        fullWidth
                        margin="normal"
                        inputRef={inputCol}
                        helperText={`Min: ${validationRule.min}, Max: ${validationRule.max}`}
                        error={!isValidCol}
                        type="number"
                        defaultValue="16"
                    />
                </Grid>
            </Grid>
            <Button style={{ marginTop: 15 }} variant="contained" color="primary" onClick={settingsSave}>Render</Button>
        </div>
    )
}

export default Settings