'use client';
import { NavItem } from '@/lib/constantData';
import useScroll from '@/lib/hooks/useScroll';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeButton from '../ThemeButton';
export default function Navbar() {
	const scrolled = useScroll(50);

	return (
		<nav
			className={`fixed top-0 w-full flex justify-center ${
				scrolled ? 'border-b bg-background/50 backdrop-blur-xl' : 'bg-background/0'
			} z-30 transition-all`}
		>
			<div className='container flex h-16 items-center justify-between w-full'>
				<NavBrand />

				{/* SideMenu */}
				<div className='flex items-center gap-3'>
					{/* ThemeButton */}
					<ThemeButton />
				</div>
			</div>
		</nav>
	);
}

export function NavItems() {
	const pathname = usePathname();
	return (
		<>
			{NavItem.map((item) => (
				<Link
					key={item.path}
					href={item.path}
					className={`no-underline text-foreground ${
						pathname === item.path && 'text-primary'
					}`}
				>
					{item.name}
				</Link>
			))}
		</>
	);
}

export function NavBrand() {
	return (
		<Link
			href='/'
			className='text-2xl no-underline font-semibold text-foreground'
		>
			<p>BoilerPlater</p>
		</Link>
	);
}
