
export interface ConversionCategory {
  id: string;
  name: string;
  units: ConversionUnit[];
}

export interface ConversionUnit {
  id: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
  symbol?: string;
}

// Length conversions
const lengthCategory: ConversionCategory = {
  id: "length",
  name: "Length",
  units: [
    {
      id: "m",
      name: "Meters",
      symbol: "m",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "km",
      name: "Kilometers",
      symbol: "km",
      toBase: (value) => value * 1000,
      fromBase: (value) => value / 1000
    },
    {
      id: "cm",
      name: "Centimeters",
      symbol: "cm",
      toBase: (value) => value / 100,
      fromBase: (value) => value * 100
    },
    {
      id: "mm",
      name: "Millimeters",
      symbol: "mm",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000
    },
    {
      id: "ft",
      name: "Feet",
      symbol: "ft",
      toBase: (value) => value * 0.3048,
      fromBase: (value) => value / 0.3048
    },
    {
      id: "in",
      name: "Inches",
      symbol: "in",
      toBase: (value) => value * 0.0254,
      fromBase: (value) => value / 0.0254
    },
    {
      id: "yd",
      name: "Yards",
      symbol: "yd",
      toBase: (value) => value * 0.9144,
      fromBase: (value) => value / 0.9144
    },
    {
      id: "mi",
      name: "Miles",
      symbol: "mi",
      toBase: (value) => value * 1609.344,
      fromBase: (value) => value / 1609.344
    }
  ]
};

// Weight/Mass conversions
const weightCategory: ConversionCategory = {
  id: "weight",
  name: "Weight",
  units: [
    {
      id: "kg",
      name: "Kilograms",
      symbol: "kg",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "g",
      name: "Grams",
      symbol: "g",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000
    },
    {
      id: "mg",
      name: "Milligrams",
      symbol: "mg",
      toBase: (value) => value / 1000000,
      fromBase: (value) => value * 1000000
    },
    {
      id: "lb",
      name: "Pounds",
      symbol: "lb",
      toBase: (value) => value * 0.453592,
      fromBase: (value) => value / 0.453592
    },
    {
      id: "oz",
      name: "Ounces",
      symbol: "oz",
      toBase: (value) => value * 0.0283495,
      fromBase: (value) => value / 0.0283495
    },
    {
      id: "ton",
      name: "Tons",
      symbol: "ton",
      toBase: (value) => value * 907.185,
      fromBase: (value) => value / 907.185
    }
  ]
};

// Temperature conversions
const temperatureCategory: ConversionCategory = {
  id: "temperature",
  name: "Temperature",
  units: [
    {
      id: "c",
      name: "Celsius",
      symbol: "°C",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "f",
      name: "Fahrenheit",
      symbol: "°F",
      toBase: (value) => (value - 32) * 5/9,
      fromBase: (value) => value * 9/5 + 32
    },
    {
      id: "k",
      name: "Kelvin",
      symbol: "K",
      toBase: (value) => value - 273.15,
      fromBase: (value) => value + 273.15
    }
  ]
};

// Volume conversions
const volumeCategory: ConversionCategory = {
  id: "volume",
  name: "Volume",
  units: [
    {
      id: "l",
      name: "Liters",
      symbol: "L",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "ml",
      name: "Milliliters",
      symbol: "mL",
      toBase: (value) => value / 1000,
      fromBase: (value) => value * 1000
    },
    {
      id: "m3",
      name: "Cubic Meters",
      symbol: "m³",
      toBase: (value) => value * 1000,
      fromBase: (value) => value / 1000
    },
    {
      id: "gal",
      name: "Gallons (US)",
      symbol: "gal",
      toBase: (value) => value * 3.78541,
      fromBase: (value) => value / 3.78541
    },
    {
      id: "qt",
      name: "Quarts (US)",
      symbol: "qt",
      toBase: (value) => value * 0.946353,
      fromBase: (value) => value / 0.946353
    },
    {
      id: "pt",
      name: "Pints (US)",
      symbol: "pt",
      toBase: (value) => value * 0.473176,
      fromBase: (value) => value / 0.473176
    }
  ]
};

// Time conversions
const timeCategory: ConversionCategory = {
  id: "time",
  name: "Time",
  units: [
    {
      id: "s",
      name: "Seconds",
      symbol: "s",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "min",
      name: "Minutes",
      symbol: "min",
      toBase: (value) => value * 60,
      fromBase: (value) => value / 60
    },
    {
      id: "h",
      name: "Hours",
      symbol: "h",
      toBase: (value) => value * 3600,
      fromBase: (value) => value / 3600
    },
    {
      id: "d",
      name: "Days",
      symbol: "d",
      toBase: (value) => value * 86400,
      fromBase: (value) => value / 86400
    },
    {
      id: "wk",
      name: "Weeks",
      symbol: "wk",
      toBase: (value) => value * 604800,
      fromBase: (value) => value / 604800
    },
    {
      id: "mo",
      name: "Months (avg)",
      symbol: "mo",
      toBase: (value) => value * 2629800,
      fromBase: (value) => value / 2629800
    },
    {
      id: "yr",
      name: "Years",
      symbol: "yr",
      toBase: (value) => value * 31557600,
      fromBase: (value) => value / 31557600
    }
  ]
};

// Area conversions
const areaCategory: ConversionCategory = {
  id: "area",
  name: "Area",
  units: [
    {
      id: "m2",
      name: "Square Meters",
      symbol: "m²",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "km2",
      name: "Square Kilometers",
      symbol: "km²",
      toBase: (value) => value * 1000000,
      fromBase: (value) => value / 1000000
    },
    {
      id: "cm2",
      name: "Square Centimeters",
      symbol: "cm²",
      toBase: (value) => value / 10000,
      fromBase: (value) => value * 10000
    },
    {
      id: "ha",
      name: "Hectares",
      symbol: "ha",
      toBase: (value) => value * 10000,
      fromBase: (value) => value / 10000
    },
    {
      id: "ft2",
      name: "Square Feet",
      symbol: "ft²",
      toBase: (value) => value * 0.092903,
      fromBase: (value) => value / 0.092903
    },
    {
      id: "ac",
      name: "Acres",
      symbol: "ac",
      toBase: (value) => value * 4046.86,
      fromBase: (value) => value / 4046.86
    }
  ]
};

// Data conversions
const dataCategory: ConversionCategory = {
  id: "data",
  name: "Data Size",
  units: [
    {
      id: "b",
      name: "Bytes",
      symbol: "B",
      toBase: (value) => value,
      fromBase: (value) => value
    },
    {
      id: "kb",
      name: "Kilobytes",
      symbol: "KB",
      toBase: (value) => value * 1000,
      fromBase: (value) => value / 1000
    },
    {
      id: "mb",
      name: "Megabytes",
      symbol: "MB",
      toBase: (value) => value * 1000000,
      fromBase: (value) => value / 1000000
    },
    {
      id: "gb",
      name: "Gigabytes",
      symbol: "GB",
      toBase: (value) => value * 1000000000,
      fromBase: (value) => value / 1000000000
    },
    {
      id: "kib",
      name: "Kibibytes",
      symbol: "KiB",
      toBase: (value) => value * 1024,
      fromBase: (value) => value / 1024
    },
    {
      id: "mib",
      name: "Mebibytes",
      symbol: "MiB",
      toBase: (value) => value * 1048576,
      fromBase: (value) => value / 1048576
    },
    {
      id: "gib",
      name: "Gibibytes",
      symbol: "GiB",
      toBase: (value) => value * 1073741824,
      fromBase: (value) => value / 1073741824
    }
  ]
};

// Export all categories
export const conversionCategories: ConversionCategory[] = [
  lengthCategory,
  weightCategory,
  temperatureCategory,
  volumeCategory,
  timeCategory,
  areaCategory,
  dataCategory
];

// Convert value from one unit to another
export const convert = (
  value: number,
  fromUnitId: string,
  toUnitId: string,
  categoryId: string
): number => {
  const category = conversionCategories.find(c => c.id === categoryId);
  
  if (!category) {
    throw new Error(`Category ${categoryId} not found`);
  }
  
  const fromUnit = category.units.find(u => u.id === fromUnitId);
  const toUnit = category.units.find(u => u.id === toUnitId);
  
  if (!fromUnit || !toUnit) {
    throw new Error('Invalid units');
  }
  
  // Convert to base unit first, then to target unit
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
};
