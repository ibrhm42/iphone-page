"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import AppleLogo from 'src/assets/apple.svg';
import { headerNavigation } from 'src/util/navigation';

const Header = () => {
    const [menuId, setmenuId] = useState<number | null>(null);
    useEffect(() => {
        const headerNavigation = document.querySelector(".backdrop");
        headerNavigation?.addEventListener("mouseenter", () => setmenuId(null));


        const items = document.querySelectorAll(".header__navItem");

        items.forEach((el) => {
            const id = el.getAttribute('data-id');
            const onHover = () => {
                id && setmenuId(parseInt(id) || null);
            };
            el.addEventListener("mouseenter", onHover);
            // el.addEventListener("mouseleave", onHover);
        });

        return () => {

            items.forEach((el) => {
                el.replaceWith(el.cloneNode(true)); // cleanup
            });
        };
    }, []);
    useEffect(() => {
        console.log(menuId);
    }, [menuId])
    return (
        <>
            <header className='header'>
                <nav className='header__navBar layout'>
                    <Link href='/' className='pd-h-12' ><img alt='apple' src='/apple.svg' /></Link>
                    {headerNavigation.map(({ text, menu }, i) => <span className='header__navItem' key={i} data-id={i + 1}>{text}</span>)}

                    <Link href='/' className='pd-h-12'><img alt='search' src='/apple.svg' /></Link>
                    <Link href='/' className='pd-h-12'><img alt='bag' src='/apple.svg' /></Link>
                    <BurgerIcon />
                </nav>
                <Headermenu menuId={menuId} />
            </header>
            <div className={`backdrop ${menuId !== null && 'show'}`} onClick={() => setmenuId(null)} />
        </>
    );
}

export const Headermenu: FC<{ menuId: number | null }> = ({ menuId }) => {
    return <div className={`header__menu ${menuId !== null && 'header__menu--open'}`}><div className='header__menu-container layout'>{menuId !== null && headerNavigation[menuId - 1].menu.map((section, j) => <div key={j} className='header__menu-section'><span>{section.sectionName}</span><nav>{section.routes.map((route, k) => <Link key={k} href={route.path}>{route.text}</Link>)}</nav></div>)}</div></div>
}

export const BurgerIcon = () => {
    return (
        <span className='burgerIcon burgerIcon--crossed'>
            <i></i>
            <i></i>
        </span>
    )
}

export default Header;
