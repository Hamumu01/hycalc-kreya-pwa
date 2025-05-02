
import { useState, useEffect } from 'react';
import { 
  conversionCategories, 
  ConversionCategory, 
  ConversionUnit, 
  convert 
} from '../utils/converterUtils';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const Converter = () => {
  const [selectedCategory, setSelectedCategory] = useState<ConversionCategory>(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState<ConversionUnit>(selectedCategory.units[0]);
  const [toUnit, setToUnit] = useState<ConversionUnit>(selectedCategory.units[1]);
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');
  const isMobile = useIsMobile();

  // Update conversion whenever inputs change
  useEffect(() => {
    handleConvert();
  }, [fromUnit, toUnit, selectedCategory]);

  // When category changes, update units
  useEffect(() => {
    setFromUnit(selectedCategory.units[0]);
    setToUnit(selectedCategory.units[1]);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    const category = conversionCategories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleFromUnitChange = (unitId: string) => {
    const unit = selectedCategory.units.find(u => u.id === unitId);
    if (unit) {
      setFromUnit(unit);
    }
  };

  const handleToUnitChange = (unitId: string) => {
    const unit = selectedCategory.units.find(u => u.id === unitId);
    if (unit) {
      setToUnit(unit);
    }
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    handleConvert(e.target.value);
  };

  const handleConvert = (value: string = fromValue) => {
    try {
      if (!value || isNaN(parseFloat(value))) {
        setToValue('');
        return;
      }
      
      const fromValueNumber = parseFloat(value);
      const convertedValue = convert(
        fromValueNumber, 
        fromUnit.id, 
        toUnit.id, 
        selectedCategory.id
      );
      
      // Format the result
      setToValue(convertedValue.toString());
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  return (
    <div className="calc-container">
      <div className="input-container">
        <div>
          <label className="block text-sm mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory.id}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-3 bg-secondary rounded-md text-foreground"
          >
            {conversionCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm mb-2" htmlFor="fromValue">
              From: {fromUnit.name}
            </label>
            <div className="flex space-x-2">
              <Input 
                id="fromValue" 
                type="number" 
                value={fromValue} 
                onChange={handleFromValueChange} 
                className="w-full"
              />
              <select
                value={fromUnit.id}
                onChange={(e) => handleFromUnitChange(e.target.value)}
                className="w-1/2 p-2 bg-secondary rounded-md text-foreground"
              >
                {selectedCategory.units.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.symbol || unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            className="p-2 bg-secondary rounded-md text-foreground flex-shrink-0 self-end md:self-center"
            onClick={swapUnits}
          >
            ⇄
          </button>
          
          <div className="flex-1">
            <label className="block text-sm mb-2" htmlFor="toValue">
              To: {toUnit.name}
            </label>
            <div className="flex space-x-2">
              <Input 
                id="toValue" 
                type="text" 
                value={toValue} 
                readOnly 
                className="w-full bg-muted"
              />
              <select
                value={toUnit.id}
                onChange={(e) => handleToUnitChange(e.target.value)}
                className="w-1/2 p-2 bg-secondary rounded-md text-foreground"
              >
                {selectedCategory.units.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.symbol || unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick access for common conversions */}
      <ScrollArea className="max-h-64 overflow-y-auto mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          {conversionCategories.map(category => (
            <button
              key={category.id}
              className={`p-3 rounded-lg text-sm ${
                selectedCategory.id === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Converter;
