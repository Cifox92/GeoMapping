import React from 'react'
import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
    {
      "id": "javascript",
      "label": "javascript",
      "value": 143,
      "color": "hsl(107, 70%, 50%)"
    },
    {
      "id": "make",
      "label": "make",
      "value": 573,
      "color": "hsl(68, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 397,
      "color": "hsl(312, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 230,
      "color": "hsl(80, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 170,
      "color": "hsl(235, 70%, 50%)"
    }
  ]

const MyResponsivePie = () => (
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
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.5' ] ] }}
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
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
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
    />
)


export default MyResponsivePie