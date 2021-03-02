import React, { useState, useContext, useEffect } from 'react';


import { SearchContext } from '../SearchContextMangement';

import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        marginRight: 20,
        marginBottom: 30,
        marginTop: 15,

    },
    label: {
        fontSize: 24
    },
});

const FlatView = ({topN}) => {


    const classes = useStyles();
    const state = useContext(SearchContext);

    //////console.log(topN)

    return (
        
            topN.map(

                ([key, value], i) =>

                    <Tooltip title={"found " + value + " times"}>
                        <Chip
                            key={Math.random()}
                            // avatar={<Avatar>{value}</Avatar>}

                            onClick={(e) => {
                                e.preventDefault();
                                state.setSearch(key);
                            }}
                            classes={{
                                root: classes.root,
                                label: classes.label,
                            }}

                            label={key} />

                    </Tooltip>

            )
    );
}

export default FlatView;