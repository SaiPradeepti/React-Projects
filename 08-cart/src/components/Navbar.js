import React from 'react'
import { HiShoppingBag } from 'react-icons/hi';
import { useGlobalContext } from './context'

const Navbar = () => {
    const { itemCount } = useGlobalContext();

    return (
        <nav className='nav'>
            <div className="nav__center">
                <div className="nav__header">
                    <h2>Cart</h2>
                </div>
                <div className="nav__icon">
                    <HiShoppingBag className='icon'/>
                    <div className="itemCount">
                        {itemCount}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
