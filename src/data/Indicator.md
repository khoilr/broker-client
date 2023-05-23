# Indicator

BBANDS - Bollinger Bands
upperband, middleband, lowerband = BBANDS(close, timeperiod=5, nbdevup=2, nbdevdn=2, matype=0)

```json
     {
        "value": "BBANDS",
        "label": "Bollinger Bands"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            },
            {
                "name": "nbdevup",
                "label": "Nbdevup",
                "type": "number",
                "default": 2
            },
            {
                "name": "nbdevdn",
                "label": "Nbdevdn",
                "type": "number",
                "default": 2
            }
        ],
        "returns": [
            {
                "label": "Upper Band",
                "value": "upperband"
            },
            {
                "label": "Middle Band",
                "value": "middleband"
            },
            {
                "label": "Lower Band",
                "value": "lowerband"
            }
        ],
     }

```

DEMA - Double Exponential Moving Average
real = DEMA(close, timeperiod=30)

```json
     {
        "value": "DEMA",
        "label": "Double Exponential Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "DEMA",
                "value": "real"
            }
        ],
     }

```

EMA - Exponential Moving Average
real = EMA(close, timeperiod=30)

```json
     {
        "value": "EMA",
        "label": "Exponential Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "EMA",
                "value": "real"
            }
        ],
     }

```

HT_TRENDLINE - Hilbert Transform - Instantaneous Trendline
real = HT_TRENDLINE(close)

```json
     {
        "value": "HT_TRENDLINE",
        "label": "Hilbert Transform - Instantaneous Trendline"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            }
        ],
        "returns": [
            {
                "label": "HT_TRENDLINE",
                "value": "real"
            }
        ],
     }

```

KAMA - Kaufman Adaptive Moving Average
real = KAMA(close, timeperiod=30)

```json
     {
        "value": "KAMA",
        "label": "Kaufman Adaptive Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "KAMA",
                "value": "real"
            }
        ],
     }

```

MA - Moving average
real = MA(close, timeperiod=30, matype=0)

```json
     {
        "value": "MA",
        "label": "Moving average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "MA",
                "value": "real"
            }
        ],
     }

```

MAMA - MESA Adaptive Moving Average
mama, fama = MAMA(close, fastlimit=0, slowlimit=0)

```json
     {
        "value": "MAMA",
        "label": "MESA Adaptive Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "fastlimit",
                "label": "Fast Limit",
                "type": "number",
                "default": 0
            },
            {
                "name": "slowlimit",
                "label": "Slow Limit",
                "type": "number",
                "default": 0
            }
        ],
        "returns": [
            {
                "label": "MAMA",
                "value": "mama"
            },
            {
                "label": "FAMA",
                "value": "fama"
            }
        ],
     }

```

MIDPOINT - MidPoint over period
real = MIDPOINT(close, timeperiod=14)

```json
    {
        "value": "MIDPOINT",
        "label": "MidPoint over period"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 14
            }
        ],
        "returns": [
            {
                "label": "MIDPOINT",
                "value": "real"
            }
        ],
    }
```

SAR - Parabolic SAR
real = SAR(high, low, acceleration=0, maximum=0)

```json
     {
        "value": "SAR",
        "label": "Parabolic SAR"
        "parameters": [
            {
                "name": "high",
                "label": "High",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "high"
            },
            {
                "name": "low",
                "label": "Low",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "low"
            },
            {
                "name": "acceleration",
                "label": "Acceleration Factor",
                "type": "number",
                "default": 0
            },
            {
                "name": "maximum",
                "label": "Maximum Acceleration",
                "type": "number",
                "default": 0
            }
        ],
        "returns": [
            {
                "label": "SAR",
                "value": "real"
            }
        ],
     }

```

SAREXT - Parabolic SAR - Extended
real = SAREXT(high, low, startvalue=0, offsetonreverse=0, accelerationinitlong=0, accelerationlong=0, accelerationmaxlong=0, accelerationinitshort=0, accelerationshort=0, accelerationmaxshort=0)

```json
     {
        "value": "SAREXT",
        "label": "Parabolic SAR - Extended"
        "parameters": [
            {
                "name": "high",
                "label": "High",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "high"
            },
            {
                "name": "low",
                "label": "Low",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "low"
            },
            {
                "name": "startvalue",
                "label": "Start Value",
                "type": "number",
                "default": 0
            },
            {
                "name": "offsetonreverse",
                "label": "Offset on Reverse",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationinitlong",
                "label": "Acceleration Init Long",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationlong",
                "label": "Acceleration Long",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationmaxlong",
                "label": "Acceleration Max Long",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationinitshort",
                "label": "Acceleration Init Short",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationshort",
                "label": "Acceleration Short",
                "type": "number",
                "default": 0
            },
            {
                "name": "accelerationmaxshort",
                "label": "Acceleration Max Short",
                "type": "number",
                "default": 0
            }
        ],
        "returns": [
            {
                "label": "SAREXT",
                "value": "real"
            }
        ],
     }

```

SMA - Simple Moving Average
real = SMA(close, timeperiod=30)

```json
     {
        "value": "SMA",
        "label": "Simple Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "SMA",
                "value": "real"
            }
     }
```

T3 - Triple Exponential Moving Average (T3)
real = T3(close, timeperiod=5, vfactor=0)

```json
     {
        "value": "T3",
        "label": "Triple Exponential Moving Average (T3)"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            },
            {
                "name": "vfactor",
                "label": "Volume Factor",
                "type": "number",
                "default": 0
            }
        ],
        "returns": [
            {
                "label": "T3",
                "value": "real"
            }
        ],
     }

```

TEMA - Triple Exponential Moving Average
real = TEMA(close, timeperiod=30)

```json
     {
        "value": "TEMA",
        "label": "Triple Exponential Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "TEMA",
                "value": "real"
            }
        ],
     }

```

TRIMA - Triangular Moving Average
real = TRIMA(close, timeperiod=30)

```json
     {
        "value": "TRIMA",
        "label": "Triangular Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "TRIMA",
                "value": "real"
            }
        ],
     }

```

WMA - Weighted Moving Average
real = WMA(close, timeperiod=30)

```json
    {
        "value": "WMA",
        "label": "Weighted Moving Average"
        "parameters": [
            {
                "name": "price",
                "label": "Price",
                "type": "selection",
                "values": ["open", "close", "high", "low"],
                "default": "close"
            },
            {
                "name": "period",
                "label": "Period",
                "type": "number",
                "default": 5
            }
        ],
        "returns": [
            {
                "label": "WMA",
                "value": "real"
            }
        ],
    }
    
```
