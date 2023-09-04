import { createContext, useContext, useState } from "react";
import SaleSideBar from "../components/SaleSideBar.jsx";

const SaleContext = createContext({});

export function useSaleContext(){
    return useContext(SaleContext);
}

export function SaleProvider({children}){
    const [saleProducts, setSaleProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const openSideBar = () => setIsOpen(true)
    const closeSideBar = () => setIsOpen(false)

    function getSaleProductsQuantity(id){
       return saleProducts.find(item => item.id === id)?.quantity || 0
    }


    const saleQuantity = saleProducts.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      )
    function increaseSaleProductsQuantity(id, title, image, price) {
          setSaleProducts(addedItems => {
          if (addedItems.find(item => item.id === id) == null) {
            return [...addedItems, { id, title, image, quantity: 1, price }]
          } else {
            return addedItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }
      function decreaseSaleProductsQuantity(id) {
        setSaleProducts(addedItems => {
          if (addedItems.find(item => item.id === id)?.quantity === 1) {
            return addedItems.filter(item => item.id !== id)
          } else {
            return addedItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      function removeProductFromSale(id) {
        setSaleProducts(addedItems => {
          return addedItems.filter(item => item.id !== id)
        })
      }

      function removeAllProductsFromSale(){
        setSaleProducts([])
      }

    return(
        <SaleContext.Provider value={{getSaleProductsQuantity, increaseSaleProductsQuantity, decreaseSaleProductsQuantity, saleQuantity, openSideBar, closeSideBar, saleProducts, removeProductFromSale, removeAllProductsFromSale}} >
            {children}
            <SaleSideBar isOpen={isOpen} />
        </SaleContext.Provider>
    )
};