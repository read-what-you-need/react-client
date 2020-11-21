import React, { useState } from 'react'

export const DiscoverContext = React.createContext({
    topWordsSegment: [],
    setTopWordsSegment: () => { },
    topWords: [],
    setTopWords: () => { },
    topMatchingLines: [],
    setTopMatchingLines: () => { }
})



export const DiscoverContextProvider = (props) => {

    const setTopWordsSegment = (topWordsSegment) => {
        const segment = topWordsSegment;
        const segmentLen = segment.length;



        // the point at which segment cuts are to be made
        const segmentInterval = [20, 50, 30]

        //       20           20+50=70      100
        //        |                 |        |
        //        |                 |        |
        //        |                 |        |
        //        ⬇️                 ⬇️        ⬇️
        // [===================================]

        var firstMarker = Math.floor(segmentLen * segmentInterval[0] * 0.01)
        var secondMarker = Math.floor(segmentLen * segmentInterval[1] * 0.01) + firstMarker



        const firstSegment = segment.slice(0, firstMarker)
        const secondSegment = segment.slice(firstMarker, secondMarker)
        const thirdSegment = segment.slice(secondMarker, -1)

        

        setDiscoverState({ ...discoverState, topWordsSegment: [firstSegment, secondSegment, thirdSegment] })
    }

    const setTopWords = (topWords) => {
        setDiscoverState({ ...discoverState, topWords: topWords })
    }

    const setTopMatchingLines = (topMatchingLines) => {
        setDiscoverState({ ...discoverState, topMatchingLines: topMatchingLines })
    }

    const initState = {
        topWordsSegment: [],
        setTopWordsSegment: setTopWordsSegment,
        topWords: [],
        setTopWords: setTopWords,
        topMatchingLines: [],
        setTopMatchingLines: setTopMatchingLines
    }

    const [discoverState, setDiscoverState] = useState(initState)

    return (
        <DiscoverContext.Provider value={discoverState}>
            {props.children}
        </DiscoverContext.Provider>
    )
}