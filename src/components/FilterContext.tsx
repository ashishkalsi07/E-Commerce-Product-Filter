import { createContext, useContext, useState, ReactNode } from "react";
interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void

    selectedCategory: string | undefined;
    SetSelectedCategory: (category: string) => void;

    minPrice: number | undefined
    setMinPrice: (price: number | undefined) => void;

    maxPrice: number | undefined;
    setMaxPrize: (price: number | undefined) => void;

    keyword: string;
    setKeyword: (keyword: string) => void;
}
const FilterContext = createContext<FilterContextType | undefined>(undefined)
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedCategory, SetSelectedCategory] = useState<string | undefined>(undefined)
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
    const [maxPrice, setMaxPrize] = useState<number | undefined>(undefined)
    const [keyword, setKeyword] = useState<string>('')
    return <FilterContext.Provider value={{ searchQuery, setMaxPrize, setSearchQuery, setMinPrice,maxPrice, minPrice, selectedCategory, SetSelectedCategory, keyword, setKeyword }}>{children}</FilterContext.Provider>;
}
export const usefilter = () => {
    const context = useContext(FilterContext)
    if(context === undefined){
        throw new Error("useFilter must be used within a FilterProvider")
    }
    return context;
}

