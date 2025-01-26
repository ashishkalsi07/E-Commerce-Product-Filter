import React, { useEffect, useState } from 'react'
import { usefilter } from './FilterContext'
interface Product {
    category: string
}
interface fetchResponse {
    products: Product[]
}
const Sidebar = () => {
    const { searchQuery, setMaxPrize, setSearchQuery, setMinPrice, maxPrice, minPrice, selectedCategory, SetSelectedCategory, keyword, setKeyword } = usefilter()
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>(["apple", "watch", "Fashion", "Trend", "shoes", "shirt"])
    const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setMinPrice(value ? parseFloat(value):undefined)   
    }
    const handleMaxPriceChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        setMaxPrize(value ? parseFloat(value): undefined)
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const data: fetchResponse = await response.json()
                const uniqueCategory = Array.from(new Set(data.products.map((product) => product.category)))
                // console.log(uniqueCategory)
                setCategories(uniqueCategory)
            } catch (error) {
                console.log('Error fetching Product', error)
            }
        }
        fetchCategories()
    }, [])
    function handleradiochangecategory(category: string): void {
        SetSelectedCategory(category)
    }

    function handlekeywordClick(keyword: string): void {
        setKeyword(keyword)
    }

    const handlereset = () =>{
        setSearchQuery('')
        SetSelectedCategory('')
        setMinPrice(undefined)
        setMaxPrize(undefined)
        setKeyword('')
    }

    return (
        <div className='w-64 p-4 h-screen'>
            <h1 className="text-2xl font-bold mb-5 mt-4">React Store</h1>
            <section>
                <input type="text" className='border-1 rounded px-2 py-2 sm:mb-0' placeholder="Search Product" value={searchQuery} onChange={e=>{ setSearchQuery(e.target.value)}}/>
                <div className='flex justify-center items-center'>
                    <input type="text" className='border-1 mt-1 mr-2 px-2 py-3 mb-2 w-full' placeholder='Min' value={minPrice ?? ''} onChange={handleMinPriceChange}/>
                    <input type="text" className='border-1 mt-1  mr-2 px-2 py-3 mb-2 w-full' placeholder='Max' value={maxPrice ??''} onChange={handleMaxPriceChange} />
                </div>
                {/*category Section*/}
                <div className='mb-5'>
                    <h2 className="text-sl font-semibold mb-3">Categories</h2>{ }
                </div>
                {
                    categories.map((category, index) => (
                        <label key={index} className='block mb-2' >
                            <input type='radio' name='category' value={category} onChange={()=>handleradiochangecategory(category)} checked={selectedCategory === category} className='mr-2 w-[16px]' />{
                                category.toLocaleUpperCase()
                            }
                        </label>))
                }
                {/*Keyword Section*/}
                <section>
                    <div className='mb-5'>
                        <h2 className='font-semibold mb-3'>Keywords</h2>
                        <div>
                            {keywords.map((keyword, index) => (<button className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-400' onClick={()=> handlekeywordClick(keyword)} key={index}>{keyword.toLocaleUpperCase()}</button>))}
                        </div>
                    </div>
                </section>
                <button onClick={handlereset} className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 hover:cursor-pointer'>Reset Filters</button>
            </section>
        </div>
    )
}

export default Sidebar
