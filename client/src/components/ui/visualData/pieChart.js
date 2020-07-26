import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const MyResponsivePie = props => {
    console.log(props)

    let data = [
        {
            "id": "sedimentary",
            "label": "sedimentary",
            "value": props.sedimentaryCount,
            "color": "hsl(107, 70%, 50%)"
        },
        {
            "id": "igneous",
            "label": "igneous",
            "value": 2,
            "color": "hsl(68, 70%, 50%)"
        },
        {
            "id": "metamorphic",
            "label": "metamorphic",
            "value": props.metamorphicCount,
            "color": "hsl(312, 70%, 50%)"
        },
    ]

    return (

        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            endAngle={354}
            innerRadius={0.15}
            padAngle={5}
            cornerRadius={13}
            colors={{ scheme: 'blues' }}
            borderWidth={10}
            borderColor={{ from: 'color', modifiers: [['darker', '0.5']] }}
            radialLabelsSkipAngle={14}
            radialLabelsTextXOffset={16}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={-11}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={15}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'sedimentaryCount'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'igneousCount'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'metamorphicCount'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />)


}


export default MyResponsivePie