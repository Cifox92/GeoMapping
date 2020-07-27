import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const MyResponsivePie = props => {

    let data = [
        {
            "id": "sedimentary",
            "label": "Sedimentary",
            "value": props.countRocks.Sedimentary,
            "color": "hsl(107, 70%, 50%)"
        },
        {
            "id": "igneous",
            "label": "Igneous",
            "value": props.countRocks.Igneous,
            "color": "hsl(68, 70%, 50%)"
        },
        {
            "id": "metamorphic",
            "label": "Metamorphic",
            "value": props.countRocks.Metamorphic,
            "color": "hsl(312, 70%, 50%)"
        },
    ]

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            endAngle={354}
            innerRadius={0.7}
            padAngle={0}
            cornerRadius={0}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', '0.5']] }}
            radialLabelsSkipAngle={14}
            radialLabelsTextXOffset={16}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={-9}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={15}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
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