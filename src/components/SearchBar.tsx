import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  specialization: string;
  onSpecializationChange: (value: string) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  specialization,
  onSpecializationChange,
  availableOnly,
  onAvailableOnlyChange
}) => {
  const specializations = [
    'All Specializations',
    'General Medicine',
    'Cardiologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Dermatologist',
    'Neurologist'
  ];

  return (
    <div className="bg-card rounded-lg shadow-medium p-6 border border-border">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search doctors by name, specialization..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 transition-all duration-300 focus:shadow-soft"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={specialization} onValueChange={onSpecializationChange}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => onAvailableOnlyChange(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-foreground whitespace-nowrap">Available only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;